var cacheName = 'betfrom';
var filesToCache = [
  
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

let json = {
  'msgUrl':''
}

self.addEventListener("push",  (event) => {
  // console.log("Received a push message", event);
  // console.log(new Date().getTime())
  // console.log(event.data.json())
  // console.log(event.data.text())

  const data = event.data.json()
  json = event.data.json()

  const title = data.title;

  const options = {
    body: data.body,
    icon: data.icon,
    image: data.image,
    badge: data.icon,
    actions: data.actions
  };
  // console.log(options)
  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener("notificationclick",  (event) => {
  // console.log("Notification clicked", event);
  // console.log(event)
  // console.log(json)
  // event.notification.close();
  // event.waitUntil(clients.openWindow(json["msg-url"]));

  event.notification.close();
    if (event.action === '' ){
      event.waitUntil(clients.openWindow(json.msgUrl));
    }else{
      if ('actions' in json){
        json.actions.filter(item => {
          if (event.action === item.action) {
            event.waitUntil(clients.openWindow(item.msgUrl));
          }
        })
      }
    }
});
