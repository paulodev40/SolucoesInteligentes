export const config = { runtime: 'edge' };

const INAUGURATION_DATE = '2026-02-09T00:00:00.000Z';

const buildUrls = (projectId: string, teamId: string | undefined, from: number, to: number): string[] => {
  const base = 'https://api.vercel.com';
  const params = new URLSearchParams({ projectId, from: String(from), to: String(to) });
  if (teamId) params.set('teamId', teamId);
  const qs = params.toString();
  return [
    `${base}/v1/web/analytics?${qs}`,
    `${base}/v1/web/insights?${qs}`,
    `${base}/v1/analytics?${qs}`,
  ];
};

const extractVisitors = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = extractVisitors(item);
      if (typeof found === 'number') return found;
    }
    return null;
  }
  if (typeof value !== 'object') return null;
  const rec = value as Record<string, unknown>;

  for (const key of ['visitors', 'uniqueVisitors', 'totalVisitors', 'uniqueSessions']) {
    if (typeof rec[key] === 'number') return rec[key] as number;
  }

  // { key: "visitors", value: N } or { metric: "visitors", total: N }
  const labelFields = ['metric', 'name', 'key', 'type'];
  const valueFields = ['value', 'total', 'count', 'sum'];
  const label = labelFields
    .map(f => (typeof rec[f] === 'string' ? (rec[f] as string).toLowerCase() : ''))
    .join(' ');
  if (label.includes('visitor') || label.includes('unique')) {
    for (const vf of valueFields) {
      if (typeof rec[vf] === 'number') return rec[vf] as number;
    }
  }

  for (const nested of Object.values(rec)) {
    const found = extractVisitors(nested);
    if (typeof found === 'number') return found;
  }
  return null;
};

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Content-Type': 'application/json',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID ?? process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    const missing: string[] = [];
    if (!token) missing.push('VERCEL_API_TOKEN');
    if (!projectId) missing.push('VERCEL_ANALYTICS_PROJECT_ID (ou VERCEL_PROJECT_ID)');
    return new Response(
      JSON.stringify({ error: 'Variáveis de ambiente ausentes', missing }),
      { status: 500, headers: corsHeaders }
    );
  }

  const { searchParams } = new URL(request.url);
  const sinceParam = searchParams.get('since');
  const from = sinceParam ? Date.parse(sinceParam) : Date.parse(INAUGURATION_DATE);
  const to = Date.now();

  const urls = buildUrls(projectId, teamId, from, to);
  const diagnostics: Array<{ url: string; status: number; snippet: string }> = [];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      const text = await res.text();

      if (!res.ok) {
        diagnostics.push({ url, status: res.status, snippet: text.slice(0, 200) });
        continue;
      }

      let payload: unknown;
      try { payload = JSON.parse(text); } catch { continue; }

      const visitors = extractVisitors(payload);
      if (typeof visitors === 'number') {
        return new Response(
          JSON.stringify({ visitors, since: new Date(from).toISOString(), source: url }),
          { status: 200, headers: corsHeaders }
        );
      }
      diagnostics.push({ url, status: 200, snippet: text.slice(0, 200) });
    } catch {
      diagnostics.push({ url, status: 0, snippet: 'fetch_failed' });
    }
  }

  return new Response(
    JSON.stringify({ error: 'Não foi possível obter visitantes da Vercel', diagnostics }),
    { status: 502, headers: corsHeaders }
  );
}
