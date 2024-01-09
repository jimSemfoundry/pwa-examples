var cacheName = 'betfrom';
var filesToCache = [
  '/pwa-examples/targer/',
  '/pwa-examples/targer/index.html',
  '/pwa-examples/targer/css/style.css',
  '/pwa-examples/targer/js/main.js',
  '/pwa-examples/targer/images/image4.png',
  '/pwa-examples/targer/images/1dbcf2e2a7bd4fe5c987995ba8532a188c639b21.png',
  '/pwa-examples/targer/images/4ec75981-0d74-4783-85ff-3a8fbf2f58d3.png',
  '/pwa-examples/targer/images/6e63d09d-6e48-43d1-990c-d86ef3fd29a7.png',
  '/pwa-examples/targer/images/9dc42170-3ece-4a25-8830-ec86b1986898.png',
  '/pwa-examples/targer/images/9f2e6215-794d-4720-8315-d995bde02a98.png',
  '/pwa-examples/targer/images/17e9e48ea9a77e7a1014d8f11fd2fa8b2441cc0b.png',
  '/pwa-examples/targer/images/57dbc8fd-9c89-4e2f-979c-4629195913dc.png',
  '/pwa-examples/targer/images/83ae57f8-abb8-4048-aefe-739062a580e7.png',
  '/pwa-examples/targer/images/89efffe9-8134-4557-989f-5836a7eb51ab.png',
  '/pwa-examples/targer/images/943fad4246c0f73aa7a869e83b762978671061f9.png',
  '/pwa-examples/targer/images/0997c73c-5a3e-475f-8760-7397054fe85e.png',
  '/pwa-examples/targer/images/3421de82-62a1-4664-872d-c187dbf74b80.png',
  '/pwa-examples/targer/images/5567f011-ad9c-41d7-9b19-ff9fa47da708.png',
  '/pwa-examples/targer/images/6187b4e4-b1fb-4032-998d-8db13f6298a8.png',
  '/pwa-examples/targer/images/92853cb3-0077-4915-bd65-a49b225f7d77.png',
  '/pwa-examples/targer/images/99439a20-a422-4f10-94f0-e2180c42b03c.png',
  '/pwa-examples/targer/images/484162a0db3251e686c0d9e6941c6bd897e1454d.png',
  '/pwa-examples/targer/images/9154258f-9270-4238-86a0-c73f3afbe699.png',
  '/pwa-examples/targer/images/ac1136ab-3cd5-44e1-9545-52f5835dc8c8.png',
  '/pwa-examples/targer/images/b57a80a7f9d4114f7c5d5f6f8b8a99a5737da036.png',
  '/pwa-examples/targer/images/b91872cb-4999-421c-a026-a61936ec9377.png',
  '/pwa-examples/targer/images/ca45e7c8-58c4-4f0c-95e5-bca1bb556ce7.png',
  '/pwa-examples/targer/images/ca9908b0-3287-4ee4-9afd-e4c37f96ded0.png',
  '/pwa-examples/targer/images/e0921745-b252-4ae5-9f4a-f9b63721f652.png',
  '/pwa-examples/targer/images/eae9aac5-0ce5-4387-8070-f30472d9352c.png',
  '/pwa-examples/targer/images/f523bd063398a03c35a8715572969426d52522e0.png',
  '/pwa-examples/targer/images/Favicon.png',
  '/pwa-examples/targer/images/fdc547f1-84ef-4a68-9810-3159492d2cef.png',
  '/pwa-examples/targer/images/frame-52x.png',
  '/pwa-examples/targer/images/group-627275@2x.png',
  '/pwa-examples/targer/images/group-6272742x.png',
  '/pwa-examples/targer/images/group-6273112x.png',
  '/pwa-examples/targer/images/mobileing.png',
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
