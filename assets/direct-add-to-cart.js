(() => {
  if (window.directAddToCartInitialized) return;

  window.directAddToCartInitialized = true;


  // =====================================================
  // UPDATE CART ICON + CART DRAWER
  // =====================================================

  // async function test_cart(sections) {
  //   try {

  //     // =================================================
  //     // 1. GET CURRENT CART
  //     // =================================================

  //     const cartResponse = await fetch('/cart.js');

  //     if (!cartResponse.ok) {
  //       throw new Error('Failed to fetch cart');
  //     }

  //     const cart = await cartResponse.json();

  //     console.log('Latest cart:', cart);


  //     // =================================================
  //     // 2. UPDATE CART ICON NUMBER
  //     // =================================================

  //     const cartIcon =
  //       document.querySelector('cart-icon');

  //     if (cartIcon) {

  //       const cartBubble =
  //         cartIcon.querySelector(
  //           '[ref="cartBubble"]'
  //         );

  //       const cartBubbleCount =
  //         cartIcon.querySelector(
  //           '[ref="cartBubbleCount"]'
  //         );


  //       if (
  //         cartBubble &&
  //         cartBubbleCount
  //       ) {

  //         // Update number
  //         cartBubbleCount.textContent =
  //           cart.item_count.toString();


  //         // Show / hide bubble
  //         if (cart.item_count > 0) {

  //           cartBubble.classList.remove(
  //             'visually-hidden'
  //           );

  //           cartBubbleCount.classList.remove(
  //             'hidden'
  //           );

  //           cartBubbleCount.setAttribute(
  //             'aria-hidden',
  //             'false'
  //           );

  //         } else {

  //           cartBubble.classList.add(
  //             'visually-hidden'
  //           );

  //           cartBubbleCount.classList.add(
  //             'hidden'
  //           );

  //           cartBubbleCount.setAttribute(
  //             'aria-hidden',
  //             'true'
  //           );
  //         }
  //       }
  //     }


  //     // =================================================
  //     // 3. UPDATE CART DRAWER
  //     // =================================================

  //     if (!sections) {
  //       console.warn(
  //         'No sections returned'
  //       );

  //       return cart;
  //     }


  //     console.log(
  //       'Sections received:',
  //       sections
  //     );


  //     // Get returned header section
  //     const sectionHtml =
  //       Object.values(sections)[0];


  //     if (!sectionHtml) {
  //       console.warn(
  //         'No section HTML found'
  //       );

  //       return cart;
  //     }


  //     // Parse Shopify HTML
  //     const parser =
  //       new DOMParser();

  //     const newDocument =
  //       parser.parseFromString(
  //         sectionHtml,
  //         'text/html'
  //       );


  //     // =================================================
  //     // Find NEW cart items component
  //     // =================================================

  //     const newCartItems =
  //       newDocument.querySelector(
  //         'cart-items-component'
  //       );


  //     if (!newCartItems) {

  //       console.warn(
  //         'New cart-items-component not found'
  //       );

  //       return cart;
  //     }


  //     // =================================================
  //     // Find CURRENT cart items component
  //     // =================================================

  //     const currentCartItems =
  //       document.querySelector(
  //         'cart-items-component'
  //       );


  //     if (!currentCartItems) {

  //       console.warn(
  //         'Current cart-items-component not found'
  //       );

  //       return cart;
  //     }


  //     // =================================================
  //     // IMPORTANT
  //     // =================================================
  //     // Don't replace the whole header.
  //     // Replace only the cart-items-component content.
  //     // =================================================

  //     currentCartItems.innerHTML =
  //       newCartItems.innerHTML;


  //     // Keep data attributes
  //     currentCartItems.setAttribute(
  //       'data-section-id',
  //       newCartItems.getAttribute(
  //         'data-section-id'
  //       ) || ''
  //     );


  //     console.log(
  //       'Cart drawer updated'
  //     );


  //     return cart;

  //   } catch (error) {

  //     console.error(
  //       'test_cart error:',
  //       error
  //     );

  //     return null;
  //   }
  // }


  function test_cart(sections) {
  if (!sections) {
    console.warn('No sections returned');
    return;
  }

  console.log('Updating cart UI:', sections);

  // ==========================================
  // Get returned Shopify section HTML
  // ==========================================

  const sectionHtml =
    Object.values(sections)[0];

  if (!sectionHtml) {
    console.warn('Section HTML not found');
    return;
  }


  // ==========================================
  // Convert HTML string → DOM
  // ==========================================

  const parser = new DOMParser();

  const newDocument =
    parser.parseFromString(
      sectionHtml,
      'text/html'
    );


  // ==========================================
  // Get NEW cart count from Shopify HTML
  // ==========================================

  const newCartCount =
    newDocument.querySelector(
      '[ref="cartBubbleCount"]'
    );


  // ==========================================
  // Get CURRENT cart count
  // ==========================================

  const currentCartCount =
    document.querySelector(
      'cart-icon [ref="cartBubbleCount"]'
    );


  const currentCartBubble =
    document.querySelector(
      'cart-icon [ref="cartBubble"]'
    );


  // ==========================================
  // Update ONLY cart number
  // ==========================================

  if (
    newCartCount &&
    currentCartCount
  ) {

    currentCartCount.textContent =
      newCartCount.textContent.trim();

    console.log(
      'Cart number updated:',
      newCartCount.textContent.trim()
    );
  }


  // ==========================================
  // Update cart bubble visibility
  // ==========================================

  if (
    currentCartBubble &&
    currentCartCount
  ) {

    const count =
      Number(
        newCartCount?.textContent.trim()
      ) || 0;


    if (count > 0) {

      currentCartBubble.classList.remove(
        'visually-hidden'
      );

      currentCartCount.classList.remove(
        'hidden'
      );

      currentCartCount.setAttribute(
        'aria-hidden',
        'false'
      );

    } else {

      currentCartBubble.classList.add(
        'visually-hidden'
      );

      currentCartCount.classList.add(
        'hidden'
      );

      currentCartCount.setAttribute(
        'aria-hidden',
        'true'
      );
    }
  }


  // ==========================================
  // Update CART DRAWER
  // ==========================================

  const newCartItems =
    newDocument.querySelector(
      'cart-items-component'
    );


  const currentCartItems =
    document.querySelector(
      'cart-items-component'
    );


  if (
    newCartItems &&
    currentCartItems
  ) {

    currentCartItems.innerHTML =
      newCartItems.innerHTML;

    console.log(
      'Cart drawer updated'
    );
  }
}



  // =====================================================
  // DIRECT ADD TO CART
  // =====================================================

  document.addEventListener(
    'click',
    async (event) => {

      const button =
        event.target.closest(
          '.direct_addtocart_btn'
        );


      if (!button) return;


      event.preventDefault();


      // Prevent double click
      if (
        button.dataset.loading === 'true'
      ) {
        return;
      }


      button.dataset.loading =
        'true';


      try {

        // ===============================================
        // GET VARIANT URL
        // ===============================================

        const variantUrl =
          button.getAttribute(
            'data-variant-url'
          );


        if (!variantUrl) {

          console.error(
            'Variant URL not found'
          );

          return;
        }


        // ===============================================
        // GET VARIANT ID
        // ===============================================

        const url =
          new URL(
            variantUrl,
            window.location.origin
          );


        const variantId =
          url.searchParams.get(
            'variant'
          );


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


        // ===============================================
        // GET CART SECTION IDS
        // ===============================================

        const cartItemsComponents =
          document.querySelectorAll(
            'cart-items-component'
          );


        const sectionIds = [];


        cartItemsComponents.forEach(
          (item) => {

            if (
              item instanceof HTMLElement &&
              item.dataset.sectionId
            ) {

              sectionIds.push(
                item.dataset.sectionId
              );

            }

          }
        );


        console.log(
          'Section IDs:',
          sectionIds
        );


        // ===============================================
        // ADD TO CART
        // ===============================================

        const response =
          await fetch(
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
                    id:
                      Number(variantId),

                    quantity: 1
                  }
                ],

                sections:
                  sectionIds.join(',')

              })
            }
          );


        // ===============================================
        // ERROR
        // ===============================================

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


        // ===============================================
        // SUCCESS
        // ===============================================

        const data =
          await response.json();


        console.log(
          'Added to cart:',
          data
        );


        console.log(
          'Returned sections:',
          data.sections
        );


        // ===============================================
        // ⭐ UPDATE CART
        // ===============================================

        await test_cart(
          data.sections
        );


        console.log(
          'Everything updated'
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

    }
  );

})();