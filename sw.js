const CACHE="taxi-local-v4-static-37";
const FILES=["./","./index.html","./styles.css","./manifest.webmanifest","./taxi-local-icon.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("taxi-local-v4-static-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
 const request=event.request;
 if(request.method!=="GET")return;
 const url=new URL(request.url);
 if(url.origin===self.location.origin && (url.pathname.endsWith("/app.js")||url.pathname.endsWith("/config.js")||url.pathname.endsWith("/index.html")||url.pathname==="/"||url.pathname.endsWith("/"))){
  event.respondWith(fetch(request,{cache:"no-store"}).then(response=>{if(response.ok&&url.pathname.endsWith("/index.html")){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;}).catch(()=>caches.match(request).then(cached=>cached||caches.match("./index.html"))));
  return;
 }
 if(url.origin===self.location.origin)event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
