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

  const entrada = texto.slice(0, 2000);
  const prompt = `Resuma o texto abaixo em português brasileiro de forma clara e objetiva, em no máximo 3 parágrafos curtos. Preserve as informações mais importantes. Comece diretamente com o resumo, sem introdução.\n\n${entrada}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 500 },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('[resumir] Gemini error:', res.status, err);
    // detail exposed temporarily for debugging — remove after confirmed working
    return NextResponse.json(
      { error: `Gemini ${res.status}: ${err.slice(0, 300)}` },
      { status: 500 },
    );
  }

  const data = await res.json() as {
    candidates: { content: { parts: { text: string }[] } }[];
  };
  const resumo = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';

  return NextResponse.json({ resumo });
}
