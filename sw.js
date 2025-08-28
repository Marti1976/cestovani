
const CACHE_NAME = 'travel-planner-v4'; // The version name logic is still fine.

self.addEventListener('install', event => {
  // Activate new service worker as soon as it's installed
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  // Clean up old caches
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

self.addEventListener('fetch', event => {
  // Use a "Network falling back to cache" strategy
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // If the fetch is successful, cache the new response and return it
        return caches.open(CACHE_NAME).then(cache => {
          // Check if we received a valid response before caching
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // If the network request fails (e.g., offline), try to serve from cache
        return caches.match(event.request);
      })
  );
});
