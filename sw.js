// Sarqt service worker — minimal cache-first for PWA installability + offline shell
const CACHE_NAME = 'sarqt-v5';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './og-image.png',
  './404.html',
  './js/app.js',
  './js/state.js',
  './js/ui.js',
  './js/router.js',
  './js/views.js',
  './js/config.js',
  './js/offers.js',
  './js/photo.js',
  './js/auth.js',
  './js/db.js',
  './js/supabaseClient.js',
  './js/vendor/supabase.esm.js',
  './js/i18n.js',
  './js/messages.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Network-first for HTML (so updates land fast), cache-first for everything else
  if (req.mode === 'navigate' || (req.headers.get('Accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }
  // Cache-first for same-origin assets
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached))
    );
  }
  // Pass-through for cross-origin (fonts etc.)
});
