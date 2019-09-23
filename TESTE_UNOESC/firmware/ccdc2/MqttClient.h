#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// DEFINITION

class MqttClient {
  private:

    const char* ssid;
    const char* password;
    const char* mqtt_server;

    WiFiClient espClient;
    PubSubClient client;

  public:
    MqttClient(
      const char* _ssid, 
      const char* _password,
      const char* _mqtt_server) : ssid(_ssid),
                                  password(_password),
                                  mqtt_server(_mqtt_server),
                                  client(espClient) {}

    void setup_wifi();
    void reconnect();
    void setup();
    void publish(const char* topic);
};

// IMPLEMENTATION

void MqttClient::setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void MqttClient::reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);

    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } 
    // Fail connect
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }
}

void MqttClient::setup() {
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  reconnect();
}

void MqttClient::publish(const char* topic) {
  if (!client.connected())
    reconnect();
  
  Serial.println(topic);
  const char* msg = "1";
  client.publish(topic, msg);
}