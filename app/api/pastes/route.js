import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req) {
  // Check if Redis is configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error("Redis not configured - missing environment variables");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { content, ttl_seconds, max_views } = body;

  if (typeof content !== "string" || !content.trim()) {
    return new Response(
      JSON.stringify({ error: "Invalid content" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid ttl_seconds" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid max_views" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const id = nanoid();
  const now = Date.now();

  const paste = {
    content,
    created_at: now,
    expires_at: ttl_seconds ? now + ttl_seconds * 1000 : null,
    max_views: max_views ?? null,
    views: 0,
  };

  try {
    await redis.set(`paste:${id}`, JSON.stringify(paste));
  } catch (error) {
    console.error("Redis error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to save paste" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const host = req.headers.get("host");
  const protocol = host.includes("localhost") ? "http" : "https";

  return new Response(
    JSON.stringify({
      id,
      url: `${protocol}://${host}/p/${id}`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
