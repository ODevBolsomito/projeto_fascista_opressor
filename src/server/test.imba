const PORT = 1883
const IP = '127.0.0.1'

var mqtt = require('mqtt')

var publisher = mqtt.connect("mqtt://{IP}")

# publisher.on('connect', &) do

publisher.publish('largada', JSON.stringify(process.hrtime()))