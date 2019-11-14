function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba');
const axios = require('axios');

var Record = require('./Record').Record;
var Equipe = require('./Equipe').Equipe;
var State = require('../State').State;

function Resultado(){ return Record.apply(this,arguments) };

Imba.subclass(Resultado,Record);
exports.Resultado = Resultado; // export class 
Resultado.collection('resultados');

Resultado.fields(
	{equipeId: {type: 'Integer',human_name: 'EquipeId'},
	largada: {type: 'DateTime',human_name: 'Largada'},
	arco1: {type: 'Integer',human_name: 'Arco 1'},
	arco2: {type: 'Integer',human_name: 'Arco 2'},
	placa1: {type: 'Integer',human_name: 'Placa 1'},
	placa2: {type: 'DateTime',human_name: 'Placa 2'},
	golf: {type: 'DateTime',human_name: 'Golf'},
	chegada: {type: 'DateTime',human_name: 'Chegada'}}
);

Resultado.all = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/resultados"),
		method: 'GET',
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	
	let res1 = [];
	for (let i = 0, items = iter$(res.data), len = items.length; i < len; i++) {
		res1.push(new this(items[i]));
	};
	return res1;
};

Resultado.create = async function (data){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/resultados"),
		method: 'POST',
		data: data,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return new this(res.data);
};

Resultado.prototype.update = async function (){
	let data = {};
	data[this.constructor.name.toLowerCase()] = this;
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/resultados/" + (this.id)),
		method: 'PUT',
		data: data,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};

Resultado.prototype.destroy = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/resultados/" + (this.id)),
		method: 'DELETE',
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};

Resultado.prototype.save = async function (){
	let res;
	if (this.id) {
		res = await this.update();
	} else {
		res = await axios(
			{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/resultados"),
			method: 'POST',
			data: this,
			headers: {
				AccessToken: window.sessionStorage.getItem('token')
			}}
		);
	};
	return res;
};
