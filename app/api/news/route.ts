import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface NewsdataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  image_url: string | null;
  pubDate: string;
  source_name: string;
  creator: string[] | null;
}

interface NewsdataResponse {
  status: string;
  results: NewsdataArticle[];
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key não configurada.' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? '6'), 10);

  const url = new URL('https://newsdata.io/api/1/latest');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('q', 'inteligencia artificial OR artificial intelligence');
  url.searchParams.set('language', 'pt,en');
  url.searchParams.set('size', String(limit));

  const res = await fetch(url.toString());

  if (!res.ok) {
    const err = await res.text();
    console.error('[news] newsdata.io error:', res.status, err);
    return NextResponse.json({ error: `Erro na API: ${res.status}` }, { status: 502 });
  }

  const data = await res.json() as NewsdataResponse;

  if (data.status !== 'success' || !Array.isArray(data.results)) {
    return NextResponse.json({ articles: [] });
  }

  const articles = data.results
    .filter((a) => a.title && a.link)
    .map((a) => ({
      title: a.title,
      description: a.description ?? '',
      url: a.link,
      urlToImage: a.image_url ?? '',
      publishedAt: a.pubDate,
      source: { name: a.source_name },
      author: a.creator?.[0] ?? null,
    }));

  return NextResponse.json({ articles });
}
