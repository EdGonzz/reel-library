export async function getCategories() {
  console.log(import.meta.env.API_TOKEN);
  console.log(import.meta.env.PUBLIC_CATEGORIES_MOVIES);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.API_TOKEN,
    },
  };
  try {
    const response = await fetch(
      import.meta.env.PUBLIC_CATEGORIES_MOVIES,
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
