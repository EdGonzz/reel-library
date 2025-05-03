export const setUpLazyLoad = () => {
  const target = document.querySelectorAll(
    ".lazy"
  ) as NodeListOf<HTMLImageElement>;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const callBack = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  };

  let observer = new IntersectionObserver(callBack, options);

  target.forEach((img) => {
    observer.observe(img);
  });
};
