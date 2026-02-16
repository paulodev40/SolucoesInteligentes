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

const SUPABASE_URL = getEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY");
const DEFAULT_SINCE = "2026-02-09T00:00:00.000Z";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const callRpc = async (functionName: string, body: Record<string, unknown>) => {
  const url = `${SUPABASE_URL}/rest/v1/rpc/${functionName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY ?? ""}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`RPC ${functionName} failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();

  if (typeof data !== "number") {
    throw new Error(`RPC ${functionName} returned invalid payload`);
  }

  return data;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing: string[] = [];

    if (!SUPABASE_URL) {
      missing.push("SUPABASE_URL");
    }

    if (!SUPABASE_SERVICE_ROLE_KEY) {
      missing.push("SUPABASE_SERVICE_ROLE_KEY");
    }

    return new Response(JSON.stringify({
      error: "Missing required Supabase env vars",
      missing
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") === "track" ? "track" : "get";
  const site = searchParams.get("site") ?? "main";

  try {
    const visitors = mode === "track"
      ? await callRpc("increment_site_visitors", { p_site: site })
      : await callRpc("get_site_visitors", { p_site: site });

    return new Response(JSON.stringify({
      visitors,
      since: DEFAULT_SINCE,
      mode,
      source: "supabase_counter"
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Failed to resolve visitors counter",
      detail: error instanceof Error ? error.message : "unknown_error"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});