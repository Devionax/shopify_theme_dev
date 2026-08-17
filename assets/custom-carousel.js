document.addEventListener('DOMContentLoaded', () => {

  const carousels = document.querySelectorAll(
    '[id^="CustomCarousel-"]'
  );

  carousels.forEach((carousel) => {

    const viewport = carousel.querySelector(
      '.custom-carousel__viewport'
    );

    const prevButton = carousel.querySelector(
      '.custom-carousel__button--prev'
    );

    const nextButton = carousel.querySelector(
      '.custom-carousel__button--next'
    );

    if (!viewport) return;

    const embla = EmblaCarousel(viewport, {
      loop: true,
      align: 'start'
    });

    function updateButtons() {

      if (!prevButton || !nextButton) return;

      prevButton.disabled = !embla.canScrollPrev();
      nextButton.disabled = !embla.canScrollNext();

    }

    prevButton?.addEventListener('click', () => {
      embla.scrollPrev();
    });

    nextButton?.addEventListener('click', () => {
      embla.scrollNext();
    });

    embla.on('select', updateButtons);

    embla.on('init', updateButtons);

  });

});