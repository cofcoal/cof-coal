// ========== WiFi ==========
const char* ssid = "TT_48F8";
const char* password = "5kkje4p9ys";

// ========== Firebase ==========
#define API_KEY "AIzaSyBITxcSCeU9gjBp7jXLWMNf2jnbjGn7qaU"
#define DATABASE_URL "https://cof-coal-default-rtdb.europe-west1.firebasedatabase.app/"
#define USER_EMAIL "admin.cofcoal.tn@gmail.com"
#define USER_PASSWORD "@cof-coal.tn"

// ========== Thresholds ==========
#define TEMP_MIN 15.0
#define TEMP_MAX 35.0
#define HUM_MIN 30.0
#define HUM_MAX 70.0

// ========== Flame Sensor ==========
// Set to false if your module outputs HIGH when flame is detected
#define FLAME_ACTIVE_LOW false
// Pin: D0 (GPIO16). If unreliable, try D5 (GPIO14) or D6 (GPIO12)
#define FLAME_PIN D0
