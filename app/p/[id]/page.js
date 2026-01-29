import { redis } from "@/lib/redis";
import { notFound } from "next/navigation";
import PasteView from "./PasteView";

export const revalidate = 0; // Disable caching to ensure fresh data

export default async function PastePage({ params }) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  if (!id) {
    notFound();
  }
  
  let paste;
  try {
    // @upstash/redis automatically parses JSON, so we get the object directly
    paste = await redis.get(`paste:${id}`);
    console.log("Paste data:", paste);
  } catch (error) {
    console.error("Redis error:", error);
    notFound();
  }
  
  // Check if paste exists
  if (!paste || paste === null || paste === undefined) {
    notFound();
  }

  // Check if paste has content property (validate structure)
  if (!paste.content) {
    notFound();
  }

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
