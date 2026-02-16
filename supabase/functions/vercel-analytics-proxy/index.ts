import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const getEnv = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = Deno.env.get(key);
    if (value && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
};

const VERCEL_API_TOKEN = getEnv("VERCEL_API_TOKEN", "VERCEL_TOKEN");
const VERCEL_PROJECT_ID = getEnv("VERCEL_PROJECT_ID", "VERCEL_ANALYTICS_PROJECT_ID", "VERCEL_PROJECT");
const VERCEL_TEAM_ID = getEnv("VERCEL_TEAM_ID", "VERCEL_TEAM");

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const buildUrls = (from: number, to: number) => {
  const base = "https://api.vercel.com";
  const commonParams = new URLSearchParams({
    projectId: VERCEL_PROJECT_ID ?? "",
    from: String(from),
    to: String(to)
  });

  if (VERCEL_TEAM_ID) {
    commonParams.set("teamId", VERCEL_TEAM_ID);
  }

  return [
    `${base}/v1/web/analytics?${commonParams.toString()}`,
    `${base}/v1/web/insights?${commonParams.toString()}`,
    `${base}/v1/analytics?${commonParams.toString()}`
  ];
};

const findVisitorsInResponse = (value: unknown): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findVisitorsInResponse(item);
      if (typeof found === "number") {
        return found;
      }
    }
    return null;
  }

  if (typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (typeof record.visitors === "number") {
    return record.visitors;
  }

  if (typeof record.uniqueVisitors === "number") {
    return record.uniqueVisitors;
  }

  if (typeof record.totalVisitors === "number") {
    return record.totalVisitors;
  }

  const metricName = typeof record.metric === "string" ? record.metric.toLowerCase() : null;
  const name = typeof record.name === "string" ? record.name.toLowerCase() : null;
  const key = typeof record.key === "string" ? record.key.toLowerCase() : null;
  const valueNumber = typeof record.value === "number" ? record.value : null;

  if (valueNumber !== null && (
    metricName?.includes("visitor") ||
    name?.includes("visitor") ||
    key?.includes("visitor")
  )) {
    return valueNumber;
  }

  for (const nestedValue of Object.values(record)) {
    const found = findVisitorsInResponse(nestedValue);
    if (typeof found === "number") {
      return found;
    }
  }

  return null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
    const missing: string[] = [];

    if (!VERCEL_API_TOKEN) {
      missing.push("VERCEL_API_TOKEN (ou VERCEL_TOKEN)");
    }

    if (!VERCEL_PROJECT_ID) {
      missing.push("VERCEL_PROJECT_ID (ou VERCEL_ANALYTICS_PROJECT_ID/VERCEL_PROJECT)");
    }

    return new Response(JSON.stringify({
      error: "Missing required Vercel env vars",
      missing,
      hint: "Configure os secrets da função no Supabase e faça deploy novamente"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { searchParams } = new URL(req.url);
  const to = Date.now();
  const sinceParam = searchParams.get("since");
  const parsedSince = sinceParam ? Date.parse(sinceParam) : Number.NaN;
  const from = Number.isFinite(parsedSince) ? parsedSince : Date.parse("2026-02-09T00:00:00.000Z");

  const urls = buildUrls(from, to);
  const headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    "Content-Type": "application/json"
  };

  let lastErrorStatus = 500;
  const diagnostics: Array<{ endpoint: string; status: number; body: string }> = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        lastErrorStatus = response.status;
        let errorBody = "";
        try {
          errorBody = await response.text();
        } catch {
          errorBody = "";
        }
        diagnostics.push({ endpoint: url, status: response.status, body: errorBody.slice(0, 300) });
        continue;
      }

      const payload = await response.json();
      const visitors = findVisitorsInResponse(payload);

      if (typeof visitors === "number") {
        return new Response(JSON.stringify({ visitors, since: new Date(from).toISOString(), source: url }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      diagnostics.push({ endpoint: url, status: 200, body: JSON.stringify(payload).slice(0, 300) });
    } catch {
      lastErrorStatus = 500;
      diagnostics.push({ endpoint: url, status: 500, body: "request_failed" });
    }
  }

  return new Response(JSON.stringify({
    error: "Failed to fetch visitors from Vercel Analytics",
    since: new Date(from).toISOString(),
    diagnostics
  }), {
    status: lastErrorStatus,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});