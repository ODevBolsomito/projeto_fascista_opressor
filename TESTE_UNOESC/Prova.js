function Prova(){ };

exports.Prova = Prova; // export class 
Prova.prototype.__largada = {'default': [],name: 'largada'};
Prova.prototype.largada = function(v){ return this._largada; }
Prova.prototype.setLargada = function(v){ this._largada = v; return this; }
Prova.prototype._largada = [];
Prova.prototype.__arco1 = {'default': [],name: 'arco1'};
Prova.prototype.arco1 = function(v){ return this._arco1; }
Prova.prototype.setArco1 = function(v){ this._arco1 = v; return this; }
Prova.prototype._arco1 = [];
Prova.prototype.__arco2 = {'default': [],name: 'arco2'};
Prova.prototype.arco2 = function(v){ return this._arco2; }
Prova.prototype.setArco2 = function(v){ this._arco2 = v; return this; }
Prova.prototype._arco2 = [];
Prova.prototype.__arco3 = {'default': [],name: 'arco3'};
Prova.prototype.arco3 = function(v){ return this._arco3; }
Prova.prototype.setArco3 = function(v){ this._arco3 = v; return this; }
Prova.prototype._arco3 = [];
Prova.prototype.__golf = {'default': [],name: 'golf'};
Prova.prototype.golf = function(v){ return this._golf; }
Prova.prototype.setGolf = function(v){ this._golf = v; return this; }
Prova.prototype._golf = [];
Prova.prototype.__placaX = {'default': [],name: 'placaX'};
Prova.prototype.placaX = function(v){ return this._placaX; }
Prova.prototype.setPlacaX = function(v){ this._placaX = v; return this; }
Prova.prototype._placaX = [];
Prova.prototype.__placaY = {'default': [],name: 'placaY'};
Prova.prototype.placaY = function(v){ return this._placaY; }
Prova.prototype.setPlacaY = function(v){ this._placaY = v; return this; }
Prova.prototype._placaY = [];
Prova.prototype.__placaZ = {'default': [],name: 'placaZ'};
Prova.prototype.placaZ = function(v){ return this._placaZ; }
Prova.prototype.setPlacaZ = function(v){ this._placaZ = v; return this; }
Prova.prototype._placaZ = [];
Prova.prototype.__chegada = {'default': [],name: 'chegada'};
Prova.prototype.chegada = function(v){ return this._chegada; }
Prova.prototype.setChegada = function(v){ this._chegada = v; return this; }
Prova.prototype._chegada = [];

Prova.prototype.detecta = function (sensor){
	var v_;
	switch (sensor) {
		case 'largada': {
			return (this.setLargada(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'arco1': {
			return (this.setArco1(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'arco2': {
			return (this.setArco2(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'arco3': {
			return (this.setArco3(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'golf': {
			return (this.setGolf(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'placaX': {
			return (this.setPlacaX(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'placaY': {
			return (this.setPlacaY(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'placaZ': {
			return (this.setPlacaZ(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
		case 'chegada': {
			return (this.setChegada(v_ = [new Date(),process.hrtime()[1]]),v_);
			break;
		}
	};
};

Prova.prototype.resultados = function (){
	console.log("largada",this.largada()[0],this.largada()[1]);
	console.log("arco1",this.arco1()[0],this.arco1()[1]);
	console.log("arco2",this.arco2()[0],this.arco2()[1]);
	console.log("arco3",this.arco3()[0],this.arco3()[1]);
	console.log("golf",this.golf()[0],this.golf()[1]);
	console.log("placaX",this.placaX()[0],this.placaX()[1]);
	console.log("placaY",this.placaY()[0],this.placaY()[1]);
	console.log("placaZ",this.placaZ()[0],this.placaZ()[1]);
	return console.log("chegada",this.chegada()[0],this.chegada()[1]);
};

Prova.prototype.tempo = function (){
	return ("TEMPO FINAL: " + (this.chegada()[0] - this.largada()[0])) - ("" + (this.chegada()[1] - this.largada()[1]));
};
