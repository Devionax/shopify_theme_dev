(() => {
  if (window.directAddToCartInitialized) return;

  window.directAddToCartInitialized = true;

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.direct_addtocart_btn');

    if (!button) return;

    event.preventDefault();

    if (button.dataset.loading === 'true') return;

    button.dataset.loading = 'true';

    try {
      // ------------------------------------------
      // GET VARIANT URL
      // ------------------------------------------

      const variantUrl = button.getAttribute('data-variant-url');

      if (!variantUrl) {
        console.error('Variant URL not found');
        return;
      }

      const url = new URL(
        variantUrl,
        window.location.origin
      );

      const variantId = url.searchParams.get('variant');

      console.log('Variant ID:', variantId);

      if (!variantId) {
        console.error('Variant ID not found');
        return;
      }


      // ------------------------------------------
      // GET CART SECTION IDS
      // ------------------------------------------

      const cartItemsComponents =
        document.querySelectorAll('cart-items-component');

      const sectionIds = [];

      cartItemsComponents.forEach((item) => {
        if (
          item instanceof HTMLElement &&
          item.dataset.sectionId
        ) {
          sectionIds.push(item.dataset.sectionId);
        }
      });

      console.log('Cart sections:', sectionIds);


      // ------------------------------------------
      // ADD TO CART
      // ------------------------------------------

      const response = await fetch('/cart/add.js', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({
          items: [
            {
              id: Number(variantId),
              quantity: 1
            }
          ],

          // ⭐ IMPORTANT
          sections: sectionIds.join(',')
        })
      });


      // ------------------------------------------
      // ERROR
      // ------------------------------------------

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        console.error(
          'Cart request failed:',
          response.status,
          errorData
        );

        return;
      }


      // ------------------------------------------
      // RESPONSE
      // ------------------------------------------

      const data = await response.json();

      console.log('Added to cart:', data);

      console.log(
        'Cart sections returned:',
        data.sections
      );


      // ------------------------------------------
      // GET UPDATED CART
      // ------------------------------------------

      const cartResponse = await fetch('/cart.js');

      const cart = await cartResponse.json();

      console.log('Updated cart:', cart);


      // ------------------------------------------
      // FIND PRODUCT FORM COMPONENT
      // ------------------------------------------

      const productForm =
        document.querySelector('product-form-component');


      // ------------------------------------------
      // DISPATCH CART EVENT
      // ------------------------------------------

      if (
        productForm &&
        typeof CartAddEvent !== 'undefined'
      ) {

        productForm.dispatchEvent(
          new CartAddEvent(
            cart,
            productForm.id || 'direct-add-to-cart',
            {
              source: 'product-form-component',

              itemCount: 1,

              productId:
                productForm.dataset.productId,

              // ⭐ IMPORTANT
              sections: data.sections
            }
          )
        );

        console.log(
          'CartAddEvent dispatched'
        );
      } else {

        console.warn(
          'product-form-component or CartAddEvent not found'
        );
      }

    } catch (error) {

      console.error(
        'Add to cart error:',
        error
      );

    } finally {

      button.dataset.loading = 'false';

    }
  });

})();