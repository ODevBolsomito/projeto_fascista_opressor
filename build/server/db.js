var Imba = require('imba');
require('dotenv').config();

const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const mysql = require('mysql2');

const connection = mysql.createConnection(
	{host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD}
);

connection.query('CREATE DATABASE IF NOT EXISTS ??',process.env.DB_NAME,function(err,results) {
	if ((err)) {
		return console.log('[ERROR] CREATE DATABASE - ',err);
	} else {
		return console.log('[OK] CREATE DATABASE');
	};
});

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,{dialect: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT}
);

var User = exports.User = sequelize.define('users',{id: {type: Sequelize.UUID,allowNull: false,primaryKey: true,defaultValue: function() { return uuid(); }},
email: {type: Sequelize.STRING,unique: true,allowNull: false},
nome: {type: Sequelize.STRING,allowNull: false},
encrypted_password: {type: Sequelize.STRING,allowNull: false}});

var Competicao = exports.Competicao = sequelize.define('competicoes',{nome: {type: Sequelize.STRING,unique: true,allowNull: false},
userId: {type: Sequelize.UUID,allowNull: false,references: {model: 'users',key: 'id'}}});

var Equipe = exports.Equipe = sequelize.define('equipes',{nome: {type: Sequelize.STRING,unique: true,allowNull: false},
competicaoId: {type: Sequelize.INTEGER,allowNull: false,references: {model: 'competicoes',key: 'id'}}});

var Resultado = exports.Resultado = sequelize.define('resultados',{largada: {type: Sequelize.STRING,allowNull: true},
arco1: {type: Sequelize.STRING,allowNull: true},
arco2: {type: Sequelize.STRING,allowNull: true},
placa1: {type: Sequelize.STRING,allowNull: true},
placa2: {type: Sequelize.STRING,allowNull: true},
golf: {type: Sequelize.STRING,allowNull: true},
chegada: {type: Sequelize.STRING,allowNull: true},
equipeId: {type: Sequelize.INTEGER,allowNull: false,references: {model: 'equipes',key: 'id'}},
competicaoId: {type: Sequelize.INTEGER,allowNull: false,references: {model: 'competicoes',key: 'id'}}});

Imba.await(sequelize.sync().then(function() {
	return console.log('[OK] CREATE TABLES');
}).catch(function(error) {
	return console.log('[ERROR] CREATE TABLES - ',error);
})).then(function() {
	
});