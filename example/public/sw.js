importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js',
);

workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst({
        cacheName: 'pequeno',
    }),
);