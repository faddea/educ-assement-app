const CACHE_NAME = "encuesta-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/prueba.html",
  "/materia.html",
  "/calificación.html",
  "/analisis.html",
  "/manifest.json",
  "logo-192.png",
  "/icons/icon-512.png"
];

// Instalar y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Servir desde cache si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});

// Actualizar cache cuando haya cambios
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
