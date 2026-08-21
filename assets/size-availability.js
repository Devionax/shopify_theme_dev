


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