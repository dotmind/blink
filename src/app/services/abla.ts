function init() {
  if (import.meta.env.DEV) {
    return;
  }

  const script = document.createElement('script');
  script.dataset.cache = 'true';
  script.dataset.websiteId = 'c45fff7d-a5fa-4459-b2e6-a0474ddbbe3b';
  script.src = 'https://s.abla.io/abla.js';
  script.async = true;
  document.getElementsByTagName('head')[0].appendChild(script);
}

window.addEventListener('load', init);

export {};
