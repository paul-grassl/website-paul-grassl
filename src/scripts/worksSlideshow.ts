let cleanupCurrentPage: (() => void) | undefined;

export function cleanupWorksSlideshows() {
  cleanupCurrentPage?.();
  cleanupCurrentPage = undefined;
}

function imageForSlide(slide: HTMLElement | undefined) {
  return slide?.querySelector<HTMLImageElement>("img[data-artwork-image]");
}

async function prepareImage(
  image: HTMLImageElement | null | undefined,
  fetchPriority: "auto" | "low" = "auto"
) {
  if (!image) return;

  if (!image.complete) {
    image.loading = "eager";
    if (image.fetchPriority !== "high") image.fetchPriority = fetchPriority;
  }

  try {
    await image.decode();
  } catch {
    // A failed request remains visible as the reserved neutral image area.
  }
}

export function initWorksSlideshows() {
  cleanupWorksSlideshows();

  const worksPage = document.querySelector<HTMLElement>("[data-page='works']");
  if (!worksPage) return;

  const abortController = new AbortController();
  const { signal } = abortController;
  const preloaders = new WeakMap<Element, () => void>();
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        preloaders.get(entry.target)?.();
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "800px 0px" }
  );

  const seriesContainers =
    worksPage.querySelectorAll<HTMLElement>(".work-series");

  for (const container of seriesContainers) {
    const slides = Array.from(
      container.querySelectorAll<HTMLElement>(".slide")
    );
    const titles = Array.from(
      container.querySelectorAll<HTMLElement>(".specific-title")
    );
    if (slides.length === 0) continue;

    let currentSlide = Math.max(
      0,
      slides.findIndex(slide => slide.classList.contains("active"))
    );
    let suppressClick = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const neighboringIndices = (index: number) =>
      Array.from(
        new Set([
          index,
          (index + 1) % slides.length,
          (index - 1 + slides.length) % slides.length,
        ])
      );

    const prepareBuffer = () => {
      for (const index of neighboringIndices(currentSlide)) {
        void prepareImage(
          imageForSlide(slides[index]),
          index === currentSlide ? "auto" : "low"
        );
      }
    };

    const showSlide = (index: number) => {
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;
        slide.classList.toggle("active", isActive);
        slide.classList.toggle("hidden", !isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      titles.forEach((title, titleIndex) => {
        const isActive = titleIndex === currentSlide;
        title.classList.toggle("block", isActive);
        title.classList.toggle("hidden", !isActive);
      });

      prepareBuffer();
    };

    const move = (direction: "next" | "prev") => {
      showSlide(currentSlide + (direction === "next" ? 1 : -1));
    };

    for (const button of container.querySelectorAll<HTMLButtonElement>(
      ".slide-nav-left, .slide-nav-right"
    )) {
      button.addEventListener(
        "click",
        event => {
          event.stopPropagation();
          move(button.dataset.direction === "next" ? "next" : "prev");
        },
        { signal }
      );
    }

    container.addEventListener(
      "keydown",
      event => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowRight" ? "next" : "prev");
      },
      { signal }
    );

    for (const imageContainer of container.querySelectorAll<HTMLElement>(
      ".image-container"
    )) {
      imageContainer.addEventListener(
        "click",
        event => {
          if (suppressClick) return;
          const bounds = imageContainer.getBoundingClientRect();
          move(
            event.clientX < bounds.left + bounds.width / 2 ? "prev" : "next"
          );
        },
        { signal }
      );

      imageContainer.addEventListener(
        "touchstart",
        event => {
          touchStartX = event.touches[0]?.clientX ?? 0;
          touchStartY = event.touches[0]?.clientY ?? 0;
        },
        { passive: true, signal }
      );

      imageContainer.addEventListener(
        "touchend",
        event => {
          const touch = event.changedTouches[0];
          if (!touch) return;

          const deltaX = touch.clientX - touchStartX;
          const deltaY = touch.clientY - touchStartY;
          if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 50) {
            return;
          }

          suppressClick = true;
          move(deltaX > 0 ? "prev" : "next");
          window.setTimeout(() => {
            suppressClick = false;
          }, 400);
        },
        { passive: true, signal }
      );
    }

    preloaders.set(container, prepareBuffer);
    observer.observe(container);
  }

  cleanupCurrentPage = () => {
    observer.disconnect();
    abortController.abort();
  };
}
