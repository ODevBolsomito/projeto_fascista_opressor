const PORT = 1883;
const IP = '127.0.0.1';
var Server = require('mosca').Server;
var Resultado = require('./db').Resultado;
var mqtt = require('mqtt');
var server = new Server({port: PORT});
var subscriber = mqtt.connect(("mqtt://" + IP));

server.on('ready',function() {
	return console.log(("MQTT Server running on " + IP + ":" + PORT));
});

subscriber.on('connect',function() {
	subscriber.subscribe('largada');
	subscriber.subscribe('arco1');
	subscriber.subscribe('arco2');
	subscriber.subscribe('placa1');
	subscriber.subscribe('placa2');
	subscriber.subscribe('golf');
	return subscriber.subscribe('chegada');
});

subscriber.on('message',async function(topic,message) {
	try {
		console.log(topic,message.toString());
		
		let resultado = await Resultado.findOne({
			where: {chegada: null},
			order: [['createdAt','DESC']]
		});
		if (!resultado) { return };
		
		let params = {};
		params[topic] = message.toString();
		Resultado.update(params,{where: {id: resultado.dataValues.id}});
		return console.log(topic,message.toString());
	} catch (err) {
		return console.log(err);
	};
});
