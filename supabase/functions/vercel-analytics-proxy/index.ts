import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const VERCEL_API_TOKEN = Deno.env.get("VERCEL_API_TOKEN");
const VERCEL_PROJECT_ID = Deno.env.get("VERCEL_PROJECT_ID");
const VERCEL_TEAM_ID = Deno.env.get("VERCEL_TEAM_ID");

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const PERIOD_IN_DAYS: Record<string, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90
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
    return new Response(JSON.stringify({ error: "Missing VERCEL_API_TOKEN or VERCEL_PROJECT_ID" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") ?? "7d";
  const days = PERIOD_IN_DAYS[period] ?? 7;

  const to = Date.now();
  const from = to - days * 24 * 60 * 60 * 1000;

  const urls = buildUrls(from, to);
  const headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    "Content-Type": "application/json"
  };

  let lastErrorStatus = 500;

  for (const url of urls) {
    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        lastErrorStatus = response.status;
        continue;
      }

      const payload = await response.json();
      const visitors = findVisitorsInResponse(payload);

      if (typeof visitors === "number") {
        return new Response(JSON.stringify({ visitors, period }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    } catch {
      lastErrorStatus = 500;
    }
  }

  return new Response(JSON.stringify({ error: "Failed to fetch visitors from Vercel Analytics" }), {
    status: lastErrorStatus,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});