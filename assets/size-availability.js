class SizeAvailabilityModal extends HTMLElement {
  constructor() {
    super();
    this.dialog = null;
    this.openButton = null;
    this.closeButtons = [];
  }

  connectedCallback() {
    // Query elements inside this custom element
    this.dialog = this.querySelector('dialog');
    this.openButton = this.querySelector('[data-open]');
    this.closeButtons = this.querySelectorAll('[data-close]');

    if (!this.dialog || !this.openButton) {
      console.warn('SizeAvailabilityModal: Missing required markup elements.');
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    // Open dialog
    this.openButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.dialog.open) {
        this.dialog.showModal();
      }
    });

    // Close dialog via close buttons
    this.closeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.dialog.open) {
          this.dialog.close();
        }
      });
    });

    // Close when clicking the backdrop
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this.dialog.close();
      }
    });
  }

  disconnectedCallback() {
    // Cleanup reference listeners if removed from DOM
    if (this.openButton) {
      this.openButton.removeEventListener('click', () => {});
    }
  }
}

// Register Custom Element safely
if (!customElements.get('size-availability-modal')) {
  customElements.define('size-availability-modal', SizeAvailabilityModal);
}