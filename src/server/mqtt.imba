const PORT = 1883
const IP = '127.0.0.1'
import Server from 'mosca'
import Resultado from './db'
var mqtt = require('mqtt')
var server = Server.new(port: PORT)
var subscriber = mqtt.connect("mqtt://{IP}")

server.on('ready', &) do
    console.log("MQTT Server running on {IP}:{PORT}")

subscriber.on('connect', &) do
    subscriber.subscribe('largada')
    subscriber.subscribe('arco1')
    subscriber.subscribe('arco2')
    subscriber.subscribe('placa1')
    subscriber.subscribe('placa2')
    subscriber.subscribe('golf')
    subscriber.subscribe('chegada')

subscriber.on('message', &) do |topic, message|
    let resultado = await Resultado.findOne({
        where: {chegada: null}, 
        order: [[ 'createdAt', 'DESC' ]]
    })
    return unless resultado
    let params = {}
    params[topic] = 1
    Resultado.update(params, where: {id: resultado:dataValues:id})
    console.log(topic, message.toString)
