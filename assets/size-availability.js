class SizeAvailabilityModal extends HTMLElement {

  constructor() {
    super();

    console.log('SizeAvailabilityModal constructor');
  }

  connectedCallback() {

    console.log('CONNECTED CALLBACK RUNNING');
    console.log('THIS:', this);

    this.dialog = this.querySelector('dialog');

    this.openButton = this.querySelector('[data-open]');

    this.closeButtons = this.querySelectorAll('[data-close]');

    console.log('DIALOG FOUND:', this.dialog);
    console.log('BUTTON FOUND:', this.openButton);
    console.log('CLOSE BUTTONS:', this.closeButtons);

    if (!this.dialog || !this.openButton) {
      console.error(
        'SizeAvailabilityModal: dialog or button not found'
      );

      return;
    }

    this.openButton.addEventListener(
      'click',
      () => {

        console.log('OPEN BUTTON CLICKED');

        if (!this.dialog.open) {
          this.dialog.showModal();
        }

      }
    );


    this.closeButtons.forEach((button) => {

      button.addEventListener(
        'click',
        () => {

          console.log('CLOSE BUTTON CLICKED');

          if (this.dialog.open) {
            this.dialog.close();
          }

        }
      );

    });


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


if (!customElements.get('size-availability-modal')) {

  customElements.define(
    'size-availability-modal',
    SizeAvailabilityModal
  );

}