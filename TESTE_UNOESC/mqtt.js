const PORT = 1883;
const IP = '192.168.0.15';

var Prova = require('./Prova').Prova;
var Server = require('mosca').Server;

var mqtt = require('mqtt');

var prova = new Prova();
var server = new Server({port: PORT});

var subscriber = mqtt.connect(("mqtt://" + IP));
// var publisher = mqtt.connect("mqtt://{IP}")

server.on('ready',function() {
	return console.log(("MQTT Server running on " + IP + ":" + PORT));
});

// publisher.on('connect', &) do 
//     publisher.publish('largada', 'Hello mqtt')
//     console.log('Message Sent')

subscriber.on('connect',function() {
	subscriber.subscribe('largada');
	subscriber.subscribe('arco1');
	subscriber.subscribe('arco2');
	subscriber.subscribe('arco3');
	subscriber.subscribe('golf');
	subscriber.subscribe('placaX');
	subscriber.subscribe('placaY');
	subscriber.subscribe('placaZ');
	return subscriber.subscribe('chegada');
});

subscriber.on('message',function(topic,message) {
	if (!prova.chegada()[0]) {
		// message.toString()
		prova.detecta(topic);
		console.log(topic,message.toString());
		prova.resultados();
		if (topic == "chegada") {
			return console.log(prova.tempo());
		};
	};
});
