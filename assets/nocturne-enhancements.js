/* Progressive enhancements; no framework dependency and no journal-data access. */
(() => {
  'use strict';

  const byId = (id) => document.getElementById(id);
  const onReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  };

  onReady(() => {
    // Keep one accessible main landmark and let keyboard users skip app chrome.
    const appRoot = byId('root');
    if (appRoot) {
      appRoot.setAttribute('role', 'main');
      appRoot.setAttribute('aria-label', 'Nocturne application');
      if (!appRoot.hasAttribute('tabindex')) appRoot.setAttribute('tabindex', '-1');

      // Reuse meaningful tooltip text as accessible names for icon-only buttons.
      // This is deliberately conservative: buttons with visible text are left alone.
      const labelIconButton = (button) => {
        if (!(button instanceof HTMLButtonElement) || button.hasAttribute('aria-label')) return;
        const hasVisibleText = (button.textContent || '').trim().length > 0;
        const tooltip = (button.getAttribute('title') || '').trim();
        if (!hasVisibleText && tooltip) button.setAttribute('aria-label', tooltip);
      };
      const labelButtonTree = (node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('button')) labelIconButton(node);
        node.querySelectorAll?.('button').forEach(labelIconButton);
      };
      labelButtonTree(appRoot);
      const buttonLabelObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const added of mutation.addedNodes) labelButtonTree(added);
        }
      });
      buttonLabelObserver.observe(appRoot, { childList: true, subtree: true });
    }

    // An unobtrusive, screen-reader-friendly offline indicator.
    let networkNotice = byId('nocturne-network-status');
    if (!networkNotice) {
      networkNotice = document.createElement('div');
      networkNotice.id = 'nocturne-network-status';
      networkNotice.className = 'nc-network-status';
      networkNotice.setAttribute('role', 'status');
      networkNotice.setAttribute('aria-live', 'polite');
      networkNotice.setAttribute('aria-atomic', 'true');
      networkNotice.hidden = true;
      networkNotice.textContent = 'Offline — Nocturne’s browser-local workspace can still be used on this device.';
      document.body.appendChild(networkNotice);
    }

    const updateNetworkStatus = () => {
      networkNotice.hidden = navigator.onLine;
      document.documentElement.dataset.network = navigator.onLine ? 'online' : 'offline';
    };
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();

    /* Installation prompts are intentionally disabled: Nocturne is a website
       you open, not an app you install. */

    // Register only in supported secure contexts. Failed registration should
    // never prevent the journal itself from loading.
    const localDevelopment = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || localDevelopment)) {
      navigator.serviceWorker.register(new URL('../service-worker.js', import.meta.url), { scope: new URL('../', import.meta.url).pathname })
        .catch((error) => console.info('Nocturne offline support is unavailable in this session.', error));
    }
  });
})();
