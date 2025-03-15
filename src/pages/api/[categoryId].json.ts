import { getMoviesByCategory } from "@/services/getMoviesByCategory";
import { getCategories } from "@/services/getCategories";
import { type CATEGORIES_MOVIES } from "@/types/apiCategoriesMovies";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const categoryID = params.categoryId;

  if (categoryID) {
    const data = await getMoviesByCategory(categoryID);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
};

export async function getStaticPaths() {
  const categoriesData = (await getCategories()) as CATEGORIES_MOVIES;
  const categories = categoriesData.genres;

  return categories.map((category) => ({
    params: { categoryId: category.id.toString() },
  }));
}
