#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include <hd44780.h>
#include <hd44780ioClass/hd44780_I2Cexp.h>

#include "config.h"

// ========== Pin mapping (NodeMCU v3) ==========
#define FLAME_SENSOR FLAME_PIN
#define DHT_PIN D4        // GPIO2  - DHT11 data
#define LED_RED D3        // GPIO0  - Red LED (LOW=ON, HIGH=OFF)
#define BUZZER D8         // GPIO15 - Buzzer (HIGH=ON)
#define BUTTON_MASTER D7  // GPIO13 - Master toggle button (HIGH=released, LOW=pressed)
#define LCD_SDA D2        // GPIO4  - LCD I2C data
#define LCD_SCL D1        // GPIO5  - LCD I2C clock

// ========== Timing ==========
#define DHT_INTERVAL 2000
#define FLAME_INTERVAL 10
#define FIREBASE_INTERVAL 3000
#define LCD_INTERVAL 1000


// ========== Objects ==========
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

DHT dht(DHT_PIN, DHT11);
hd44780_I2Cexp lcd(0x27);

// ========== State variables ==========
bool masterState = true;
bool alertActive = false;
unsigned long alertHoldStart = 0;

float lastTemp = NAN;
float lastHum = NAN;
bool lastFlame = false;

// Button debounce
bool lastBtnReading = HIGH;
bool stableBtnState = HIGH;
unsigned long lastBtnDebounce = 0;
const unsigned long debounceDelay = 50;

// Buzzer pulsing
bool buzzerPulsing = false;
unsigned long lastBuzzerToggle = 0;
const unsigned long BUZZER_INTERVAL = 150;

// Timing
unsigned long lastDHTRead = 0;
unsigned long lastFlameRead = 0;
unsigned long lastFbUpdate = 0;
unsigned long lastLCDUpdate = 0;

// DHT error counter
int dhtErrors = 0;

