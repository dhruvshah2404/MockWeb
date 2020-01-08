const cacheName = 'v2';
const allFile = ['index.html', 'About.html', 'Contact.html', 'Staff.html', 'main.js','styles/about.css', 'styles/contact.css', 'styles/header-footer.css', 'styles/index.css', 'styles/normalize.css', 'styles/staff.css', 'styles/style.css']
self.addEventListener('install', function (e) {
  console.log('installing')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(allFile);
    })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});