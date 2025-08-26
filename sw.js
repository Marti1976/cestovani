const CACHE_NAME = 'travel-planner-v4'; // Incremented version to ensure cache update

// No more static pre-caching list

self.addEventListener('install', event => {
  // The service worker is installed, but we are not pre-caching assets.
  // Caching will happen on-the-fly during fetch events.
  // self.skipWaiting() ensures that the new service worker activates immediately.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it
        if (response) {
          return response;
        }

        // Otherwise, fetch it from the network
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'opaque')) {
               return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // If the network request fails and there's no cache match,
          // the browser will show its default offline page.
        });
      })
    );
});

self.addEventListener('activate', event => {
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
    })
  );
});
