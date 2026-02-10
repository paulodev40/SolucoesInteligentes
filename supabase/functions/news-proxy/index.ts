import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const NEWS_API_KEY = Deno.env.get("NEWS_API_KEY");
const BASE_URL = "https://newsapi.org/v2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!NEWS_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing NEWS_API_KEY" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 6, 12) : 6;

  const query = "artificial intelligence OR AI OR machine learning";
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=${limit}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `NewsAPI error: ${response.status}` }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];

    const filteredArticles = articles.filter(
      (article) => article.urlToImage && article.title && article.description
    );

    return new Response(JSON.stringify({ articles: filteredArticles }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
