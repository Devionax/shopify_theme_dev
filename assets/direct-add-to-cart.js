(() => {
  if (window.directAddToCartInitialized) return;

  window.directAddToCartInitialized = true;

  // ==========================================
  // UPDATE CART
  // ==========================================
  async function test_cart() {
    try {
      // Get latest cart
      const cartResponse = await fetch('/cart.js');

      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart');
      }

      const cart = await cartResponse.json();

      console.log('Updated cart:', cart);

      // Find product form component
      const productForm = document.querySelector(
        'product-form-component'
      );

      // Tell Shopify theme that cart was updated
      if (productForm && typeof CartAddEvent !== 'undefined') {
        productForm.dispatchEvent(
          new CartAddEvent(cart, 'direct-add-to-cart', {
            source: 'direct-add-to-cart',
            itemCount: cart.item_count,
          })
        );
      }

      return cart;

    } catch (error) {
      console.error('Cart update error:', error);
      return null;
    }
  }


  // ==========================================
  // DIRECT ADD TO CART
  // ==========================================
  document.addEventListener('click', async (event) => {

    const button = event.target.closest('.direct_addtocart_btn');

    if (!button) return;

    event.preventDefault();

    // Prevent multiple clicks
    if (button.dataset.loading === 'true') return;

    button.dataset.loading = 'true';

    try {

      // ==========================================
      // GET VARIANT URL
      // ==========================================
      const variantUrl = button.getAttribute(
        'data-variant-url'
      );

      if (!variantUrl) {
        console.error('Variant URL not found');
        return;
      }


      // ==========================================
      // GET VARIANT ID
      // ==========================================
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


      // ==========================================
      // ADD PRODUCT TO CART
      // ==========================================
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
          ]
        })
      });


      // ==========================================
      // HANDLE ERROR
      // ==========================================
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


      // ==========================================
      // ADD SUCCESS
      // ==========================================
      const data = await response.json();

      console.log(
        'Added to cart:',
        data
      );


      // ==========================================
      // UPDATE CART ICON / CART UI
      // ==========================================
      const cart = await test_cart();

      console.log(
        'Cart after adding:',
        cart
      );


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