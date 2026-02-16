const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const FUNCTION_PATH = '/functions/v1/vercel-analytics-proxy';
const INAUGURATION_DATE = '2026-02-09T00:00:00.000Z';
const VISITORS_STORAGE_KEY = 'si_total_visitors';

interface VisitorsApiResponse {
  visitors: number;
  since: string;
  source?: string;
  error?: string;
}

let cachedVisitors: number | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

const readVisitorsFromStorage = (): number | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(VISITORS_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = Number(rawValue);
    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
};

const saveVisitorsToStorage = (value: number): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(VISITORS_STORAGE_KEY, String(value));
  } catch {
  }
};

export const fetchVisitors = async (): Promise<number | null> => {
  if (cachedVisitors === null) {
    const storedVisitors = readVisitorsFromStorage();
    if (storedVisitors !== null) {
      cachedVisitors = storedVisitors;
      cacheTime = Date.now();
    }
  }

  if (cachedVisitors !== null && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedVisitors;
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase env vars ausentes');
    }

    const url = `${SUPABASE_URL}${FUNCTION_PATH}?since=${encodeURIComponent(INAUGURATION_DATE)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY
      }
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      throw new Error(`Visitors API error: ${response.status} ${errorPayload}`);
    }

    const data: VisitorsApiResponse = await response.json();

    if (typeof data.visitors !== 'number') {
      return null;
    }

    cachedVisitors = data.visitors;
    cacheTime = Date.now();
    saveVisitorsToStorage(data.visitors);

    return data.visitors;
  } catch (error) {
    console.error('Erro ao buscar visitantes:', error);
    if (cachedVisitors !== null) {
      return cachedVisitors;
    }

    const storedVisitors = readVisitorsFromStorage();
    if (storedVisitors !== null) {
      cachedVisitors = storedVisitors;
      cacheTime = Date.now();
    }

    return storedVisitors;
  }
};