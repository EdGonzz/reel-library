import { API_TOKEN } from "astro:env/server";
import { PUBLIC_DISCOVER_MOVIES } from "astro:env/server";

export async function getMoviesByCategory(categoryID: string = "") {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN ?? "",
    },
  };

  const paramsConfig = {
    with_genres: categoryID,
    sort_by: "popularity.desc",
  };

  const params = new URLSearchParams(paramsConfig).toString();

  try {
    const response = await fetch(`${PUBLIC_DISCOVER_MOVIES}${params}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching data: ${data.status_message}`);
    }

    return data;
  } catch (error) {
    //PENDIENTE AÑADIR UNA FORMA DE MOSTRAR LOS ERRORES
    console.error(error);
    return [];
  }
}
