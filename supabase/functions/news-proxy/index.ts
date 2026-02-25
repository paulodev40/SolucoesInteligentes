import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const MEDIASTACK_API_KEY = Deno.env.get("MEDIASTACK_API_KEY");
const MEDIASTACK_HTTPS_URL = "https://api.mediastack.com/v1/news";
const MEDIASTACK_HTTP_URL = "http://api.mediastack.com/v1/news";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const jsonHeaders: Record<string, string> = {
  ...corsHeaders,
  "Content-Type": "application/json",
  "Cache-Control": "no-store, max-age=0"
};

type MediastackArticle = {
  author?: string | null;
  title?: string;
  description?: string;
  url?: string;
  source?: string;
  image?: string;
  published_at?: string;
  category?: string;
  language?: string;
  country?: string;
};

type MediastackResponse = {
  data?: MediastackArticle[];
  error?: {
    code?: string;
    message?: string;
    context?: Record<string, unknown>;
  };
};

type NormalizedArticle = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  author: string | null;
};

const techRegex = /(intelig[eê]ncia artificial|artificial intelligence|machine learning|deep learning|chatgpt|openai|gemini|grok|tecnologia|tech|software|hardware|nvidia|google|amazon web services|aws|microsoft|algoritmo|computa[cç][aã]o|rob[oô]s?)/i;

const buildNewsSearchUrl = (title?: string): string => {
  const fallbackQuery = title?.trim() ? title : "notícias inteligência artificial";
  return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(fallbackQuery)}`;
};

const normalizeArticleUrl = (rawUrl: string | undefined, title?: string): string => {
  if (!rawUrl) {
    return buildNewsSearchUrl(title);
  }

  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    try {
      const parsedWithScheme = new URL(`https://${rawUrl}`);
      if (parsedWithScheme.protocol === "http:" || parsedWithScheme.protocol === "https:") {
        return parsedWithScheme.toString();
      }
    } catch {
    }
  }

  return buildNewsSearchUrl(title);
};

const toNormalizedArticle = (article: MediastackArticle): NormalizedArticle => {
  return {
    title: article.title ?? "",
    description: article.description ?? "",
    url: normalizeArticleUrl(article.url, article.title),
    urlToImage: article.image ?? "",
    publishedAt: article.published_at ?? "",
    source: { name: article.source ?? "Fonte externa" },
    author: article.author ?? null
  };
};

const isValidArticle = (article: MediastackArticle): boolean => {
  return Boolean(article.title && article.description && article.url);
};

const isTechRelated = (article: MediastackArticle): boolean => {
  const haystack = `${article.title ?? ""} ${article.description ?? ""}`;
  return techRegex.test(haystack);
};

const dedupeByUrl = (articles: MediastackArticle[]): MediastackArticle[] => {
  const seen = new Set<string>();
  const deduped: MediastackArticle[] = [];

  for (const article of articles) {
    const normalizedUrl = normalizeArticleUrl(article.url, article.title);
    if (seen.has(normalizedUrl)) {
      continue;
    }
    seen.add(normalizedUrl);
    deduped.push(article);
  }

  return deduped;
};

const fetchFromMediastack = async (baseUrl: string, params: URLSearchParams): Promise<MediastackResponse | null> => {
  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data: MediastackResponse = await response.json();
    return data;
  } catch {
    return null;
  }
};

const fetchNewsBatch = async (params: URLSearchParams): Promise<MediastackArticle[]> => {
  const paramsWithKey = new URLSearchParams(params);
  paramsWithKey.set("access_key", MEDIASTACK_API_KEY ?? "");

  const httpsData = await fetchFromMediastack(MEDIASTACK_HTTPS_URL, paramsWithKey);

  if (httpsData?.data && Array.isArray(httpsData.data) && httpsData.data.length > 0) {
    return httpsData.data.filter(isValidArticle);
  }

  const httpData = await fetchFromMediastack(MEDIASTACK_HTTP_URL, paramsWithKey);
  if (httpData?.data && Array.isArray(httpData.data) && httpData.data.length > 0) {
    return httpData.data.filter(isValidArticle);
  }

  if (httpsData?.data && Array.isArray(httpsData.data)) {
    return httpsData.data.filter(isValidArticle);
  }

  if (httpData?.data && Array.isArray(httpData.data)) {
    return httpData.data.filter(isValidArticle);
  }

  return [];
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!MEDIASTACK_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing MEDIASTACK_API_KEY" }), {
      status: 500,
      headers: jsonHeaders
    });
  }

  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 6, 12) : 6;
  const allowInternational = searchParams.get("allowInternational") === "1";

  const pageSize = Math.min(Math.max(limit * 3, 12), 50);

  try {
    const ptParams = new URLSearchParams({
      keywords: "inteligência artificial,IA,machine learning,tecnologia",
      languages: "pt",
      countries: "br,pt",
      categories: "technology",
      sort: "published_desc",
      limit: String(pageSize),
      offset: "0"
    });

    const ptWideParams = new URLSearchParams({
      keywords: "inteligência artificial,IA,machine learning,tecnologia",
      languages: "pt",
      categories: "technology",
      sort: "published_desc",
      limit: String(pageSize),
      offset: "0"
    });

    const ptNoKeywordsParams = new URLSearchParams({
      languages: "pt",
      countries: "br,pt",
      categories: "technology",
      sort: "published_desc",
      limit: String(pageSize),
      offset: "0"
    });

    const ptNoKeywordsWideParams = new URLSearchParams({
      languages: "pt",
      categories: "technology",
      sort: "published_desc",
      limit: String(pageSize),
      offset: "0"
    });

    const globalParams = new URLSearchParams({
      keywords: "artificial intelligence,AI,machine learning,deep learning",
      languages: "en",
      categories: "technology",
      sort: "published_desc",
      limit: String(pageSize),
      offset: "0"
    });

    const ptArticles = await fetchNewsBatch(ptParams);
    let combinedArticles = dedupeByUrl(ptArticles);

    if (combinedArticles.length < limit) {
      const ptWideArticles = await fetchNewsBatch(ptWideParams);
      combinedArticles = dedupeByUrl([...combinedArticles, ...ptWideArticles]);
    }

    if (combinedArticles.length < limit) {
      const ptNoKeywordsArticles = await fetchNewsBatch(ptNoKeywordsParams);
      combinedArticles = dedupeByUrl([...combinedArticles, ...ptNoKeywordsArticles]);
    }

    if (combinedArticles.length < limit) {
      const ptNoKeywordsWideArticles = await fetchNewsBatch(ptNoKeywordsWideParams);
      combinedArticles = dedupeByUrl([...combinedArticles, ...ptNoKeywordsWideArticles]);
    }

    if (allowInternational && combinedArticles.length < limit) {
      const globalArticles = await fetchNewsBatch(globalParams);
      combinedArticles = dedupeByUrl([...combinedArticles, ...globalArticles]);
    }

    const finalArticles = combinedArticles
      .filter(isTechRelated)
      .sort((left, right) => {
        const leftTime = new Date(left.published_at ?? 0).getTime();
        const rightTime = new Date(right.published_at ?? 0).getTime();
        return rightTime - leftTime;
      })
      .map(toNormalizedArticle)
      .slice(0, limit);

    return new Response(JSON.stringify({ articles: finalArticles }), {
      status: 200,
      headers: jsonHeaders
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: jsonHeaders
    });
  }
});
