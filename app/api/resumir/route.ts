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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Configuração incompleta.' },
      { status: 500 },
    );
  }

  const entrada = texto.slice(0, 2000);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Resuma o texto abaixo em português brasileiro de forma clara e objetiva, em no máximo 3 parágrafos curtos. Preserve as informações mais importantes. Comece diretamente com o resumo, sem introdução.\n\n${entrada}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[resumir] Anthropic error:', res.status, err);
    return NextResponse.json(
      { error: `Erro na API: ${res.status}` },
      { status: 500 },
    );
  }

  const data = await res.json() as { content: { type: string; text: string }[] };
  const resumo = data.content?.[0]?.text?.trim() ?? '';

  return NextResponse.json({ resumo });
}
