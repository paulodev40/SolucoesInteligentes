import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const texto: unknown = body?.texto;

  if (!texto || typeof texto !== 'string' || texto.trim().length < 50) {
    return NextResponse.json(
      { error: 'Texto muito curto. Mínimo de 50 caracteres.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Configuração incompleta.' },
      { status: 500 },
    );
  }

  const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
  const entrada = texto.slice(0, 2000);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{
            text: [
              'Você é um assistente especializado em resumir textos em português brasileiro.',
              'Suas respostas devem ser sempre:',
              '- Escritas em português brasileiro claro e formal',
              '- Fiéis ao conteúdo original — nunca invente informações',
              '- Organizadas em até 3 parágrafos curtos e objetivos',
              '- Diretas: comece imediatamente com o resumo, sem frases introdutórias como "O texto fala sobre..." ou "Este é um resumo de..."',
              '- Completas: nunca corte uma frase ou ideia no meio',
            ].join('\n'),
          }],
        },
        contents: [{
          parts: [{
            text: `Resuma o texto abaixo preservando as informações mais importantes:\n\n${entrada}`,
          }],
        }],
        generationConfig: { maxOutputTokens: 1024 },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('[resumir] Gemini error:', res.status, err);
    return NextResponse.json({ error: `Erro na API: ${res.status}` }, { status: 500 });
  }

  const data = await res.json() as {
    candidates: { content: { parts: { text: string }[] } }[];
  };
  const resumo = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';

  return NextResponse.json({ resumo });
}
