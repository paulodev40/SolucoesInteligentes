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

> Observação: o fluxo acima (CLI no seu PC, commitando o arquivo) continua válido para
> quem quer gerar manualmente. Mas a **automação roda direto na Vercel** — veja abaixo.

## Automação na Vercel (sem GitHub)

Tudo roda na Vercel: um **cron semanal** gera o rascunho, ele é guardado no **Vercel Blob**,
e você aprova num **painel** com botões. Nenhuma chave precisa ir para o GitHub.

Fluxo:
1. **Toda segunda, 06:00 (Brasília)** o cron gera 1 post (texto + capa) e o salva no Blob
   como **rascunho** (invisível no site).
2. Você abre o painel **`/admin`**, revisa o conteúdo e clica **Publicar**.
3. O post entra na listagem `/blog` e no `sitemap.xml` em poucos minutos (revalidação ISR).

Nada vai ao ar sem você clicar em Publicar.

### Configuração única na Vercel (você faz uma vez)

1. **Criar o armazém (Vercel Blob):** no projeto na Vercel → aba **Storage** →
   **Create Database → Blob** → conecte ao projeto. Isso cria automaticamente a variável
   `BLOB_READ_WRITE_TOKEN`.
2. **Definir a senha do painel:** em **Settings → Environment Variables**, crie
   **`ADMIN_PASSWORD`** com uma senha à sua escolha (usada para entrar em `/admin`).
3. **Conferir a chave de IA:** garanta que **`GEMINI_API_KEY`** já existe nas variáveis
   (é a mesma usada pelo Resumidor). Opcional: `ANTHROPIC_API_KEY` para o texto via Claude.
4. **(Opcional, recomendado)** crie **`CRON_SECRET`** com um valor aleatório — a Vercel o
   envia automaticamente ao cron, evitando que terceiros disparem a geração.
5. Faça um **redeploy** para aplicar as variáveis.

### Usar o painel

- Acesse **`https://SEU-SITE/admin`** e entre com a `ADMIN_PASSWORD`.
- Você vê os posts gerados, pode **ler o conteúdo** (botão "Ver conteúdo"),
  **Publicar / Despublicar** e **Excluir**.
- Botão **"Gerar rascunho"** cria um post na hora (sem esperar a segunda-feira),
  opcionalmente com um tema que você digitar.

> O cron está definido em [vercel.json](vercel.json) (`/api/cron/generate-draft`,
> toda segunda). O painel é a página `/admin` (bloqueada no `robots.txt`).

## Como funciona por baixo

- **Vercel Blob** guarda os posts gerados pela automação (`blog/index.json`) e as capas
  (`blog/covers/<slug>.png`). Editado pelo cron e pelo painel.
- `content/generated-posts.json` + `constants.tsx` — posts originais e os gerados
  localmente pela CLI (commitados no repositório).
- `lib/blogData.ts` junta as duas fontes (Blob + estáticos) e filtra por `status`.
- Listagem, post e sitemap usam essa camada com **revalidação a cada 5 min** (ISR),
  então posts publicados no painel aparecem sozinhos, sem novo deploy.
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
