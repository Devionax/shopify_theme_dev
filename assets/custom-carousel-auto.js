document.addEventListener('DOMContentLoaded', () => {

  const carousels = document.querySelectorAll(
    '.custom-carousel'
  );

  carousels.forEach((carousel) => {

    const viewport = carousel.querySelector(
      '.custom-carousel__viewport'
    );

    const previousButton = carousel.querySelector(
      '.custom-carousel__arrow--prev'
    );

    const nextButton = carousel.querySelector(
      '.custom-carousel__arrow--next'
    );

    if (!viewport) {
      return;
    }


    /*
     * Shopify settings
     */

    const autoplayEnabled =
      carousel.dataset.autoplay === 'true';

    const autoplayDelay =
      Number(carousel.dataset.autoplayDelay) || 4000;


    /*
     * Create Embla options
     */

    const options = {
      loop: true,
      align: 'start'
    };


    /*
     * Create plugins
     */

    const plugins = [];


    if (
      autoplayEnabled &&
      typeof EmblaCarouselAutoplay !== 'undefined'
    ) {

      const autoplay =
        EmblaCarouselAutoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: true
        });

      plugins.push(autoplay);

    }


    /*
     * Initialize Embla
     */

    const embla = EmblaCarousel(
      viewport,
      options,
      plugins
    );


    /*
     * Previous button
     */

    previousButton?.addEventListener(
      'click',
      () => {

        embla.scrollPrev();

      }
    );


    /*
     * Next button
     */

    nextButton?.addEventListener(
      'click',
      () => {

        embla.scrollNext();

      }
    );


    /*
     * Shopify Theme Editor
     *
     * When merchant changes blocks,
     * Embla needs to recalculate.
     */

    embla.on(
      'reInit',
      () => {

        console.log(
          'Carousel reinitialized'
        );

      }
    );


    /*
     * Debug
     */

    console.log(
      'Carousel initialized:',
      carousel.id
    );

  });

});