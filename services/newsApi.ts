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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const FUNCTION_PATH = '/functions/v1/news-proxy';

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
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase env vars ausentes');
    }

    const url = `${SUPABASE_URL}${FUNCTION_PATH}?limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    
    // Filtra apenas artigos sem campos essenciais.
    // Alguns provedores (ex.: MediaStack) retornam várias notícias sem imagem.
    const filteredArticles = data.articles.filter(
      article => article.url && article.title && article.description
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
