
  document.addEventListener('click', function (event) {

    const openButton = event.target.closest(
      '.size-availability__open'
    );

    if (openButton) {

      const section = openButton.closest(
        '.size-availability'
      );

      const dialog = section?.querySelector(
        '.size-availability__dialog'
      );

      console.log('Open button clicked');
      console.log('Dialog:', dialog);

      if (dialog && !dialog.open) {
        dialog.showModal();
      }

      return;
    }


    const closeButton = event.target.closest(
      '.size-availability__close, .size-availability__done'
    );

    if (closeButton) {

      const section = closeButton.closest(
        '.size-availability'
      );

      const dialog = section?.querySelector(
        '.size-availability__dialog'
      );

      if (dialog?.open) {
        dialog.close();
      }

      return;
    }


    /*
      Close when clicking outside modal content
    */

    const dialog = event.target.closest(
      '.size-availability__dialog'
    );

    if (dialog && event.target === dialog) {
      dialog.close();
    }

  });
