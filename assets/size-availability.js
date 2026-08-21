
  class SizeAvailabilityModal extends HTMLElement {

    connectedCallback() {

      this.dialog = this.querySelector('dialog');

      this.openButton = this.querySelector('[data-open]');

      this.closeButtons = this.querySelectorAll('[data-close]');


      /* =========================
         SAFETY CHECK
      ========================= */

      if (!this.dialog || !this.openButton) {
        return;
      }


      /* =========================
         OPEN BUTTON
      ========================= */

      this.openButton.addEventListener(
        'click',
        (event) => {

          event.preventDefault();

          if (!this.dialog.open) {
            this.dialog.showModal();
          }

        }
      );


      /* =========================
         CLOSE BUTTONS
      ========================= */

      this.closeButtons.forEach(
        (button) => {

          button.addEventListener(
            'click',
            (event) => {

              event.preventDefault();

              if (this.dialog.open) {
                this.dialog.close();
              }

            }
          );

        }
      );


      /* =========================
         BACKDROP CLICK
      ========================= */

      this.dialog.addEventListener(
        'click',
        (event) => {

          if (event.target === this.dialog) {

            this.dialog.close();

          }

        }
      );

    }

  }


  /* =========================
     REGISTER CUSTOM ELEMENT
  ========================= */

  if (!customElements.get('size-availability-modal')) {

    customElements.define(
      'size-availability-modal',
      SizeAvailabilityModal
    );

  }

