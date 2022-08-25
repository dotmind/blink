/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false })
workbox.loadModule('workbox-strategies');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'fonts',
  }),
);

registerRoute(
  ({request}) => (
    request.destination === 'script'
    || request.destination === 'style'
  ),
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  }),
);