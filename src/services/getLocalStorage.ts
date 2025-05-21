export function getLocalStorage() {
  const likedMovies = JSON.parse(localStorage.getItem("liked_movies") || "{}");

  return likedMovies;
}
