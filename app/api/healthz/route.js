import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await redis.ping();
    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
