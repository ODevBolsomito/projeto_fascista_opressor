#include <Arduino.h>
#include "Ultrassonico.h"
#include "MqttClient.h"
#include "Plataforma.h"
#include "LDR.h"

const char* ssid = "HAKA FUNDOS";
const char* password = "951321as";
const char* mqtt_server = "192.168.0.19";

Ultrassonico arco1(D1, D2);
// Ultrassonico arco2(D3, D4);
// Ultrassonico golf(D1, D2);
Plataforma plataforma(D0);
LDR placa1(A0);
// LDR placa2(A0);
MqttClient mqtt(ssid, password, mqtt_server);

void setup() {
  Serial.begin(74880);
  arco1.setup();
  // arco2.setup();
  // golf.setup();
  plataforma.setup();
  placa1.setup();
  // placa2.setup();
  mqtt.setup();
}

void loop() {
  if(arco1.detected())   mqtt.publish("arco1");
  // if(arco2.detected())   mqtt.publish("arco2");
  // if(golf.detected())   mqtt.publish("golf");
  if(placa1.derrubada())  mqtt.publish("placa1");
  if(plataforma.chegou()) mqtt.publish("chegada");
  if(plataforma.largou()) {
    placa1.setup();
    arco1.setup();
    mqtt.publish("largada"); // COMENTAR NO CCDC2
    // arco2.setup();
    // golf.setup();
    // placa2.setup();

  }
}
