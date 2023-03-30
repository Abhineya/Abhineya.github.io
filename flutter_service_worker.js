'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d3a0cd4641ac89f5b4113ab6ff89074e",
"assets/assets/fonts/Courgette-Regular.ttf": "cbd252f5c26cd61243888be1891f9921",
"assets/assets/fonts/Kalam-Bold.ttf": "c753b7274d6a2dab75f5c44b8e5c7b25",
"assets/assets/fonts/Kalam-Light.ttf": "4c79496352e7ef6dc4956f60ce095408",
"assets/assets/fonts/Kalam-Regular.ttf": "b3d0cb8286497ecfe76846476495927c",
"assets/assets/fonts/Sriracha-Regular.ttf": "91d60edc23e80c4e174001f69d2ab23e",
"assets/assets/images/background.png": "c00ba76674aa871129f598e79619a194",
"assets/assets/images/canva.png": "b000d177ff7fff00ad50506a6be1db71",
"assets/assets/images/chatapp.png": "baa380ea74db3c3f0cba6ccae62bf71a",
"assets/assets/images/cpp.png": "d236acbf311f008f2630ab22ebcd3cf0",
"assets/assets/images/devfest.png": "c0cb9369ec9663fced27464932fd0637",
"assets/assets/images/electricianapp.png": "cfb3f85e137172a03e25c464e1ab9af8",
"assets/assets/images/figma.png": "ac00fa7b6768286ad44283e4595dd07e",
"assets/assets/images/firebase.png": "c647892555897bd039600d7078d6eaf3",
"assets/assets/images/flutter.png": "11730d08fa60e5d497c6827f65288e85",
"assets/assets/images/flutterbootcamp.png": "4c07ea3116fea854db548e6b7812867c",
"assets/assets/images/gdsc.png": "ba5fe6dda7384fc2cb979a2e02ae4c61",
"assets/assets/images/git.png": "728ff5a8e44d74cd0f2359ef0a9ec88a",
"assets/assets/images/github.png": "f5d3421a297bc675358b11e81b9edd9c",
"assets/assets/images/hashnode.png": "5583b227ede05dfe443d69f12c9a0561",
"assets/assets/images/html.png": "945d8320b2991e7345ea0dda5ee1b6bb",
"assets/assets/images/instagram.png": "8b597b801b06480b171c29d1a12c633f",
"assets/assets/images/java.png": "d895b7834dda35ec3cfb1a0b877bb9c8",
"assets/assets/images/javascript.png": "d1d9d80a00012cf0601250b6078104da",
"assets/assets/images/linkedin.png": "e982281b39ceee5d6b5aa74622fd960b",
"assets/assets/images/mlsa.png": "e7de639642197828aa7b2327eb7021b3",
"assets/assets/images/profilepic.png": "1a5747d62b6d18ed81eea5ebb77386cd",
"assets/assets/images/reckon.png": "d26ddf0b9d7821e8b46a62f7921a62b7",
"assets/assets/images/sih.png": "ceb1b05ad44204d9a9626efaf2f36274",
"assets/assets/images/twitter.png": "73fed143c54c3ab227006bfee70c00ec",
"assets/FontManifest.json": "dd68f0833d6ef67289f88aeba4b9ed47",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "96631a2ae700e8c532da909a632cda6a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "1ca7c8994b35213d17b0521ed995a6c3",
"/": "1ca7c8994b35213d17b0521ed995a6c3",
"main.dart.js": "a80d059fc8513df99492eed24bcb6c35",
"manifest.json": "e74af8957b5899dc6da961caee768ec9",
"version.json": "009c9e65172e010890f7f65fde438006"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
