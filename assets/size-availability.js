console.log("NUHVI SIZE AVAILABILITY JS LOADED");


class SizeAvailabilityModal extends HTMLElement {

  constructor() {
    super();

    this.dialog = null;
    this.openButton = null;
    this.closeButtons = null;
    this.initialized = false;

    this.observer = null;

    console.log("🔥 constructor called");
  }


  connectedCallback() {

    console.log("🔥 connectedCallback called");

    this.initialize();

  }


  initialize() {

    /*
     * If the children aren't available yet,
     * wait for them to appear.
     */

    this.dialog = this.querySelector("dialog");

    this.openButton = this.querySelector("[data-open]");

    this.closeButtons = this.querySelectorAll("[data-close]");


    console.log("dialog:", this.dialog);

    console.log("open button:", this.openButton);

    console.log("close buttons:", this.closeButtons);


    /*
     * Children aren't available yet.
     */

    if (!this.dialog || !this.openButton) {

      console.log(
        "⏳ Waiting for dialog and button..."
      );

      this.waitForChildren();

      return;
    }


    /*
     * Already initialized
     */

    if (this.initialized) {
      return;
    }


    this.initialized = true;


    this.setupEvents();

  }


  waitForChildren() {

    /*
     * Don't create multiple observers.
     */

    if (this.observer) {
      return;
    }


    this.observer = new MutationObserver(() => {

      console.log(
        "🔄 DOM changed, checking again..."
      );


      this.dialog =
        this.querySelector("dialog");


      this.openButton =
        this.querySelector("[data-open]");


      this.closeButtons =
        this.querySelectorAll("[data-close]");


      if (
        this.dialog &&
        this.openButton
      ) {

        console.log(
          "✅ Dialog and button found!"
        );


        this.observer.disconnect();

        this.observer = null;


        this.setupEvents();

      }

    });


    this.observer.observe(
      this,
      {
        childList: true,
        subtree: true
      }
    );

  }


  setupEvents() {

    if (this.initialized) {
      return;
    }


    this.initialized = true;


    console.log(
      "🔥 Setting up modal events"
    );


    /*
     * OPEN
     */

    this.openButton.addEventListener(
      "click",
      this.handleOpen.bind(this)
    );


    /*
     * CLOSE
     */

    this.closeButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          this.handleClose.bind(this)
        );

      }
    );


    /*
     * BACKDROP
     */

    this.dialog.addEventListener(
      "click",
      this.handleDialogClick.bind(this)
    );


    console.log(
      "✅ Modal events ready"
    );

  }


  handleOpen(event) {

    event.preventDefault();

    console.log(
      "🔥 BUTTON CLICKED"
    );


    if (
      this.dialog &&
      !this.dialog.open
    ) {

      this.dialog.showModal();

      console.log(
        "✅ DIALOG OPENED"
      );

    }

  }


  handleClose(event) {

    event.preventDefault();

    console.log(
      "🔥 CLOSE BUTTON CLICKED"
    );


    if (
      this.dialog &&
      this.dialog.open
    ) {

      this.dialog.close();

    }

  }


  handleDialogClick(event) {

    if (
      event.target === this.dialog
    ) {

      this.dialog.close();

    }

  }


  disconnectedCallback() {

    console.log(
      "🧹 SizeAvailabilityModal disconnected"
    );


    if (this.observer) {

      this.observer.disconnect();

      this.observer = null;

    }

  }

}


/*
 * Register custom element only once
 */

if (
  !customElements.get(
    "size-availability-modal"
  )
) {

  customElements.define(
    "size-availability-modal",
    SizeAvailabilityModal
  );

  console.log(
    "🔥 size-availability-modal registered"
  );

}