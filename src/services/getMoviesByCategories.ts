import { PUBLIC_DISCOVER_MOVIES } from "astro:";

export async function getMoviesByCategories(categoryID: string = "") {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.API_TOKEN,
    },
  };

  const paramsConfig = {
    with_genres: categoryID,
    sort_by: "popularity.desc",
  };

  const params = new URLSearchParams(paramsConfig).toString();

  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_DISCOVER_MOVIES}${params}`,
      options
    );

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
