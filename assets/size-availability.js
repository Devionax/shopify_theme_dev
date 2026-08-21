class SizeAvailabilityModal extends HTMLElement {
  constructor() {
    super();
    this.dialog = null;
    this.openButton = null;
    this.closeButtons = [];
    this.initialized = false;
  }

  connectedCallback() {
    // If DOM is ready, initialize directly; otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    if (this.initialized) return;

    this.dialog = this.querySelector('dialog');
    this.openButton = this.querySelector('[data-open]');
    this.closeButtons = this.querySelectorAll('[data-close]');

    if (!this.dialog || !this.openButton) {
      // Retry via MutationObserver if dynamic content renders later
      this.observeChildren();
      return;
    }

    this.bindEvents();
    this.initialized = true;
  }

  observeChildren() {
    const observer = new MutationObserver(() => {
      this.dialog = this.querySelector('dialog');
      this.openButton = this.querySelector('[data-open]');
      this.closeButtons = this.querySelectorAll('[data-close]');

      if (this.dialog && this.openButton) {
        observer.disconnect();
        this.bindEvents();
        this.initialized = true;
      }
    });

    observer.observe(this, { childList: true, subtree: true });
  }

  bindEvents() {
    this.openButton.addEventListener('click', (e) => this.open(e));

    this.closeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.close(e));
    });

    // Close when clicking dialog backdrop
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.close(e);
    });
  }

  open(e) {
    if (e) e.preventDefault();
    if (this.dialog && !this.dialog.open) {
      this.dialog.showModal();
    }
  }

  close(e) {
    if (e) e.preventDefault();
    if (this.dialog && this.dialog.open) {
      this.dialog.close();
    }
  }
}

if (!customElements.get('size-availability-modal')) {
  customElements.define('size-availability-modal', SizeAvailabilityModal);
}