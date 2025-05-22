import type { Result } from "@/types/apiMovieByCategory";
import { callToApi } from "./callToApi";

export async function checkLocalStorage(movieID: string) {
  const movieData = (await callToApi(
    `api/movieId/${movieID}.json`
  )) as Promise<Result>;

  const likedMovies = JSON.parse(localStorage.getItem("liked_movies") || "{}");

  if (likedMovies[movieID]) {
    delete likedMovies[movieID];
  } else {
    likedMovies[movieID] = movieData;
  }

  localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
}
