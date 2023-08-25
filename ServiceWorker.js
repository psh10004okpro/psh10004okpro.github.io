const cacheName = "MindVrAI-MindVrAI-1.0";
const contentToCache = [
    "Build/WebBuild.loader.js",
    "Build/98ec625dc0a4808f86d184c4e2fb8cba.js.unityweb",
    "Build/c41b229ea48ad7b54859f7c2afd9853b.data.unityweb",
    "Build/2d45afadd468639eea66ffa9e4b96dc4.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
