var Imba = require('imba');
var Record = require('./Record').Record;

function Competicao(){ return Record.apply(this,arguments) };

Imba.subclass(Competicao,Record);
exports.Competicao = Competicao; // export class 
Competicao.collection('competicoes');

Competicao.fields(
	{nome: {type: 'String',human_name: "Nome"}}
);

Competicao.inputs(
	{nome: {type: 'String',human_name: "Nome"}}
);
