import { redis } from "@/lib/redis";
import { notFound } from "next/navigation";
import PasteView from "./PasteView";

export default async function PastePage({ params }) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  let paste;
  try {
    // @upstash/redis automatically parses JSON, so we get the object directly
    paste = await redis.get(`paste:${id}`);
  } catch (error) {
    notFound();
  }
  
  if (!paste) notFound();

  // TTL check (HTML should respect expiry)
  if (paste.expires_at && Date.now() >= paste.expires_at) {
    notFound();
  }

  // View-limit check (HTML must not consume views)
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    notFound();
  }

  return <PasteView paste={paste} id={id} />;
}
