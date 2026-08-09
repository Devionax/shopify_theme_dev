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

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Cart request failed:', response.status, errorData);
        return;
      }

      const data = await response.json();

      console.log('Added to cart:', data);

    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      button.dataset.loading = 'false';
    }
  });
})();