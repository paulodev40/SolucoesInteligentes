# Automação do Blog com revisão humana

Sistema para gerar artigos do blog com IA mantendo **revisão e aprovação humana** antes
de publicar — exigência do Google AdSense para conteúdo gerado por IA.

Arquitetura (Opção A): os posts gerados ficam em `content/generated-posts.json` com um
campo `status`. Nada vai ao ar sem você aprovar. Sem banco de dados, sem custo de infra.

## Pré-requisitos

Defina uma chave de IA em `.env.local` (na raiz do projeto):

```env
# Recomendada (Claude):
ANTHROPIC_API_KEY=sk-ant-...
# OU, alternativamente (fallback):
GEMINI_API_KEY=...
```

O script tenta o Claude primeiro e, se não houver `ANTHROPIC_API_KEY`, usa o Gemini.

## Fluxo de trabalho

### 1. Gerar um rascunho

```bash
npm run blog:draft -- "Como pequenos negócios podem usar IA no atendimento"
```

- Sem tema, a IA sugere um assunto novo (evitando repetir os já publicados):
  ```bash
  npm run blog:draft
  ```
- O rascunho é adicionado a `content/generated-posts.json` com `status: "draft"`.
- **Rascunhos não aparecem no site** (nem na listagem, nem no sitemap).
- Uma **imagem de capa** é gerada automaticamente com IA (Imagen, via `GEMINI_API_KEY`)
  e salva em `public/blog-covers/<slug>.png`. Se não houver chave ou a geração falhar,
  usa a imagem padrão. Para gerar sem capa: `BLOG_IMAGE=off npm run blog:draft -- "..."`.

#### (Re)gerar só a imagem de capa

Se quiser uma capa diferente para um post já gerado:

```bash
npm run blog:image -- <slug>
```

Roda quantas vezes quiser até gostar do resultado (cada execução gera uma nova imagem).
As capas são abstratas e sem texto, no estilo visual do site.

### 2. Listar o que já foi gerado

```bash
npm run blog:list
```

Mostra cada post gerado, o slug e se está 🟡 rascunho ou 🟢 publicado.

### 3. Revisar (revisão humana)

1. Rode o site localmente: `npm run dev`
2. Abra `http://localhost:3000/blog/<slug>` para ver o artigo **renderizado** (rascunhos
   são visíveis apenas em desenvolvimento).
3. Ajuste o que quiser direto em `content/generated-posts.json` (título, texto, `excerpt`,
   `category`). Troque também o campo `imageUrl` por uma imagem real do post
   (o padrão é `/artigo_image1.png`).

### 4. Publicar

```bash
npm run blog:publish -- <slug>
```

Isso muda o `status` para `published`. Faça commit e deploy (push) — no próximo build o
post entra **automaticamente** na listagem `/blog` e no `sitemap.xml`.

Para despublicar (voltar a rascunho):

```bash
npm run blog:unpublish -- <slug>
```

## Automação semanal (GitHub Actions)

Existe um robô que **gera 1 rascunho por semana sozinho** — toda segunda-feira, 06:00
(horário de Brasília) — definido em [.github/workflows/blog-weekly.yml](.github/workflows/blog-weekly.yml).

O que ele faz a cada semana:
1. Gera um post novo (texto + capa por IA), escolhendo um tema que ainda não foi usado.
2. Adiciona como **rascunho** (`status: "draft"`) — continua invisível no site.
3. Abre uma **issue** no GitHub te avisando, com o passo a passo para publicar.

Você revisa quando puder e publica. **Nada vai ao ar sozinho.**

### Configuração única (você precisa fazer)

1. No GitHub, vá em **Settings → Secrets and variables → Actions → New repository secret**.
2. Crie o secret **`GEMINI_API_KEY`** com a sua chave do Gemini (a mesma do `.env`).
   - (Opcional) Crie também **`ANTHROPIC_API_KEY`** para gerar o texto com o Claude.
3. Pronto. O robô roda sozinho toda semana.

Para **testar agora** sem esperar a segunda-feira: vá na aba **Actions → "Blog — rascunho
semanal automático" → Run workflow**.

> Se o robô não conseguir dar `push` na branch `main` (caso ela tenha proteção que exige
> Pull Request), me avise que troco a automação para abrir um PR em vez de commitar direto.

### Como publicar o rascunho que o robô gerou

A issue criada pelo robô traz o passo a passo. O jeito mais simples, **sem usar o
computador**: abra `content/generated-posts.json` no GitHub, troque `"status": "draft"`
por `"status": "published"` naquele post e confirme (commit) — a Vercel publica sozinha.

## Como funciona por baixo

- `content/generated-posts.json` — fonte dos posts gerados.
- `constants.tsx` — junta os posts originais com os gerados:
  - `BLOG_POSTS` = todos (inclui rascunhos), usado para localizar um post pelo slug.
  - `PUBLISHED_BLOG_POSTS` = só os publicados, usado na listagem, sitemap e geração estática.
- `app/blog/[slug]/page.tsx` — `dynamicParams = false`: em produção, slugs de rascunho
  retornam 404; em `npm run dev` os rascunhos ficam acessíveis para revisão.
- `scripts/blog.mjs` — CLI de geração e gestão de status.

## Configuração opcional (`.env.local`)

| Variável | Padrão | Descrição |
|---|---|---|
| `BLOG_MODEL` | `claude-sonnet-4-6` | Modelo do Claude usado na geração de texto |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Modelo do Gemini (fallback de texto) |
| `BLOG_IMAGE_MODEL` | `imagen-4.0-fast-generate-001` | Modelo de imagem (capa) |
| `BLOG_IMAGE` | (ligado) | Defina `off` para não gerar capa com IA |
| `BLOG_DEFAULT_IMAGE` | `/artigo_image1.png` | Imagem usada quando a capa não é gerada |

## Boas práticas AdSense

- **Sempre revise** o rascunho antes de publicar: a revisão humana é o que diferencia
  conteúdo de valor de "conteúdo gerado em massa".
- Garanta que cada post tenha uma **imagem própria** e informações corretas.
- Não publique vários posts idênticos ou superficiais de uma vez.
