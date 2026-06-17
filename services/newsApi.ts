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

interface NewsApiResponse {
  articles: NewsArticle[];
}

let cachedNews: NewsArticle[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 min

export const fetchAINews = async (limit: number = 6): Promise<NewsArticle[]> => {
  if (cachedNews && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedNews.slice(0, limit);
  }

  try {
    const response = await fetch(`/api/news?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();

    const filtered = (data.articles ?? []).filter(
      (a) => a.url && a.title && a.description,
    );

    cachedNews = filtered;
    cacheTime = Date.now();

    return filtered.slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    if (cachedNews) return cachedNews.slice(0, limit);
    return [];
  }
};

export const formatNewsDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
