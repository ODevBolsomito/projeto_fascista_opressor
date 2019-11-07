const PORT = 1883
const IP = '192.168.0.15'

import Prova from './Prova'
import Server from 'mosca'

var mqtt = require('mqtt')

var prova = Prova.new
var server = Server.new(port: PORT)

var subscriber = mqtt.connect("mqtt://{IP}")
var publisher = mqtt.connect("mqtt://{IP}")

server.on('ready', &) do
    console.log("MQTT Server running on {IP}:{PORT}")

subscriber.on('connect', &) do
    subscriber.subscribe('largada')
    subscriber.subscribe('arco1')
    subscriber.subscribe('arco2')
    subscriber.subscribe('arco3')
    subscriber.subscribe('golf')
    subscriber.subscribe('placaX')
    subscriber.subscribe('placaY')
    subscriber.subscribe('placaZ')
    subscriber.subscribe('chegada')

subscriber.on('message', &) do |topic, message|
    unless prova.chegada[0]
        # message.toString()
        prova.detecta(topic)
        console.log(topic, message.toString)
        prova.resultados
        if topic == "chegada"
            console.log prova.tempo

publisher.on('connect', &) do 
    publisher.publish('largada', 'Hello mqtt')
    console.log('Message Sent')