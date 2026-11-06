// Service worker : fonctionnement hors connexion (cache de l'appli)
const CACHE = 'judopro-1.6.0-9ac5a44e';
const FILES = ['./', 'index.html', 'assets/app.js', 'assets/app.css', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon.svg'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); });
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match('index.html'))); return; }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok && (u.pathname.includes('/docs/') || u.pathname.includes('/icons/') || u.pathname.includes('/media/'))) { const cl = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, cl)); }
    return res;
  })));
});
