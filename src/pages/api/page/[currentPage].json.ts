import { getMoviesByCategory } from "@/services/getMoviesByCategory";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const currentPage = params.currentPage;

  if (currentPage) {
    const data = await getMoviesByCategory("", `${currentPage}`);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
};
