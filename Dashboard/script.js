try {
  if (!firebase.apps.length) {
    firebase.initializeApp(SITE_CONFIG.firebase);
  }
} catch(e) { console.warn('Firebase init:', e); }

var messaging = null;
try { messaging = firebase.messaging(); } catch(e) {}

var vapidKey = 'BPy_Zys7O1q5YJKF_KfNk2bAG3jMEC7gdJt4E6TbKhvTl2SAT2VTHeq1q4VEE9BX-k9as9tEXUfq4KYWJ3mZTIE';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../Dashboard/firebase-messaging-sw.js')
    .then(function(r) { console.log('SW registered:', r); })
    .catch(function(e) { console.error('SW failed:', e); });
}

function initFCM() {
  if (!messaging || !('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    getFCMToken();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(p) {
      if (p === 'granted') getFCMToken();
    });
  }
}

function getFCMToken() {
  messaging.getToken({vapidKey}).then(function(token) {
    if (token) {
      console.log('FCM token:', token);
      firebase.database().ref('/fcmTokens/' + token).set(true);
    }
  }).catch(function(e) { console.error('FCM token error:', e); });
}

if (messaging) {
  messaging.onMessage(function(payload) {
    if (payload.notification && 'Notification' in window) {
      new Notification(payload.notification.title || 'ESP8266', {
        body: payload.notification.body || '',
        icon: '/favicon.ico'
      });
    }
  });
  initFCM();
}

var loginForm = document.getElementById("loginForm");
var dashboard = document.getElementById("dashboard");

function startDashboard() {
  var db = firebase.database();

  var masterRef = db.ref("/master");
  var masterStatus = document.getElementById("masterStatus");
  var masterOn = document.getElementById("masterOn");
  var masterOff = document.getElementById("masterOff");

  masterRef.on("value", function(snapshot) {
    var state = snapshot.val();
    if (masterStatus) {
      masterStatus.innerText = state ? "ACTIF" : "DESACTIVE";
      masterStatus.style.color = state ? "#388e3c" : "#d32f2f";
    }
  });

  if (masterOn) masterOn.onclick = function() { masterRef.set(true); };
  if (masterOff) masterOff.onclick = function() { masterRef.set(false); };

  var tempValue = document.getElementById("tempValue");
  var humValue = document.getElementById("humValue");
  var flameValue = document.getElementById("flameValue");
  var flameUnit = document.getElementById("flameUnit");

  db.ref("/sensor/temperature").on("value", function(snapshot) {
    var val = snapshot.val();
    if (tempValue) {
      tempValue.innerText = val !== null && val !== undefined ? val.toFixed(1) : "--";
      tempValue.style.color = (val !== null && (val < 15 || val > 35)) ? "#d32f2f" : "#388e3c";
    }
  });

  db.ref("/sensor/humidity").on("value", function(snapshot) {
    var val = snapshot.val();
    if (humValue) {
      humValue.innerText = val !== null && val !== undefined ? val.toFixed(0) : "--";
      humValue.style.color = (val !== null && (val < 30 || val > 70)) ? "#d32f2f" : "#388e3c";
    }
  });

  db.ref("/sensor/flame").on("value", function(snapshot) {
    var val = snapshot.val();
    if (flameValue && flameUnit) {
      if (val === true) {
        flameValue.innerText = "OUI";
        flameValue.style.color = "#d32f2f";
        flameUnit.innerText = "Flamme detectee!";
      } else {
        flameValue.innerText = "NON";
        flameValue.style.color = "#388e3c";
        flameUnit.innerText = "Aucune flamme";
      }
    }
  });

  var alertBanner = document.getElementById("alertBanner");
  var alertReason = document.getElementById("alertReason");

  db.ref("/alert/active").on("value", function(snapshot) {
    var active = snapshot.val();
    if (alertBanner) {
      if (active === true) {
        alertBanner.classList.add('show');
        sendAlertNotification();
      } else {
        alertBanner.classList.remove('show');
      }
    }
  });

  db.ref("/alert/reason").on("value", function(snapshot) {
    var reason = snapshot.val();
    if (alertReason) alertReason.innerText = reason || "--";
  });

  function sendAlertNotification() {
    if (!alertReason) return;
    var reason = alertReason.innerText !== "--" ? alertReason.innerText : "Alerte active!";
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Alerte ESP8266', { body: reason, icon: '/favicon.ico' });
    }
  }
}

function initDashboard() {
  var authUser = localStorage.getItem('cofcoal_auth');
  if (!authUser) {
    if (loginForm) loginForm.style.display = "block";
    return;
  }
  // Check if Firebase Auth already has a session
  var user = firebase.auth().currentUser;
  if (user) {
    if (loginForm) loginForm.style.display = "none";
    if (dashboard) dashboard.style.display = "block";
    startDashboard();
  } else {
    // Re-authenticate silently
    firebase.auth().signInWithEmailAndPassword(SITE_CONFIG.auth.email, SITE_CONFIG.auth.password)
      .then(function() {
        if (loginForm) loginForm.style.display = "none";
        if (dashboard) dashboard.style.display = "block";
        startDashboard();
      })
      .catch(function(err) {
        console.error('Auth failed:', err);
        if (loginForm) {
          loginForm.style.display = "block";
          loginForm.innerHTML = '<div class="card" style="padding:2rem;text-align:center;"><p style="color:#d32f2f;margin-bottom:1rem;">Erreur d\'authentification. Veuillez vous reconnecter.</p><a href="../index.html" class="btn-primary">Retour à l\'accueil</a></div>';
        }
      });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Wait for Firebase Auth to restore session
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem('cofcoal_auth', user.email);
      if (loginForm) loginForm.style.display = "none";
      if (dashboard) dashboard.style.display = "block";
      startDashboard();
    } else {
      if (loginForm) loginForm.style.display = "block";
    }
  });
  // Fallback: force init after 3s if onAuthStateChanged didn't fire
  setTimeout(function() {
    if (dashboard && dashboard.style.display !== "block") {
      initDashboard();
    }
  }, 3000);
});

var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = function() {
    firebase.auth().signOut().catch(function(e) { console.error(e); });
    localStorage.removeItem('cofcoal_auth');
    window.location.href = '../index.html';
  };
}