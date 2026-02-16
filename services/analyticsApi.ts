const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const FUNCTION_PATH = '/functions/v1/vercel-analytics-proxy';

interface VisitorsApiResponse {
  visitors: number;
  period: string;
}

let cachedVisitors: number | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchVisitors = async (period: string = '7d'): Promise<number | null> => {
  if (cachedVisitors !== null && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedVisitors;
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase env vars ausentes');
    }

    const url = `${SUPABASE_URL}${FUNCTION_PATH}?period=${encodeURIComponent(period)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Visitors API error: ${response.status}`);
    }

    const data: VisitorsApiResponse = await response.json();

    if (typeof data.visitors !== 'number') {
      return null;
    }

    cachedVisitors = data.visitors;
    cacheTime = Date.now();

    return data.visitors;
  } catch (error) {
    console.error('Erro ao buscar visitantes:', error);
    return cachedVisitors;
  }
};