function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
const axios = require('axios');

function Record(_0){
	var dict, fields_, $1;
	this.setFields(Record.caller.fields());
	this.setInputs(Record.caller.inputs());
	this.setCollection(Record.caller.collection());
	
	for (let k in dict = this.inputs()){
		let v;
		v = dict[k];this[k] = null;
	};
	
	for (let k in fields_ = this.fields()){
		let v;
		v = fields_[k];this[k] = null;
	};
	
	for (let k in $1 = (_0)){
		let v;
		v = $1[k];if (_0) { this[k] = (_0)[k] };
	};
};
exports.Record = Record; // export class 
Record.prototype.collection = function(v){ return this._collection; }
Record.prototype.setCollection = function(v){ this._collection = v; return this; };
Record.prototype.fields = function(v){ return this._fields; }
Record.prototype.setFields = function(v){ this._fields = v; return this; };
Record.prototype.inputs = function(v){ return this._inputs; }
Record.prototype.setInputs = function(v){ this._inputs = v; return this; };

Record.collection = function (collection){
	return this._collection || (this._collection = collection);
};

Record.fields = function (fields){
	return this._fields || (this._fields = fields);
};

Record.inputs = function (inputs){
	return this._inputs || (this._inputs = inputs);
};

Record.all = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/" + (this._collection)),
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

Record.create = async function (data){
	let res = await axios(
		{url: ("http://localhost:9000/" + (this._collection)),
		method: 'POST',
		data: data,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return new this(res.data);
};


Record.prototype.update = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/" + (this._collection) + "/" + (this.id)),
		method: 'PUT',
		data: this,
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};


Record.prototype.destroy = async function (){
	let res = await axios(
		{url: ("http://localhost:9000/" + (this._collection) + "/" + (this.id)),
		method: 'DELETE',
		headers: {
			AccessToken: window.sessionStorage.getItem('token')
		}}
	);
	return res;
};

Record.prototype.save = async function (){
	let res;
	if (this.id) {
		res = await this.update();
	} else {
		res = await axios(
			{url: ("http://localhost:9000/" + (this._collection)),
			method: 'POST',
			data: this,
			headers: {
				AccessToken: window.sessionStorage.getItem('token')
			}}
		);
	};
	return res;
};



