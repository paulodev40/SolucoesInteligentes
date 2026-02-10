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
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Cache para evitar múltiplas requisições
let cachedNews: NewsArticle[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

export const fetchAINews = async (limit: number = 6): Promise<NewsArticle[]> => {
  // Retorna do cache se ainda estiver válido
  if (cachedNews && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedNews.slice(0, limit);
  }

  try {
    const query = 'artificial intelligence OR AI OR machine learning';
    const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=${limit}&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    
    // Filtra artigos sem imagem ou informações incompletas
    const filteredArticles = data.articles.filter(
      article => article.urlToImage && article.title && article.description
    );
    
    // Atualiza o cache
    cachedNews = filteredArticles;
    cacheTime = Date.now();
    
    return filteredArticles.slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    
    // Se falhar e tiver cache, retorna o cache mesmo expirado
    if (cachedNews) {
      return cachedNews.slice(0, limit);
    }
    
    return [];
  }
};

export const formatNewsDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};
