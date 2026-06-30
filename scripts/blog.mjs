#!/usr/bin/env node
// Automação do blog — Soluções Inteligentes 83
// ---------------------------------------------------------------------------
// Fluxo (Opção A: arquivos + flag de status, com revisão humana):
//   1. `npm run blog:draft -- "Tema do artigo"`  → gera um RASCUNHO via IA
//      (Claude, com fallback para Gemini) e o adiciona a content/generated-posts.json
//      com status "draft". Rascunhos NÃO aparecem no site.
//   2. `npm run blog:list`                       → lista os posts gerados e o status
//   3. Revise o rascunho: rode `npm run dev` e abra /blog/<slug> para ver renderizado.
//      Edite o texto direto no JSON se quiser ajustar.
//   4. `npm run blog:publish -- <slug>`          → muda o status para "published".
//      No próximo deploy o post entra na listagem e no sitemap automaticamente.
//   (`npm run blog:unpublish -- <slug>` volta para rascunho.)
//
// Nenhum post vai ao ar sem você aprovar — exatamente o que o Google AdSense exige
// de conteúdo gerado com IA (revisão e supervisão humana).
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_FILE = join(ROOT, 'content', 'generated-posts.json');
const CONSTANTS_FILE = join(ROOT, 'constants.tsx');
const COVERS_DIR = join(ROOT, 'public', 'blog-covers');

// --- .env loader mínimo (sem dependências) --------------------------------
function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim().replace(/^["']|["']$/g, '');
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

// --- Categorias e contexto existentes -------------------------------------
const EXISTING_CATEGORIES = [
  'Tendências',
  'Marketing e Vendas com IA',
  'Apresentações e Reuniões Inteligentes',
  'Memória e Imagem',
  'Produtividade com IA',
  'Ferramentas de IA',
];

const AUTHOR = 'Equipe Soluções Inteligentes 83';
const DEFAULT_IMAGE = process.env.BLOG_DEFAULT_IMAGE || '/artigo_image1.png';

// --- Helpers ---------------------------------------------------------------
function readPosts() {
  if (!existsSync(POSTS_FILE)) return [];
  const raw = readFileSync(POSTS_FILE, 'utf8').trim();
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    console.error('✖ content/generated-posts.json contém JSON inválido. Corrija antes de continuar.');
    process.exit(1);
  }
}

function writePosts(posts) {
  writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
}

function slugify(text) {
  const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70)
    .replace(/-$/, '');
}

function existingSlugs() {
  const slugs = new Set(readPosts().map((p) => p.slug));
  // Também evita colidir com slugs já presentes em constants.tsx (posts e produtos).
  if (existsSync(CONSTANTS_FILE)) {
    const src = readFileSync(CONSTANTS_FILE, 'utf8');
    for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) slugs.add(m[1]);
  }
  return slugs;
}

// Títulos dos posts originais (constants.tsx), para a IA não repetir o assunto
// quando gera um tema automaticamente.
function coreTitles() {
  if (!existsSync(CONSTANTS_FILE)) return [];
  const src = readFileSync(CONSTANTS_FILE, 'utf8');
  return [...src.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1]);
}

function uniqueSlug(base) {
  const taken = existingSlugs();
  let slug = base || 'post';
  let i = 2;
  while (taken.has(slug)) slug = `${base}-${i++}`;
  return slug;
}

function todayPtBr() {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

// Os campos vêm delimitados por marcadores (não JSON), porque o HTML do artigo
// usa aspas duplas (class="...") que quebrariam o JSON.parse facilmente.
function parseFields(raw) {
  const get = (label) => {
    const re = new RegExp(`<<<${label}>>>([\\s\\S]*?)(?=<<<[A-Z]+>>>|$)`);
    const m = raw.match(re);
    return m ? m[1].trim() : '';
  };
  return {
    title: get('TITLE'),
    category: get('CATEGORY'),
    excerpt: get('EXCERPT'),
    metaDescription: get('META'),
    content: get('CONTENT'),
  };
}

// --- Provedores de IA ------------------------------------------------------
function buildPrompt(topic, existingTitles) {
  const topicLine = topic
    ? `O tema do artigo é: "${topic}".`
    : 'Escolha um tema original e relevante sobre Inteligência Artificial, tecnologia ou produtividade, que ainda NÃO esteja coberto pelos títulos existentes.';

  return `Você é redator do blog "Soluções Inteligentes 83", especializado em Inteligência Artificial, tecnologia e produtividade para profissionais e empreendedores brasileiros.

${topicLine}

Escreva um artigo de blog COMPLETO, original e útil, em português do Brasil. O conteúdo deve ser 100% original (nunca copie de outros sites), aprofundado e prático.

Títulos já existentes no blog (NÃO repita o assunto):
${existingTitles.map((t) => `- ${t}`).join('\n')}

Categorias preferidas (escolha a mais adequada, ou crie uma curta e coerente):
${EXISTING_CATEGORIES.map((c) => `- ${c}`).join('\n')}

Responda EXATAMENTE neste formato, usando os marcadores abaixo (sem nenhum texto fora deles, sem cercas de código markdown):

<<<TITLE>>>
Título chamativo e específico (até ~70 caracteres)
<<<CATEGORY>>>
Uma das categorias acima ou outra curta
<<<EXCERPT>>>
Resumo de 1 a 2 frases que aparece no card da listagem
<<<META>>>
Meta description para SEO, até 160 caracteres
<<<CONTENT>>>
Corpo do artigo em HTML (ver regras abaixo)
<<<END>>>

Regras para o conteúdo em HTML (seção CONTENT):
- Use subtítulos <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6"> ... </h3>
- Parágrafos <p class="mb-4"> ... </p>
- Listas <ul class="list-disc list-inside mb-4 space-y-2 text-gray-300 pl-2"><li>...</li></ul>
- Destaques com <strong class="text-white"> ... </strong>
- Tenha pelo menos 5 seções com subtítulos e de 900 a 1400 palavras no total.
- Inclua, perto do final, uma seção <h3 ...>Perguntas frequentes</h3> com 3 a 4 perguntas, cada uma como <p class="mb-2"><strong class="text-white">Pergunta?</strong></p><p class="mb-4">Resposta.</p>
- NÃO inclua a tag de imagem; ela é adicionada automaticamente.
- Não invente estatísticas como se fossem dados oficiais; se citar números, deixe claro que são estimativas ou exemplos.`;
}

async function generateWithAnthropic(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  const model = process.env.BLOG_MODEL || 'claude-sonnet-4-6';
  console.log(`→ Gerando com Claude (${model})...`);
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model,
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });
  return msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
}

