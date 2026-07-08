/* =====================================================================
   LA CAISSE NOIRE — Service Worker
   Réceptionne les notifications push, même app fermée.
   Fichier à placer À CÔTÉ de index.html dans le dépôt GitHub.
===================================================================== */

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) {}
  e.waitUntil(
    self.registration.showNotification(d.title || "La Caisse Noire", {
      body: d.body || "",
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      lang: "fr",
      data: { url: "./" },
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) return c.focus();
      }
      return clients.openWindow("./");
    })
  );
});
