const CACHE="ultra-player-v1";

self.addEventListener("install",e=>{
self.skipWaiting();
e.waitUntil(
caches.open(CACHE).then(cache=>{
return cache.addAll(["./","./index.html"]);
})
);
});

self.addEventListener("activate",e=>{
e.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
);
})
);
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(res=>res||fetch(e.request))
);
});
