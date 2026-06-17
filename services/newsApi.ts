export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string | null;
}

interface NewsdataArticle {
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

let cachedNews: NewsArticle[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 min

export const fetchAINews = async (limit: number = 6): Promise<NewsArticle[]> => {
  if (cachedNews && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedNews.slice(0, limit);
  }

  const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
  if (!apiKey) {
    console.error('[news] NEXT_PUBLIC_NEWSDATA_API_KEY não configurada');
    return [];
  }

  try {
    const url = new URL('https://newsdata.io/api/1/latest');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('q', 'inteligencia artificial OR artificial intelligence');
    url.searchParams.set('language', 'pt,en');
    url.searchParams.set('size', String(Math.min(limit, 10)));

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`newsdata.io error: ${response.status}`);
    }

    const data: NewsdataResponse = await response.json();

    if (data.status !== 'success' || !Array.isArray(data.results)) {
      return [];
    }

    const articles: NewsArticle[] = data.results
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

    cachedNews = articles;
    cacheTime = Date.now();

    return articles.slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    if (cachedNews) return cachedNews.slice(0, limit);
    return [];
  }
};

export const formatNewsDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