async function generateWithGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  console.log(`→ Gerando com Gemini (${model})...`);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 8192, temperature: 0.8 },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Gemini API erro ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text.trim()) {
    console.error('  ⚠ Gemini retornou resposta vazia. Detalhe:', JSON.stringify(data).slice(0, 300));
  }
  return text;
}

// Gera a imagem de capa com o Imagen (Google), com base no título do post.
// Usa a GEMINI_API_KEY. Retorna o caminho público da imagem, ou null se falhar.
async function generateCoverImage(slug, title, category) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('  ⚠ Sem GEMINI_API_KEY — usando imagem padrão (capa não gerada).');
    return null;
  }
  if (process.env.BLOG_IMAGE === 'off') return null;

  const model = process.env.BLOG_IMAGE_MODEL || 'imagen-4.0-fast-generate-001';
  // Importante: NÃO passar título nem categoria como frase no prompt — o Imagen
  // tende a "escrever" qualquer conceito textual como título na imagem (muitas vezes
  // truncado). Por isso o prompt é puramente VISUAL, proibindo texto explicitamente.
  // (A variável `category` é mantida na assinatura para uso futuro, mas não entra no prompt.)
  void category;
  const imagePrompt =
    `Abstract isometric technology and artificial intelligence illustration. ` +
    `Floating glowing geometric blocks and circular nodes connected by thin luminous circuit lines, ` +
    `neural network motif, flowing data streams. ` +
    `Cyan (#22e0ff) and violet (#8b5cff) gradients on a dark navy background. ` +
    `Minimalist, clean, professional, futuristic, high quality, depth of field. ` +
    `No people, no faces, no hands, no screens, no monitors, no user interface, ` +
    `absolutely NO text, NO words, NO letters, NO numbers, NO labels, NO captions, NO typography anywhere.`;

  console.log('→ Gerando imagem de capa com o Imagen...');
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: imagePrompt }],
          parameters: { sampleCount: 1, aspectRatio: '16:9' },
        }),
      },
    );
    if (!res.ok) {
      console.log(`  ⚠ Falha na geração da imagem (HTTP ${res.status}). Usando imagem padrão.`);
      return null;
    }
    const data = await res.json();
    const b64 = data.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) {
      console.log('  ⚠ A API não retornou imagem. Usando imagem padrão.');
      return null;
    }
    mkdirSync(COVERS_DIR, { recursive: true });
    writeFileSync(join(COVERS_DIR, `${slug}.png`), Buffer.from(b64, 'base64'));
    console.log(`  ✔ Capa salva em public/blog-covers/${slug}.png`);
    return `/blog-covers/${slug}.png`;
  } catch (err) {
    console.log(`  ⚠ Erro ao gerar imagem (${err.message}). Usando imagem padrão.`);
    return null;
  }
}

