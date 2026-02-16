<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_dDk-0ovGYsSUw48wPPSsEiVATnz4M2U

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Visitors na Home (Vercel Web Analytics)

Para exibir o total de visitantes na página inicial, foi adicionada a função Supabase:

- `supabase/functions/vercel-analytics-proxy/index.ts`

Configure estes secrets no Supabase (Edge Functions):

- `VERCEL_API_TOKEN` (token da API da Vercel)
- `VERCEL_PROJECT_ID` (ID do projeto na Vercel)
- `VERCEL_TEAM_ID` (opcional, se projeto estiver em team)

Também são aceitos aliases:

- token: `VERCEL_TOKEN`
- projeto: `VERCEL_ANALYTICS_PROJECT_ID` ou `VERCEL_PROJECT`
- team: `VERCEL_TEAM`

No frontend, mantenha configurados:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Depois, faça o deploy da função:

`supabase functions deploy vercel-analytics-proxy`

O contador da Home está configurado como total de visitantes desde `2026-02-09T00:00:00.000Z` ("Desde 9 FEV 26").

Se aparecer "indisponível", normalmente é por:

- função não publicada (`supabase functions deploy vercel-analytics-proxy`)
- `VERCEL_API_TOKEN`/`VERCEL_PROJECT_ID` ausentes ou inválidos
- endpoint de analytics sem resposta para o projeto/token
