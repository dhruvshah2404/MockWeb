const cacheName = 'v2';
const allFile = ['index.html', 'About.html', 'Contact.html', 'Staff.html', 'main.js','styles/about.css', 'styles/contact.css', 'styles/header-footer.css', 'styles/index.css', 'styles/normalize.css', 'styles/staff.css', 'styles/style.css']
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(allFile);
    })
      .then(() => self.skipWaiting())
  );
});
 
self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});