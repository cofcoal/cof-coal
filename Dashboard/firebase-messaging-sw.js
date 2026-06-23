importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBITxcSCeU9gjBp7jXLWMNf2jnbjGn7qaU",
  authDomain: "cof-coal.firebaseapp.com",
  databaseURL: "https://cof-coal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cof-coal",
  storageBucket: "cof-coal.firebasestorage.app",
  messagingSenderId: "843621909767",
  appId: "1:843621909767:web:2ac6a66326b350eb5bb1a2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Alerte ESP8266';
  self.registration.showNotification(title, {
    body: payload.notification?.body || 'Une alerte est active!',
    icon: '/favicon.ico',
    vibrate: [200, 100, 200],
    tag: 'esp8266-alert'
  });
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_ALERT') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: '/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'esp8266-alert'
    });
  }
});
