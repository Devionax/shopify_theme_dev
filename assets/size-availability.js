
  class SizeAvailabilityModal extends HTMLElement {

    constructor() {
      super();

      this.dialog = null;
      this.openButton = null;
      this.closeButtons = [];
    }


   connectedCallback() {

  console.log(
    'CONNECTED CALLBACK RUNNING'
  );

  console.log(
    'THIS:',
    this
  );

  console.log(
    'HTML:',
    this.innerHTML
  );

  this.dialog =
    this.querySelector('dialog');

  this.openButton =
    this.querySelector('[data-open]');

  console.log(
    'DIALOG FOUND:',
    this.dialog
  );

  console.log(
    'BUTTON FOUND:',
    this.openButton
  );

}


    initialize() {

      this.dialog = this.querySelector('dialog');

      this.openButton = this.querySelector('[data-open]');

      this.closeButtons = this.querySelectorAll('[data-close]');


      console.log('Dialog:', this.dialog);
      console.log('Open button:', this.openButton);
      console.log('Close buttons:', this.closeButtons);


      if (!this.dialog) {
        console.error(
          'SizeAvailabilityModal: dialog not found'
        );

        return;
      }


      if (!this.openButton) {
        console.error(
          'SizeAvailabilityModal: open button not found'
        );

        return;
      }


      /*
       * Prevent duplicate event listeners
       */

      if (this.initialized) {
        return;
      }

      this.initialized = true;


      /*
       * OPEN
       */

      this.openButton.addEventListener(
        'click',
        this.handleOpen.bind(this)
      );


      /*
       * CLOSE
       */

      this.closeButtons.forEach((button) => {

        button.addEventListener(
          'click',
          this.handleClose.bind(this)
        );

      });


      /*
       * BACKDROP CLICK
       */

      this.dialog.addEventListener(
        'click',
        this.handleDialogClick.bind(this)
      );

    }


    handleOpen(event) {

      event.preventDefault();

      console.log('Size availability open clicked');

      if (!this.dialog) {
        console.error('Dialog does not exist');

        return;
      }


      if (!this.dialog.open) {

        this.dialog.showModal();

        console.log('Dialog opened');

      }

    }


    handleClose(event) {

      event.preventDefault();

      console.log('Size availability close clicked');

      if (
        this.dialog &&
        this.dialog.open
      ) {

        this.dialog.close();

        console.log('Dialog closed');

      }

    }


    handleDialogClick(event) {

      /*
       * If user clicks the dialog backdrop
       */

      if (event.target === this.dialog) {

        this.dialog.close();

      }

    }

  }


  /*
   * Register custom element
   */

  if (
    !customElements.get(
      'size-availability-modal'
    )
  ) {

    customElements.define(
      'size-availability-modal',
      SizeAvailabilityModal
    );

  }

