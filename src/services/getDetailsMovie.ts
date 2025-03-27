import { API_TOKEN } from "astro:env/server";
import { PUBLIC_DETAILS_MOVIE } from "astro:env/server";

export async function getDetailsMovie(movieID: string, params?: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN ?? "",
    },
  };

  try {
    const response = await fetch(
      `${PUBLIC_DETAILS_MOVIE}${movieID}${params ?? ""}`,
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
