#include <Arduino.h>
#include "Ultrassonico.h"
#include "MqttClient.h"
#include "SensorVibracao.h"

const char* ssid = "HAKA FUNDOS";
const char* password = "951321as";
const char* mqtt_server = "192.168.0.15";

Ultrassonico ultra1(D0, D1);
Ultrassonico ultra2(D2, D3);
Ultrassonico ultra3(D4, D5);
SensorVibracao sv1(D6);
MqttClient mqtt(ssid, password, mqtt_server);

void setup() {
  Serial.begin(74880);
  sv1.setup();
  ultra1.setup();
  ultra2.setup();
  ultra3.setup();
  mqtt.setup();
}

void loop() {
  if(ultra1.detected())   mqtt.publish("arco3");
  if(ultra2.detected())   mqtt.publish("golf");
  if(ultra3.detected())   mqtt.publish("chegada");
  if(sv1.vibrou())        mqtt.publish("placaZ");
}
