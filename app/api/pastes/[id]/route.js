import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";
import { consumeViewLua } from "@/lib/lua";

export async function GET(req, { params }) {
  // Await params in Next.js 15+
  const { id } = await params;
  const key = `paste:${id}`;
  const now = nowMs(req);

  let result;

  try {
    // Atomic check + increment
    result = await redis.eval(
      consumeViewLua,
      [key],
      [now]
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const paste = JSON.parse(result);

  return new Response(
    JSON.stringify({
      content: paste.content,
      remaining_views:
        paste.max_views !== null
          ? Math.max(0, paste.max_views - paste.views)
          : null,
      expires_at: paste.expires_at
        ? new Date(paste.expires_at).toISOString()
        : null,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
