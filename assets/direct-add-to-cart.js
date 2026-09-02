(() => {
  if (window.directAddToCartInitialized) return;

  window.directAddToCartInitialized = true;


  // ==========================================
  // UPDATE CART UI
  // ==========================================

  function test_cart(sections) {
    if (!sections) {
      console.error('No cart sections returned');
      return;
    }

    console.log('Updating cart UI with sections:', sections);

    Object.entries(sections).forEach(([sectionId, html]) => {

      // Shopify section ID
      const currentSection = document.getElementById(sectionId);

      if (!currentSection) {
        console.warn(
          'Section not found in DOM:',
          sectionId
        );
        return;
      }

      // Convert returned HTML string into DOM
      const parser = new DOMParser();

      const newDocument = parser.parseFromString(
        html,
        'text/html'
      );

      const newSection = newDocument.querySelector(
        `#${CSS.escape(sectionId)}`
      );

      if (!newSection) {
        console.warn(
          'New section not found:',
          sectionId
        );
        return;
      }

      // Replace old section with new Shopify section
      currentSection.replaceWith(
        newSection
      );

      console.log(
        'Updated section:',
        sectionId
      );
    });
  }


  // ==========================================
  // DIRECT ADD TO CART
  // ==========================================

  document.addEventListener('click', async (event) => {

    const button =
      event.target.closest('.direct_addtocart_btn');

    if (!button) return;

    event.preventDefault();


    // Prevent double click
    if (button.dataset.loading === 'true') {
      return;
    }

    button.dataset.loading = 'true';


    try {

      // ==========================================
      // GET VARIANT URL
      // ==========================================

      const variantUrl =
        button.getAttribute('data-variant-url');

      if (!variantUrl) {
        console.error(
          'Variant URL not found'
        );
        return;
      }


      // ==========================================
      // GET VARIANT ID
      // ==========================================

      const url = new URL(
        variantUrl,
        window.location.origin
      );

      const variantId =
        url.searchParams.get('variant');

      console.log(
        'Variant ID:',
        variantId
      );

      if (!variantId) {
        console.error(
          'Variant ID not found'
        );
        return;
      }


      // ==========================================
      // GET SHOPIFY SECTION IDS
      // ==========================================

      const cartItemsComponents =
        document.querySelectorAll(
          'cart-items-component'
        );

      const sectionIds = [];

      cartItemsComponents.forEach((item) => {

        if (
          item instanceof HTMLElement &&
          item.dataset.sectionId
        ) {
          sectionIds.push(
            item.dataset.sectionId
          );
        }

      });


      console.log(
        'Cart section IDs:',
        sectionIds
      );


      // ==========================================
      // ADD TO CART
      // ==========================================

      const response = await fetch(
        '/cart/add.js',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            'Accept':
              'application/json'
          },

          body: JSON.stringify({

            items: [
              {
                id: Number(variantId),
                quantity: 1
              }
            ],

            sections:
              sectionIds.join(',')

          })
        }
      );


      // ==========================================
      // HANDLE ERROR
      // ==========================================

      if (!response.ok) {

        const errorData =
          await response
            .json()
            .catch(() => null);

        console.error(
          'Cart request failed:',
          response.status,
          errorData
        );

        return;
      }


      // ==========================================
      // SHOPIFY RESPONSE
      // ==========================================

      const data =
        await response.json();

      console.log(
        'Added to cart:',
        data
      );


      console.log(
        'Cart sections returned:',
        data.sections
      );


      // ==========================================
      // ⭐ UPDATE CART ICON
      // ==========================================

      test_cart(
        data.sections
      );


      console.log(
        'Cart UI updated'
      );


    } catch (error) {

      console.error(
        'Add to cart error:',
        error
      );

    } finally {

      button.dataset.loading =
        'false';

    }

  });

})();