// ========== Setup ==========
void setup() {
  Serial.begin(115200);

  // Pins
  pinMode(FLAME_SENSOR, INPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BUTTON_MASTER, INPUT_PULLUP);

  // Initial state: everything OFF
  digitalWrite(LED_RED, HIGH);
  digitalWrite(BUZZER, LOW);

  // DHT
  dht.begin();

  // LCD
  lcd.begin(16, 2);
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Demarrage...      ");
  lcd.setCursor(0, 1);
  lcd.print("WiFi...           ");

  // WiFi (timeout 15s)
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  int wifiRetry = 0;
  while (WiFi.status() != WL_CONNECTED && wifiRetry < 30) {
    delay(500);
    Serial.print(".");
    wifiRetry++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    lcd.setCursor(0, 0);
    lcd.print("WiFi OK           ");
    lcd.setCursor(0, 1);
    lcd.print("Firebase...       ");
  } else {
    Serial.println("\nWiFi failed, continuing in offline mode");
    lcd.setCursor(0, 0);
    lcd.print("WiFi FAILED!    ");
    lcd.setCursor(0, 1);
    lcd.print("Offline mode...  ");
  }

  // Firebase
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  Firebase.begin(&config, &auth);

  // Wait for Firebase ready
  int retry = 0;
  while (!Firebase.ready() && retry < 30) {
    delay(500);
    retry++;
  }

  if (Firebase.ready()) {
    // Initialize Firebase paths if not set
    Firebase.RTDB.setBool(&fbdo, "/master", true);
    Firebase.RTDB.setFloat(&fbdo, "/sensor/temperature", 0);
    Firebase.RTDB.setFloat(&fbdo, "/sensor/humidity", 0);
    Firebase.RTDB.setBool(&fbdo, "/sensor/flame", false);
    Firebase.RTDB.setBool(&fbdo, "/alert/active", false);
    Firebase.RTDB.setString(&fbdo, "/alert/reason", "");
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Systeme pret!");
  delay(1000);
}

// ========== Read Flame Sensor ==========
bool readFlame() {
  int raw = digitalRead(FLAME_SENSOR);
  bool detected = FLAME_ACTIVE_LOW ? (raw == LOW) : (raw == HIGH);
  // Debug: uncomment next line to see raw sensor value
  // Serial.printf("FLAME PIN=%d RAW=%s DETECTED=%s\n", FLAME_SENSOR, raw == HIGH ? "HIGH" : "LOW", detected ? "YES" : "NO");
  return detected;
}

// ========== Read DHT11 ==========
bool readDHT(float &temp, float &hum) {
  temp = dht.readTemperature();
  hum = dht.readHumidity();
  if (isnan(temp) || isnan(hum)) {
    dhtErrors++;
    return false;
  }
  dhtErrors = 0;
  return true;
}

// ========== Check Alert Conditions ==========
bool checkAlert(float temp, float hum, bool flame) {
  if (!masterState) return false;
  if (flame) return true;
  if (!isnan(temp) && (temp < TEMP_MIN || temp > TEMP_MAX)) return true;
  if (!isnan(hum) && (hum < HUM_MIN || hum > HUM_MAX)) return true;
  return false;
}

// ========== Build Alert Reason (fixed buffer) ==========
void buildAlertReason(char* buf, size_t len, float temp, float hum, bool flame) {
  int pos = 0;
  if (flame) pos += snprintf(buf + pos, len - pos, "Flamme detectee! ");
  if (!isnan(temp) && (temp < TEMP_MIN || temp > TEMP_MAX))
    pos += snprintf(buf + pos, len - pos, "Temp %.1fC (normale %.0f-%.0f) ", temp, TEMP_MIN, TEMP_MAX);
  if (!isnan(hum) && (hum < HUM_MIN || hum > HUM_MAX))
    pos += snprintf(buf + pos, len - pos, "Hum %.0f%% (normale %.0f-%.0f%%)", hum, HUM_MIN, HUM_MAX);
  if (pos == 0) snprintf(buf, len, "Alerte inconnue");
}

// ========== Update LCD ==========
void updateLCD(float temp, float hum, bool flame, bool alert) {
  char line0[17];
  char line1[17];

  if (!isnan(temp) && !isnan(hum)) {
    snprintf(line0, 17, "T:%.1fC H:%.0f%%", temp, hum);
  } else {
    snprintf(line0, 17, "DHT11: ERR");
  }
  for (int i = strlen(line0); i < 16; i++) line0[i] = ' ';
  line0[16] = '\0';

  snprintf(line1, 17, "F:%s A:%s S:%s",
    flame ? "O" : "N",
    alert ? "ALRM" : "OK",
    masterState ? "ON" : "OFF");
  for (int i = strlen(line1); i < 16; i++) line1[i] = ' ';
  line1[16] = '\0';

  lcd.setCursor(0, 0);
  lcd.print(line0);
  lcd.setCursor(0, 1);
  lcd.print(line1);
}

// ========== Main Loop ==========
void loop() {
  unsigned long now = millis();

  // ---- Read Flame Sensor (always, independent of Firebase) ----
  if (now - lastFlameRead >= FLAME_INTERVAL) {
    bool newFlame = readFlame();
    if (newFlame != lastFlame) {
      lastFlame = newFlame;
    }
    lastFlameRead = now;
  }

  // ---- Read DHT11 (always, independent of Firebase) ----
  float temp = NAN, hum = NAN;
  if (now - lastDHTRead >= DHT_INTERVAL) {
    readDHT(temp, hum);
    if (!isnan(temp) && !isnan(hum)) {
      lastTemp = temp;
      lastHum = hum;
    }
    lastDHTRead = now;
  }

  // ---- Button (toggle only on press: HIGH->LOW) ----
  bool btnChanged = false;
  bool btnReading = digitalRead(BUTTON_MASTER);
  if (btnReading != lastBtnReading) {
    lastBtnDebounce = now;
  }
  if ((now - lastBtnDebounce) > debounceDelay) {
    if (btnReading != stableBtnState) {
      stableBtnState = btnReading;
      if (stableBtnState == LOW) {
        masterState = !masterState;
        btnChanged = true;
      }
    }
  }
  lastBtnReading = btnReading;

  // ---- Firebase operations (only if connected) ----
  bool fbReady = Firebase.ready();

  if (fbReady) {
    // Firebase Master Control (skip if button just changed)
    if (!btnChanged) {
      if (Firebase.RTDB.getBool(&fbdo, "/master")) {
        bool fbMaster = fbdo.boolData();
        if (fbMaster != masterState) {
          masterState = fbMaster;
          Serial.printf("Firebase master: %s\n", masterState ? "ON" : "OFF");
        }
      }
    }

    // Push button state to Firebase
    if (btnChanged) {
      Firebase.RTDB.setBool(&fbdo, "/master", masterState);
      yield();
    }
  }

  // ---- Apply Master State (always, even without Firebase) ----
  if (!masterState) {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(BUZZER, LOW);
    buzzerPulsing = false;
    if (alertActive) {
      alertActive = false;
      alertHoldStart = 0;
      if (fbReady) {
        FirebaseJson json;
        json.set("active", false);
        json.set("reason", "Systeme desactive");
        json.set("timestamp", String(now));
        Firebase.RTDB.setJSON(&fbdo, "/alert", &json);
        yield();
      }
    }
  }

  // ---- Check Alert (10s hold after condition clears) ----
  bool hazard = checkAlert(lastTemp, lastHum, lastFlame);
  char alertReason[120] = "";

  if (hazard) {
    if (!alertActive) {
      alertActive = true;
      alertHoldStart = 0;
      if (fbReady) {
        buildAlertReason(alertReason, sizeof(alertReason), lastTemp, lastHum, lastFlame);
        FirebaseJson json;
        json.set("active", true);
        json.set("reason", alertReason);
        json.set("timestamp", String(now));
        Firebase.RTDB.setJSON(&fbdo, "/alert", &json);
        yield();
      }
      digitalWrite(LED_RED, LOW);
      buzzerPulsing = true;
    } else {
      alertHoldStart = 0;
    }
  } else {
    if (alertActive) {
      if (alertHoldStart == 0) {
        alertHoldStart = now;
        if (fbReady) {
          buildAlertReason(alertReason, sizeof(alertReason), lastTemp, lastHum, lastFlame);
          FirebaseJson json;
          json.set("active", true);
          json.set("reason", "Alerte maintenue 10s");
          json.set("timestamp", String(now));
          Firebase.RTDB.setJSON(&fbdo, "/alert", &json);
          yield();
        }
      } else if (now - alertHoldStart >= 10000) {
        alertActive = false;
        alertHoldStart = 0;
        if (fbReady) {
          FirebaseJson json;
          json.set("active", false);
          json.set("reason", "");
          json.set("timestamp", String(now));
          Firebase.RTDB.setJSON(&fbdo, "/alert", &json);
          yield();
        }
        digitalWrite(LED_RED, HIGH);
        digitalWrite(BUZZER, LOW);
        buzzerPulsing = false;
      }
    }
  }

  // ---- Push flame immediately on change (if Firebase ready) ----
  if (fbReady) {
    Firebase.RTDB.setBool(&fbdo, "/sensor/flame", lastFlame);
    yield();
  }

  // ---- Update LCD ----
  if (now - lastLCDUpdate >= LCD_INTERVAL) {
    updateLCD(lastTemp, lastHum, lastFlame, alertActive);
    lastLCDUpdate = now;
  }
  yield();

  // ---- Buzzer Pulsing ----
  if (buzzerPulsing && masterState) {
    if (now - lastBuzzerToggle >= BUZZER_INTERVAL) {
      lastBuzzerToggle = now;
      digitalWrite(BUZZER, !digitalRead(BUZZER));
    }
  } else {
    digitalWrite(BUZZER, LOW);
  }

  // ---- Update Firebase Sensor Data (temp/hum every 3s) ----
  if (fbReady && now - lastFbUpdate >= FIREBASE_INTERVAL) {
    if (!isnan(lastTemp))
      Firebase.RTDB.setFloat(&fbdo, "/sensor/temperature", lastTemp);
    if (!isnan(lastHum))
      Firebase.RTDB.setFloat(&fbdo, "/sensor/humidity", lastHum);
    yield();
    lastFbUpdate = now;
  }

  delay(10);
}
