const CACHE_NAME = "v1_cache_PWA";

var urlsToCache = [
    './',
    './style.css',
    './index.html',
    './main.js',
    './sw.js',
    './manifest.json',
    './images/icono.jpg',
    './images/menu.jpg',
    './images/gameplay.jpg',
    './images/enemigos.jpeg',
    './images/oso.jpg',
    './images/rata.jpg',
    './images/salamandra.jpg',
    './images/ghoul.jpg',
    './images/crow.jpg',
    './images/mision.jpeg',
    './images/gameplay2.jpeg',
    './images/iconoChanlu.jpg',
    './images/iconoDuzz.jpg',
    './images/perfil1.jpg',
    './images/perfil2.jpg',
    './images/perfil3.jpg',
    './images/perfil4.jpg',
    './images/perfil5.jpg',
    './bootstrap-5.3.3-dist/css/bootstrap.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
                    .catch(err => {
                        console.log('No se ha cargado la cache', err);
                    });
            })
    );
});

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!cacheWhiteList.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
    );
});

// Manejar las solicitudes de fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Si se encuentra en la caché, devolverlo
          if (response) {
            return response;
          }
          // Si no, realizar la solicitud de red y almacenar en caché
          return fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
          });
        })
        .catch(() => {
          // En caso de fallar (sin conexión a Internet), intentar responder con la caché
          return caches.match('/index.html');
        })
    );
  });




