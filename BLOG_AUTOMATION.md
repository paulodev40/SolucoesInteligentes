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
| `BLOG_MODEL` | `claude-sonnet-4-6` | Modelo do Claude usado na geração |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Modelo do Gemini (fallback) |
| `BLOG_DEFAULT_IMAGE` | `/artigo_image1.png` | Imagem padrão dos rascunhos |

## Boas práticas AdSense

- **Sempre revise** o rascunho antes de publicar: a revisão humana é o que diferencia
  conteúdo de valor de "conteúdo gerado em massa".
- Garanta que cada post tenha uma **imagem própria** e informações corretas.
- Não publique vários posts idênticos ou superficiais de uma vez.
