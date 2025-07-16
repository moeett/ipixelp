// Service Worker for caching and performance optimization
const CACHE_NAME = 'ipixelp-v1';
const STATIC_CACHE = 'ipixelp-static-v1';
const DYNAMIC_CACHE = 'ipixelp-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/src/main.js',
  '/src/style.css',
  '/src/modern-styles.css',
  '/favicon.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (STATIC_ASSETS.includes(url.pathname)) {
    // Static assets - cache first
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff2|woff)$/)) {
    // Other assets - cache first with dynamic cache
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (url.origin === location.origin) {
    // Same origin requests - network first
    event.respondWith(networkFirst(request));
  } else {
    // External resources - network only with timeout
    event.respondWith(networkWithTimeout(request, 5000));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Update cache in background
      fetch(request).then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      }).catch(() => {
        // Ignore network errors for background updates
      });
      
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Network with timeout
async function networkWithTimeout(request, timeout) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout')), timeout)
    )
  ]).catch(() => {
    return new Response('Network timeout', { status: 503 });
  });
}
