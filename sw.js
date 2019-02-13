/* Service worker is registered in js/main.js. 
   This caches resources when service worker install. Service worker intercepts network requests
*/

// Cache Name.
const staticCacheName = 'restaurant-stage-1'

// The assets to be cached.
const cacheAssets = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/data/restaurants.json',  
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

// Once service worker install, this code creates cache with name and populates it with list of resources to cache.
self.addEventListener('install', event => {
  console.log('Service worker installed Successfully!');

  // event.waitUntil() tells the progress of install.
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Caching files by Service Worker');      
      return cache.addAll(cacheAssets);
    }).catch(err => {
      console.log('Failed-' + err);
    }) 
  );
});

// Adds event listener for fetch event to add service worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }) 
  );
});