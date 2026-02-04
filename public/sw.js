const CACHE_NAME = 'ali-zaib-cache-v1';
const urlsToCache = [
  '/',
  '/assets/images/hero-image/1.jpeg',
  '/assets/images/hero-image/2.png',
  '/assets/images/hero-image/3.png',
  // Add more critical assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
