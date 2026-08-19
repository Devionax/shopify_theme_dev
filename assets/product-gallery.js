document.addEventListener('DOMContentLoaded', () => {

  const galleries = document.querySelectorAll(
    '.product-gallery'
  );


  galleries.forEach((gallery) => {

    const mainViewport =
      gallery.querySelector(
        '.product-gallery__viewport'
      );


    const thumbsViewport =
      gallery.querySelector(
        '.product-gallery__thumbs-viewport'
      );


    if (!mainViewport) {
      return;
    }


    /*
     * Main carousel
     */

    const mainCarousel = EmblaCarousel(
      mainViewport,
      {
        loop: false,
        align: 'start'
      }
    );


    /*
     * Thumbnail carousel
     */

    let thumbsCarousel = null;


    if (thumbsViewport) {

      thumbsCarousel = EmblaCarousel(
        thumbsViewport,
        {
          containScroll: 'keepSnaps',
          dragFree: true
        }
      );

    }


    /*
     * Thumbnail buttons
     */

    const thumbnails =
      gallery.querySelectorAll(
        '.product-gallery__thumb'
      );


    /*
     * Select thumbnail
     */

    const selectThumbnail = () => {

      const selectedIndex =
        mainCarousel.selectedScrollSnap();


      thumbnails.forEach(
        (thumbnail, index) => {

          thumbnail.classList.toggle(
            'is-selected',
            index === selectedIndex
          );

        }
      );


      /*
       * Scroll thumbnail carousel
       * so selected thumbnail is visible
       */

      if (thumbsCarousel) {

        thumbsCarousel.scrollTo(
          selectedIndex
        );

      }

    };


    /*
     * Click thumbnail
     */

    thumbnails.forEach(
      (thumbnail, index) => {

        thumbnail.addEventListener(
          'click',
          () => {

            mainCarousel.scrollTo(index);

          }
        );

      }
    );


    /*
     * Main carousel changed
     */

    mainCarousel.on(
      'select',
      selectThumbnail
    );


    /*
     * Initial selected thumbnail
     */

    selectThumbnail();


    /*
     * Previous button
     */

    const previousButton =
      gallery.querySelector(
        '.product-gallery__arrow--prev'
      );


    previousButton?.addEventListener(
      'click',
      () => {

        mainCarousel.scrollPrev();

      }
    );


    /*
     * Next button
     */

    const nextButton =
      gallery.querySelector(
        '.product-gallery__arrow--next'
      );


    nextButton?.addEventListener(
      'click',
      () => {

        mainCarousel.scrollNext();

      }
    );


    console.log(
      'Product gallery initialized:',
      gallery.id
    );

  });

});