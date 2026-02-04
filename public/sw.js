const CACHE_PREFIX = 'ali-zaib-';
const CACHE_VERSION = 'v2';
const HTML_CACHE = `${CACHE_PREFIX}html-${CACHE_VERSION}`;
const ASSET_CACHE = `${CACHE_PREFIX}assets-${CACHE_VERSION}`;

const getBasePath = () => {
  const { pathname } = new URL(self.registration.scope);
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

self.addEventListener('install', (event) => {
  // Keep install lightweight: do not pre-cache large images/videos.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== HTML_CACHE && key !== ASSET_CACHE)
        .map((key) => caches.delete(key)),
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate' || request.destination === 'document';
  if (isNavigation) {
    event.respondWith((async () => {
      const basePath = getBasePath();
      try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          const cache = await caches.open(HTML_CACHE);
          // Cache the app shell at the base path for SPA offline fallback.
          await cache.put(basePath, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        const cache = await caches.open(HTML_CACHE);
        const cachedShell = await cache.match(basePath);
        return cachedShell || Response.error();
      }
    })());
    return;
  }

  // Stale-while-revalidate for same-origin static assets.
  event.respondWith((async () => {
    const cache = await caches.open(ASSET_CACHE);
    const cachedResponse = await cache.match(request);

    const updatePromise = fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => null);

    if (cachedResponse) {
      event.waitUntil(updatePromise);
      return cachedResponse;
    }

    const networkResponse = await updatePromise;
    return networkResponse || Response.error();
  })());
});
