/*
 * Nocturne app-shell cache.
 * IMPORTANT: this worker caches only the static app shell. It never caches
 * journal/API requests or user content, and it does not add cloud sync.
 */
const CACHE_PREFIX = 'nocturne-static-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v2`;
const STATIC_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/nocturne-app.js',
  './assets/nocturne-base.css',
  './assets/nocturne-enhancements.css',
  './assets/nocturne-enhancements.js',
  './assets/nocturne-icon-192.png',
  './assets/nocturne-icon-512.png',
  './assets/nocturne-icon-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const scopeUrl = new URL(self.registration.scope);
  if (!requestUrl.pathname.startsWith(scopeUrl.pathname)) return;

  // For app navigation, prefer the latest page from the network and fall back
  // to the saved shell when offline. Only the HTML shell is cached, never data.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        return await fetch(request);
      } catch {
        return (await cache.match(request))
          || (await cache.match(new URL('./index.html', scopeUrl).href))
          || Response.error();
      }
    })());
    return;
  }

  // Cache only known static resources. Do not intercept arbitrary same-origin
  // requests, form submissions, future APIs, or journal data.
  const path = requestUrl.pathname;
  const isStaticAsset = /\/assets\/nocturne-(app\.js|base\.css|enhancements\.css|enhancements\.js|icon-(192|512)\.png)$/.test(path)
    || path.endsWith('/manifest.webmanifest')
    || path.endsWith('/index.html');
  if (!isStaticAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone()).catch(() => {});
      return response;
    } catch {
      return Response.error();
    }
  })());
});