async function generateDraft(topic) {
  const posts = readPosts();
  const existingTitles = [...posts.map((p) => p.title), ...coreTitles()];
  const prompt = buildPrompt(topic, existingTitles);

  let raw = await generateWithAnthropic(prompt);
  if (raw === null) raw = await generateWithGemini(prompt);
  if (raw === null) {
    console.error(
      '✖ Nenhuma chave de IA encontrada. Defina ANTHROPIC_API_KEY (recomendado) ou GEMINI_API_KEY em .env.local',
    );
    process.exit(1);
  }
  if (!raw || !raw.trim()) {
    console.error('✖ A IA retornou uma resposta vazia. Verifique se a chave de API é válida e tem cota disponível.');
    process.exit(1);
  }

  const parsed = parseFields(raw);
  for (const field of ['title', 'category', 'excerpt', 'content']) {
    if (!parsed[field]) {
      console.error(`✖ A IA não retornou o campo obrigatório "${field}".`);
      console.error('  Trecho recebido:', raw.slice(0, 300));
      process.exit(1);
    }
  }

  const slug = uniqueSlug(slugify(parsed.title));
  const coverPath = await generateCoverImage(slug, parsed.title.trim(), parsed.category.trim());
  const post = {
    slug,
    title: parsed.title.trim(),
    author: AUTHOR,
    date: todayPtBr(),
    category: parsed.category.trim(),
    excerpt: parsed.excerpt.trim(),
    metaDescription: (parsed.metaDescription || parsed.excerpt).trim().slice(0, 160),
    content: parsed.content,
    imageUrl: coverPath || DEFAULT_IMAGE,
    status: 'draft',
  };

  posts.unshift(post);
  writePosts(posts);

  console.log('\n✔ Rascunho criado com sucesso!');
  console.log(`  Título:   ${post.title}`);
  console.log(`  Slug:     ${post.slug}`);
  console.log(`  Categoria:${post.category}`);
  console.log(`  Status:   draft (invisível no site)`);
  console.log('\nPróximos passos:');
  console.log(`  1. Revise: rode "npm run dev" e abra http://localhost:3000/blog/${post.slug}`);
  console.log(`  2. (Opcional) ajuste o texto em content/generated-posts.json`);
  console.log(`  3. Troque a imagem em "imageUrl" (padrão: ${DEFAULT_IMAGE})`);
  console.log(`  4. Publique: npm run blog:publish -- ${post.slug}`);
}

function listPosts() {
  const posts = readPosts();
  if (posts.length === 0) {
    console.log('Nenhum post gerado ainda. Crie um com: npm run blog:draft -- "Seu tema"');
    return;
  }
  console.log(`\n${posts.length} post(s) gerado(s):\n`);
  for (const p of posts) {
    const tag = p.status === 'published' ? '🟢 publicado' : '🟡 rascunho ';
    console.log(`  ${tag}  ${p.slug}`);
    console.log(`             ${p.title}`);
  }
  console.log('');
}

function setStatus(slug, status) {
  if (!slug) {
    console.error(`✖ Informe o slug. Ex.: npm run blog:${status === 'published' ? 'publish' : 'unpublish'} -- meu-slug`);
    process.exit(1);
  }
  const posts = readPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`✖ Post "${slug}" não encontrado entre os posts gerados.`);
    console.error('  Use "npm run blog:list" para ver os slugs disponíveis.');
    process.exit(1);
  }
  post.status = status;
  writePosts(posts);
  const label = status === 'published' ? 'publicado 🟢' : 'voltou a rascunho 🟡';
  console.log(`✔ "${post.title}" ${label}.`);
  if (status === 'published') {
    console.log('  Faça commit e deploy para o post entrar na listagem e no sitemap.');
  }
}

async function regenerateImage(slug) {
  if (!slug) {
    console.error('✖ Informe o slug. Ex.: npm run blog:image -- meu-slug');
    process.exit(1);
  }
  const posts = readPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`✖ Post "${slug}" não encontrado. Use "npm run blog:list".`);
    process.exit(1);
  }
  const coverPath = await generateCoverImage(post.slug, post.title, post.category);
  if (!coverPath) {
    console.error('✖ Não foi possível gerar a imagem.');
    process.exit(1);
  }
  post.imageUrl = coverPath;
  writePosts(posts);
  console.log(`✔ Capa atualizada para "${post.title}".`);
  if (post.status === 'published') {
    console.log('  Faça commit e deploy para a nova capa entrar no ar.');
  }
}

// --- Main ------------------------------------------------------------------
loadEnv();
const [cmd, ...rest] = process.argv.slice(2);
const arg = rest.join(' ').trim();

try {
  switch (cmd) {
    case 'draft':
      await generateDraft(arg);
      break;
    case 'list':
      listPosts();
      break;
    case 'publish':
      setStatus(arg, 'published');
      break;
    case 'unpublish':
      setStatus(arg, 'draft');
      break;
    case 'image':
      await regenerateImage(arg);
      break;
    default:
      console.log('Uso:');
      console.log('  npm run blog:draft -- "Tema do artigo"   Gera um rascunho com IA (com capa)');
      console.log('  npm run blog:list                        Lista os posts gerados');
      console.log('  npm run blog:image -- <slug>             (Re)gera a imagem de capa');
      console.log('  npm run blog:publish -- <slug>           Publica um rascunho');
      console.log('  npm run blog:unpublish -- <slug>         Volta um post para rascunho');
  }
} catch (err) {
  console.error(`✖ Erro: ${err.message}`);
  process.exit(1);
}
