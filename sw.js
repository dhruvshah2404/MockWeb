const cacheName = 'v1';
const allFile = ['index.html', 'About.html', 'Contact.html', 'Staff.html', 'main.js', 'sw.js', 'styles/about.css', 'styles/contact.css', 'styles/header-footer.css', 'styles/index.css', 'styles/normalize.css', 'styles/staff.css', 'styles/style.css']
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(allFile);
    })
      .then(() => self.skipWaiting())
  );
});
 
self.addEventListener('activate', e => {
  console.log('avtivate');
  e.waitUntil(
    Promise.all([ 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache);
            }
          })
        )
        }
      )
    ])
  )
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});