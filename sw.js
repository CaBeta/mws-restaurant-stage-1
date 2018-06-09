var staticCacheName = 'mws-static-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                'js/',
                'css/',
                'data/restaurants.json',
                'img/',
                '/restaurant.html',
                '/'
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('mws-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(

        caches.match(event.request).then(function (response) {
            var requestUrl = new URL(event.request.url);
            // 如果访问的是详情页面 restaurant.html
            if (requestUrl.origin === location.origin && requestUrl.pathname === '/restaurant.html') {
                console.log("hello");
            }
            return response || fetch(event.request);
        })
    );
});
