/* Forest Spots service worker.
   Keeps the app itself and every map tile you've already looked at available offline,
   so the map still shows in the woods with no signal. (GPS works without signal anyway.) */

const SHELL = 'shell-v2';                      // bump when the app files change
const TILES = 'tiles-v1';                      // never bump - it holds the imagery you've cached for the woods
const MAX_TILES = 5000;                        // ~100-150 MB of imagery, oldest dropped first
const SHELL_URLS = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap'
];
const STATIC_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await Promise.all(SHELL_URLS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = new Set([SHELL, TILES]);
    for (const k of await caches.keys()) if (!keep.has(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('arcgisonline.com')) { e.respondWith(tile(req)); return; }        // map tiles: cache first
  if (url.origin === self.location.origin) { e.respondWith(networkFirst(req)); return; }      // the app: network first
  if (STATIC_HOSTS.includes(url.hostname)) { e.respondWith(cacheFirst(req)); return; }        // Leaflet + font: cache first
});

let putCount = 0;

async function tile(req) {
  const c = await caches.open(TILES);
  const hit = await c.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok || res.type === 'opaque') {
      c.put(req, res.clone()).then(() => { if (++putCount % 200 === 0) trim(c); }).catch(() => {});
    }
    return res;
  } catch (err) {
    return new Response('', { status: 504, statusText: 'offline' });
  }
}

async function trim(c) {
  const keys = await c.keys();
  const extra = keys.length - MAX_TILES;
  for (let i = 0; i < extra; i++) await c.delete(keys[i]);
}

async function networkFirst(req) {
  const c = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(req, res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const idx = await c.match('./index.html');
      if (idx) return idx;
    }
    return new Response('Offline', { status: 503 });
  }
}

async function cacheFirst(req) {
  const c = await caches.open(SHELL);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') c.put(req, res.clone()).catch(() => {});
  return res;
}
