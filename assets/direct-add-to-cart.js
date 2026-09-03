(() => {
  if (window.directAddToCartInitialized) return;

  window.directAddToCartInitialized = true;


  // =====================================================
  // UPDATE ONLY CART ICON + CART NUMBER
  // =====================================================

  async function test_cart() {
    try {
      // Get latest cart
      const response = await fetch('/cart.js');

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const cart = await response.json();

      console.log('Latest cart:', cart);


      // -----------------------------------------------
      // Cart total quantity
      // -----------------------------------------------

      const cartCount = cart.item_count;

      console.log('Cart item count:', cartCount);


      // -----------------------------------------------
      // Find cart icon
      // -----------------------------------------------

      const cartIcon =
        document.querySelector('cart-icon');

      if (!cartIcon) {
        console.warn('cart-icon not found');
        return cart;
      }


      // -----------------------------------------------
      // Find cart bubble
      // -----------------------------------------------

      const cartBubble =
        cartIcon.querySelector(
          '[ref="cartBubble"]'
        );

      const cartBubbleCount =
        cartIcon.querySelector(
          '[ref="cartBubbleCount"]'
        );


      if (!cartBubble || !cartBubbleCount) {
        console.warn(
          'Cart bubble or cart bubble count not found'
        );

        return cart;
      }


      // -----------------------------------------------
      // UPDATE NUMBER
      // -----------------------------------------------

      cartBubbleCount.textContent =
        cartCount.toString();


      // -----------------------------------------------
      // SHOW / HIDE CART BUBBLE
      // -----------------------------------------------

      if (cartCount > 0) {

        cartBubble.classList.remove(
          'visually-hidden'
        );

        cartBubbleCount.classList.remove(
          'hidden'
        );

        cartBubbleCount.setAttribute(
          'aria-hidden',
          'false'
        );

      } else {

        cartBubble.classList.add(
          'visually-hidden'
        );

        cartBubbleCount.classList.add(
          'hidden'
        );

        cartBubbleCount.setAttribute(
          'aria-hidden',
          'true'
        );
      }


      // -----------------------------------------------
      // UPDATE ACCESSIBILITY TEXT
      // -----------------------------------------------

      const cartBubbleText =
        cartIcon.querySelector(
          '[ref="cartBubbleText"]'
        );

      if (cartBubbleText) {

        cartBubbleText.setAttribute(
          'aria-label',
          `Cart contains ${cartCount} items`
        );
      }


      console.log(
        'Cart icon updated:',
        cartCount
      );

      return cart;

    } catch (error) {

      console.error(
        'Failed to update cart icon:',
        error
      );

      return null;
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


      button.dataset.loading = 'true';


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

        const url = new URL(
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
          'Cart sections:',
          sectionIds
        );


        // ===============================================
        // ADD PRODUCT TO CART
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
                    id: Number(variantId),
                    quantity: 1
                  }
                ],

                sections:
                  sectionIds.join(',')

              })
            }
          );


        // ===============================================
        // HANDLE ERROR
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
        // SUCCESS RESPONSE
        // ===============================================

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


        // ===============================================
        // ⭐ UPDATE ONLY CART ICON
        // ===============================================

        await test_cart();


        console.log(
          'Cart icon successfully updated'
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