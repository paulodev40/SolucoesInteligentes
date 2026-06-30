import type { BlogPost } from '../types';

// Geração de posts (texto + capa) em runtime — usada pelo cron e pelo painel admin.
// Espelha a lógica do script local scripts/blog.mjs.
// Texto: Claude (ANTHROPIC_API_KEY) com fallback Gemini (GEMINI_API_KEY).
// Imagem: Imagen via Gemini (GEMINI_API_KEY).

const AUTHOR = 'Equipe Soluções Inteligentes 83';

const EXISTING_CATEGORIES = [
  'Tendências',
  'Marketing e Vendas com IA',
  'Apresentações e Reuniões Inteligentes',
  'Memória e Imagem',
  'Produtividade com IA',
  'Ferramentas de IA',
];

const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');

export function slugify(text: string): string {
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

export function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base || 'post';
  let i = 2;
  while (taken.has(slug)) slug = `${base}-${i++}`;
  return slug;
}

function todayPtBr(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

function parseFields(raw: string) {
  const get = (label: string) => {
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

function buildTextPrompt(topic: string | undefined, existingTitles: string[]): string {
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

async function generateTextWithAnthropic(prompt: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  const model = process.env.BLOG_MODEL || 'claude-sonnet-4-6';
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model,
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });
  return msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
}

async function generateTextWithGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
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
  if (!res.ok) throw new Error(`Gemini API erro ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join('') ?? '';
}

/** Gera a imagem de capa (PNG) via Imagen. Retorna Buffer ou null se falhar. */
export async function generateCover(): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || process.env.BLOG_IMAGE === 'off') return null;
  const model = process.env.BLOG_IMAGE_MODEL || 'imagen-4.0-fast-generate-001';
  // Prompt puramente visual — evita que o modelo "escreva" texto na imagem.
  const imagePrompt =
    'Abstract isometric technology and artificial intelligence illustration. ' +
    'Floating glowing geometric blocks and circular nodes connected by thin luminous circuit lines, ' +
    'neural network motif, flowing data streams. ' +
    'Cyan (#22e0ff) and violet (#8b5cff) gradients on a dark navy background. ' +
    'Minimalist, clean, professional, futuristic, high quality, depth of field. ' +
    'No people, no faces, no hands, no screens, no monitors, no user interface, ' +
    'absolutely NO text, NO words, NO letters, NO numbers, NO labels, NO captions, NO typography anywhere.';
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
    if (!res.ok) return null;
    const data = await res.json();
    const b64 = data.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) return null;
    return Buffer.from(b64, 'base64');
  } catch {
    return null;
  }
}

export interface GenerateResult {
  post: BlogPost;
  cover: Buffer | null;
}

/**
 * Gera um post completo (texto + capa). Retorna o registro do post (status draft,
 * sem imageUrl definitivo) e o PNG da capa. Quem chama decide onde salvar a imagem.
 */
export async function generatePost(opts: {
  topic?: string;
  existingTitles: string[];
  takenSlugs: Set<string>;
}): Promise<GenerateResult> {
  const prompt = buildTextPrompt(opts.topic, opts.existingTitles);

  let raw = await generateTextWithAnthropic(prompt);
  if (raw === null) raw = await generateTextWithGemini(prompt);
  if (raw === null) {
    throw new Error('Nenhuma chave de IA configurada (ANTHROPIC_API_KEY ou GEMINI_API_KEY).');
  }
  if (!raw.trim()) throw new Error('A IA retornou uma resposta vazia.');

  const parsed = parseFields(raw);
  for (const field of ['title', 'category', 'excerpt', 'content'] as const) {
    if (!parsed[field]) {
      throw new Error(`A IA não retornou o campo obrigatório "${field}".`);
    }
  }

  const slug = uniqueSlug(slugify(parsed.title), opts.takenSlugs);
  const cover = await generateCover();

  const post: BlogPost = {
    slug,
    title: parsed.title.trim(),
    author: AUTHOR,
    date: todayPtBr(),
    category: parsed.category.trim(),
    excerpt: parsed.excerpt.trim(),
    metaDescription: (parsed.metaDescription || parsed.excerpt).trim().slice(0, 160),
    content: parsed.content,
    imageUrl: '/artigo_image1.png', // substituído pela capa do Blob quando disponível
    status: 'draft',
  };

  return { post, cover };
}
