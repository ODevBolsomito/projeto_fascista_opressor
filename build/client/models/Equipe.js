function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba');
const axios = require('axios');

var Record = require('./Record').Record;
var State = require('../State').State;

function Equipe(){ return Record.apply(this,arguments) };

Imba.subclass(Equipe,Record);
exports.Equipe = Equipe; // export class 
Equipe.collection('equipes');

Equipe.fields(
	{nome: {type: 'String',human_name: "Nome"}}
);

Equipe.all = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/equipes"),
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

Equipe.create = async function (data){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/equipes"),
		method: 'POST',
		data: data,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return new this(res.data);
};


Equipe.prototype.update = async function (){
	let data = {};
	data[this.constructor.name.toLowerCase()] = this;
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/equipes/" + (this.id)),
		method: 'PUT',
		data: data,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};


Equipe.prototype.destroy = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/equipes/" + (this.id)),
		method: 'DELETE',
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};

Equipe.prototype.save = async function (){
	let res;
	if (this.id) {
		res = await this.update();
	} else {
		res = await axios(
			{url: ("http://localhost:9000/competicoes/" + (State.competicao.id) + "/equipes"),
			method: 'POST',
			data: this,
			headers: {
				AccessToken: window.sessionStorage.getItem('token')
			}}
		);
	};
	return res;
};
