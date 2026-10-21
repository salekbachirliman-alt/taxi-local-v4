/* Taxi Local v4: disable legacy offline cache so all devices load the same live frontend. */
self.addEventListener("install",event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  try { const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith("taxi-local-v4-static-")).map(k=>caches.delete(k))); } catch(_){}
  try { await self.registration.unregister(); } catch(_){}
  try { const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true}); clients.forEach(c=>{ if(c.url.startsWith(self.location.origin)) c.navigate(c.url); }); } catch(_){}
})()));
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin===self.location.origin && (url.pathname.endsWith("/index.html")||url.pathname==="/"||url.pathname.endsWith("/")||url.pathname.endsWith(".js")||url.pathname.endsWith(".css"))){
    event.respondWith(fetch(new Request(request,{cache:"no-store"})));
  }
});
