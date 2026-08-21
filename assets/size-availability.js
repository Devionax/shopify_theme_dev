// console.log("nuhvi")

// class SizeAvailabilityModal extends HTMLElement {

//   constructor() {
//     super();

//     console.log('🔥 constructor called');
//   }

//   connectedCallback() {

//     console.log('🔥 connectedCallback called');

//     this.dialog = this.querySelector('dialog');
//     this.openButton = this.querySelector('[data-open]');
//     this.closeButtons = this.querySelectorAll('[data-close]');

//     console.log('dialog:', this.dialog);
//     console.log('open button:', this.openButton);
//     console.log('close buttons:', this.closeButtons);

//     if (!this.dialog || !this.openButton) {
//       console.error('❌ dialog or button not found');
//       return;
//     }

//     this.openButton.addEventListener('click', () => {

//       console.log('🔥 BUTTON CLICKED');

//       if (!this.dialog.open) {
//         this.dialog.showModal();
//       }

//     });

//     this.closeButtons.forEach((button) => {

//       button.addEventListener('click', () => {

//         console.log('🔥 CLOSE CLICKED');

//         if (this.dialog.open) {
//           this.dialog.close();
//         }

//       });

//     });

//   }
// }


// console.log(
//   'custom element already registered:',
//   customElements.get('size-availability-modal')
// );


// if (!customElements.get('size-availability-modal')) {

//   customElements.define(
//     'size-availability-modal',
//     SizeAvailabilityModal
//   );

//   console.log('🔥 custom element registered');

// }


console.log("nuhvi");

class SizeAvailabilityModal extends HTMLElement {

  connectedCallback() {
    console.log("🔥 connectedCallback called");

    this.dialog = this.querySelector("dialog");
    this.openButton = this.querySelector("[data-open]");

    console.log("dialog:", this.dialog);
    console.log("button:", this.openButton);

    this.openButton.addEventListener("click", () => {
      console.log("🔥 BUTTON CLICKED");
      this.dialog.showModal();
    });
  }
}

customElements.define(
  "size-availability-modal",
  SizeAvailabilityModal
);