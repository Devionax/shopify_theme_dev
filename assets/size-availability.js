import { Component } from '@theme/component';

console.log(Component)

console.log('1. Start');

requestAnimationFrame(() => {
  console.log('3. requestAnimationFrame callback');
});

console.log('2. End');


class SizeAvailabilityModal extends Component {

  constructor() {
    super();

    this.dialog = null;
    this.openButton = null;
    this.closeButtons = [];

    this.initialized = false;

    /*
     * Store bound functions so we can
     * remove listeners if needed.
     */
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }


  connectedCallback() {

    console.log('SizeAvailabilityModal connected');

    this.initialize();

  }


  initialize() {

    /*
     * Prevent duplicate initialization
     */
    if (this.initialized) {
      return;
    }


    /*
     * Find elements
     */
    this.dialog = this.querySelector('dialog');

    this.openButton = this.querySelector('[data-open]');

    this.closeButtons = this.querySelectorAll('[data-close]');


    console.log('Dialog:', this.dialog);
    console.log('Open button:', this.openButton);
    console.log('Close buttons:', this.closeButtons);


    /*
     * Check dialog
     */
    if (!this.dialog) {

      console.error(
        'SizeAvailabilityModal: dialog not found'
      );

      return;
    }


    /*
     * Check open button
     */
    if (!this.openButton) {

      console.error(
        'SizeAvailabilityModal: open button not found'
      );

      return;
    }


    /*
     * Mark initialized
     */
    this.initialized = true;


    /*
     * =========================
     * OPEN BUTTON
     * =========================
     */

    this.openButton.addEventListener(
      'click',
      this.handleOpen
    );


    /*
     * =========================
     * CLOSE BUTTONS
     * =========================
     */

    this.closeButtons.forEach((button) => {

      button.addEventListener(
        'click',
        this.handleClose
      );

    });


    /*
     * =========================
     * BACKDROP CLICK
     * =========================
     */

    this.dialog.addEventListener(
      'click',
      this.handleDialogClick
    );


    /*
     * =========================
     * ESCAPE KEY
     * =========================
     *
     * Native dialog normally closes
     * immediately when Escape is pressed.
     *
     * We prevent that and use our
     * smooth closing animation instead.
     */

    this.dialog.addEventListener(
      'cancel',
      (event) => {

        event.preventDefault();

        this.close();

      }
    );

  }


  /*
   * =========================
   * OPEN
   * =========================
   */

  handleOpen(event) {

    event.preventDefault();

    console.log(
      'Size availability open clicked'
    );


    /*
     * Dialog already open
     */
    if (
      !this.dialog ||
      this.dialog.open
    ) {

      return;

    }


    /*
     * Remove old animation states
     */
    this.dialog.classList.remove(
      'is-closing'
    );

    this.dialog.classList.remove(
      'is-open'
    );


    /*
     * Open native HTML dialog
     */
    this.dialog.showModal();


    console.log(
      'Dialog opened'
    );


    /*
     * IMPORTANT:
     *
     * Wait for browser to paint the
     * initial state before adding
     * .is-open.
     *
     * This allows CSS transition
     * to actually happen.
     */

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        if (!this.dialog.open) {
          return;
        }


        this.dialog.classList.add(
          'is-open'
        );


        console.log(
          'Open animation started'
        );

      });

    });

  }


  /*
   * =========================
   * CLOSE BUTTON
   * =========================
   */

  handleClose(event) {

    event.preventDefault();

    console.log(
      'Size availability close clicked'
    );


    this.close();

  }


  /*
   * =========================
   * CLOSE
   * =========================
   */

  close() {

    /*
     * Nothing to close
     */
    if (
      !this.dialog ||
      !this.dialog.open
    ) {

      return;

    }


    /*
     * Remove open state
     */
    this.dialog.classList.remove(
      'is-open'
    );


    /*
     * Add closing state
     */
    this.dialog.classList.add(
      'is-closing'
    );


    console.log(
      'Close animation started'
    );


    /*
     * Wait until CSS transition
     * finishes.
     */
    this.dialog.addEventListener(
      'transitionend',
      this.handleTransitionEnd
    );

  }


  /*
   * =========================
   * TRANSITION END
   * =========================
   */

  handleTransitionEnd(event) {

    /*
     * We only want the dialog's
     * opacity/transform transition.
     */

    if (
      event.target !== this.dialog
    ) {

      return;

    }


    if (
      event.propertyName !== 'opacity' &&
      event.propertyName !== 'transform'
    ) {

      return;

    }


    /*
     * Remove listener
     */
    this.dialog.removeEventListener(
      'transitionend',
      this.handleTransitionEnd
    );


    /*
     * Actually close the native dialog
     */
    if (this.dialog.open) {

      this.dialog.close();

    }


    /*
     * Clean animation class
     */
    this.dialog.classList.remove(
      'is-closing'
    );


    console.log(
      'Dialog closed'
    );

  }


  /*
   * =========================
   * BACKDROP CLICK
   * =========================
   */

  handleDialogClick(event) {

    /*
     * When clicking the backdrop,
     * event.target is the dialog itself.
     */

    if (
      event.target === this.dialog
    ) {

      console.log(
        'Backdrop clicked'
      );


      this.close();

    }

  }


}


/*
 * =========================
 * REGISTER CUSTOM ELEMENT
 * =========================
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