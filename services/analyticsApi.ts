const VISITORS_API_PATH = '/api/visitors';
const INAUGURATION_DATE = '2026-02-09T00:00:00.000Z';
const VISITORS_STORAGE_KEY = 'si_total_visitors';

let cachedVisitors: number | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

const readVisitorsFromStorage = (): number | null => {
  try {
    const raw = window.localStorage.getItem(VISITORS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  } catch {
    return null;
  }
};

const saveVisitorsToStorage = (value: number): void => {
  try {
    window.localStorage.setItem(VISITORS_STORAGE_KEY, String(value));
  } catch { /* ignore */ }
};

export const fetchVisitors = async (): Promise<number | null> => {
  if (cachedVisitors === null) {
    const stored = readVisitorsFromStorage();
    if (stored !== null) cachedVisitors = stored;
  }

  if (cachedVisitors !== null && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedVisitors;
  }

  try {
    const url = `${VISITORS_API_PATH}?since=${encodeURIComponent(INAUGURATION_DATE)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json() as { visitors?: unknown };
    if (typeof data.visitors !== 'number') throw new Error('Resposta inválida');

    cachedVisitors = data.visitors;
    cacheTime = Date.now();
    saveVisitorsToStorage(data.visitors);
    return data.visitors;
  } catch (error) {
    console.error('Erro ao buscar visitantes:', error);
    return cachedVisitors ?? readVisitorsFromStorage();
  }
};