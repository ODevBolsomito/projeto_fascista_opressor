#include <Arduino.h>
#include "Ultrassonico.h"
#include "MqttClient.h"
#include "Plataforma.h"
#include "LDR.h"

const char* ssid = "TESTE";
const char* password = "123123as";
const char* mqtt_server = "192.168.137.1";

Ultrassonico ultra1(D0, D1);
// Ultrassonico ultra2(D2, D3);
// Ultrassonico ultra3(D4, D5);
Plataforma plataforma(D7);
LDR placa1(A0);
// LDR placa1(D8);
MqttClient mqtt(ssid, password, mqtt_server);

void setup() {
  Serial.begin(74880);
  ultra1.setup();
  // ultra2.setup();
  // ultra3.setup();
  plataforma.setup();
  placa1.setup();
  mqtt.setup();
}

void loop() {
  if(ultra1.detected())   mqtt.publish("arco1");
  // if(ultra2.detected())   mqtt.publish("arco2");
  // if(ultra3.detected())   mqtt.publish("golf");
  if(placa1.derrubada())  mqtt.publish("placa1");
  if(plataforma.largou()) mqtt.publish("largada");
  if(plataforma.chegou()) mqtt.publish("chegada");
}
