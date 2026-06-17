import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const texto: unknown = body?.texto;

  if (!texto || typeof texto !== 'string' || texto.trim().length < 50) {
    return NextResponse.json(
      { error: 'Texto muito curto. Mínimo de 50 caracteres.' },
      { status: 400 },
    );
  }

  const entrada = texto.slice(0, 2000);

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Resuma o texto abaixo em português brasileiro de forma clara e objetiva, em no máximo 3 parágrafos curtos. Preserve as informações mais importantes. Comece diretamente com o resumo, sem introdução.\n\n${entrada}`,
        },
      ],
    });

    const resumo =
      msg.content[0].type === 'text' ? msg.content[0].text.trim() : '';

    return NextResponse.json({ resumo });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao processar. Tente novamente.' },
      { status: 500 },
    );
  }
}
