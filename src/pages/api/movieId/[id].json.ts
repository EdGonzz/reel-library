import { getDetailsMovie } from "@/services/getDetailsMovie";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const id = params.id ?? "";

  if (id) {
    const data = await getDetailsMovie(id);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
};
