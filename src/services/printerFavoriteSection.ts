import type { DetailsMovie } from "@/types/apiDetailsMovies";
import { setUpLazyLoad } from "@/services/lazyLoad";
import Heart from "@/assets/svg/Heart.svg?raw";
import Star from "@/assets/svg/Star.svg?raw";
import notFound from "@/assets/svg/notFound.svg?raw";
import { getLocalStorage } from "@/services/getLocalStorage";
import { checkLocalStorage } from "@/services/checkLS";

function getYear(releaseDate: Date) {
  if (releaseDate) {
    let date = new Date(releaseDate);
    let year = date.getUTCFullYear();

    return year;
  }
}

export function printMoviesFav(
  movies: Record<string, DetailsMovie>,
  clean = false
) {
  console.log("printMoviesFav");
  const favoriteSection = document.getElementById(
    "favorites-section"
  ) as HTMLElement;
  const moviesContainer = document.getElementById(
    "favorites-horizontal"
  ) as HTMLElement;

  if (Object.keys(movies).length === 0) {
    favoriteSection.classList.add("hidden");
  } else {
    favoriteSection.classList.remove("hidden");
  }

  if (clean) {
    moviesContainer.innerHTML = "";
  }

  Object.values(movies).map((movie) => {
    const article = document.createElement("article");
    article.className = "space-y-2 w-[200px] flex-shrink-0";

    const link = document.createElement("a");
    link.href = `/movie/${movie.id}`;
    link.className =
      "embla__slide rounded-2xl hover:shadow-2xl hover:scale-105 transition-all";
    link.setAttribute("data-id", `${movie.id}`);

    const picture = document.createElement("picture");
    picture.className = "h-full w-full";

    if (movie.poster_path === null) {
      const noImage = document.createElement("div");
      noImage.setAttribute("aria-label", "Image no found");
      noImage.setAttribute("role", "img");
      noImage.className =
        "w-full h-full rounded-2xl poster-img flex flex-col items-center justify-center gap-4";

      const span = document.createElement("span");
      span.className = "text-lg md:text-xl xl:text-2xl font-extrabold";
      span.innerText = "Image no found";

      const svgContainer = document.createElement("div");
      svgContainer.innerHTML = notFound.toString();

      noImage.append(span, svgContainer);
      picture.appendChild(noImage);
    } else {
      const img = document.createElement("img");
      img.setAttribute(
        "data-src",
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
      img.setAttribute("alt", `${movie.title}`);
      img.className = "lazy poster-img w-full h-auto rounded-2xl object-cover";
      picture.appendChild(img);
    }

    const likeButton = document.createElement("button");
    likeButton.setAttribute("data-id", String(movie.id)); // Usar data-id para sincronización global
    likeButton.className =
      "absolute top-2 right-2 flex justify-center items-center size-8 rounded-full transition-colors bg-black/30 text-white hover:bg-black/50";

    getLocalStorage()[`${movie.id}`]
      ? likeButton.classList.add("liked")
      : likeButton.classList.remove("liked");

    likeButton.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await checkLocalStorage(`${movie.id}`);
      updateLikeButtons(String(movie.id)); // Sincroniza todos los botones con ese id
      printMoviesFav(getLocalStorage(), true);
    });

    const svgHeart = document.createElement("div");
    svgHeart.innerHTML = Heart.toString();

    const header = document.createElement("header");
    header.className =
      "absolute bottom-0 bg-black/70 p-2 text-white md:pl-4 w-full rounded-b-2xl mask-top";

    const div = document.createElement("div");
    div.className = "w-auto flex flex-row gap-2 items-center";

    const average = document.createElement("p");
    average.className = "embla__slide__average";
    average.innerText = `${(movie.vote_average ?? 0).toFixed(1)}`;

    const svgContainer = document.createElement("div");
    svgContainer.innerHTML = Star.toString();

    const headerTitle = document.createElement("header");
    headerTitle.className = "flex flex-col";

    const h3 = document.createElement("h3");
    h3.className = "embla__slide__title";
    h3.innerText = `${movie.title}`;

    const year = document.createElement("p");
    year.className = "font-semibold text-black/40";
    year.innerText = `${getYear(movie.release_date)}`;

    likeButton.appendChild(svgHeart);
    div.append(svgContainer, average);
    header.append(div);
    link.append(picture, header, likeButton);
    headerTitle.append(h3, year);
    article.append(link, headerTitle);
    moviesContainer.appendChild(article);
  });
  setUpLazyLoad();
}

// Sincroniza todos los botones like con el mismo data-id
declare global {
  interface Window {
    updateLikeButtons?: (movieId: string) => void;
  }
}

export function updateLikeButtons(movieId: string) {
  const buttons = document.querySelectorAll(`button[data-id='${movieId}']`);
  const isLiked = getLocalStorage()[`${movieId}`];
  buttons.forEach((btn) => {
    btn.classList.toggle("liked", isLiked);
  });
}

if (typeof window !== "undefined") {
  window.updateLikeButtons = updateLikeButtons;
}
