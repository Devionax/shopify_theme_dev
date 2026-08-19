document.addEventListener('DOMContentLoaded', () => {

  console.log('CUSTOM CAROUSEL JS LOADED');

  console.log('Embla:', typeof EmblaCarousel);

  console.log(
    'Embla Autoplay:',
    typeof EmblaCarouselAutoplay
  );


  const carousels = document.querySelectorAll(
    '.custom-carousel'
  );

  console.log(
    'Number of carousels:',
    carousels.length
  );


  carousels.forEach((carousel) => {

    const viewport = carousel.querySelector(
      '.custom-carousel__viewport'
    );

    const autoplayEnabled =
      carousel.dataset.autoplay === 'true';

    const autoplayDelay =
      Number(carousel.dataset.autoplayDelay) || 4000;


    console.log('--------------------');

    console.log(
      'Autoplay enabled:',
      autoplayEnabled
    );

    console.log(
      'Autoplay delay:',
      autoplayDelay
    );


    if (!viewport) {
      console.log('Viewport not found');
      return;
    }


    const options = {
      loop: true,
      align: 'start'
    };


    const plugins = [];


    if (autoplayEnabled) {

      console.log('Trying to create autoplay...');

      if (
        typeof EmblaCarouselAutoplay === 'undefined'
      ) {

        console.error(
          'Embla Autoplay plugin NOT loaded!'
        );

        return;
      }


      const autoplay =
        EmblaCarouselAutoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: false
        });


      plugins.push(autoplay);

      console.log('Autoplay plugin created');

    }


    const embla = EmblaCarousel(
      viewport,
      options,
      plugins
    );


    console.log(
      'Embla initialized:',
      embla
    );


    setTimeout(() => {

      console.log(
        'Current slide:',
        embla.selectedScrollSnap()
      );

    }, 500);


  });

});