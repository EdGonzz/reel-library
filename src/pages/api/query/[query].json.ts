import { getMoviesByQuery } from "@/services/getMovieByQuery";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const query = params.query ?? "";

  if (query) {
    const data = await getMoviesByQuery(query);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
};
