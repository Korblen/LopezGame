var cacheName = 'hello-pwa';
var filesToCache = [
  // L'ensemble de tes fichiers
  '/',
  '/index.html',
  '/lobby.html',
  '/css/style.css',
  '/css/lobby.css',
  '/js/test.js',
  '/js/main.js'
  
];

// Met en cache le contenu de ton application
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Code executé lorsque tu es offline
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});