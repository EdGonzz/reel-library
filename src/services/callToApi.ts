export async function callToApi(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
