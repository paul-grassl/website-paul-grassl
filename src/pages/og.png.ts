import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  // Temporarily disabled due to font loading issues
  return new Response("OG Image generation temporarily disabled", {
    status: 404,
    headers: { "Content-Type": "text/plain" },
  });
};
