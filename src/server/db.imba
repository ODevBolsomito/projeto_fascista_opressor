const uuid = require 'uuid/v4'
const Sequelize = require 'sequelize'
const mysql = require 'mysql2'

const connection = mysql.createConnection
  host: process:env:DB_HOST
  user: process:env:DB_USER
  password: process:env:DB_PASSWORD

connection.query 'CREATE DATABASE IF NOT EXISTS ??', process:env:DB_NAME, do |err, results| 
    if (err)
        console.log('[ERROR] CREATE DATABASE - ', err)
    else
        console.log('[OK] CREATE DATABASE')

const sequelize = Sequelize.new
    process:env:DB_NAME,
    process:env:DB_USER,
    process:env:DB_PASSWORD,    
        dialect: 'mysql'
        host: process:env:DB_HOST
        port: process:env:DB_PORT

export var User = sequelize.define 'users',
    id:
        allowNull: false
        primaryKey: true
        type: Sequelize.UUID
        defaultValue: do uuid()
    email: 
        type: Sequelize.STRING
        unique: true
        allowNull: false
    nome:
        type: Sequelize.STRING
        allowNull: false
    encrypted_password:
        type: Sequelize.STRING
        allowNull: false

export var Equipe = sequelize.define 'equipes',
    nome:
        type: Sequelize.STRING
        unique: true
        allowNull: false

export var Resultado = sequelize.define 'resultados',
    letra: 
        type: Sequelize.STRING
    largada: 
        type: Sequelize.DATE(6)
        allowNull: true
    missao_1:
        type: Sequelize.INTEGER
        allowNull: true
    missao_2:
        type: Sequelize.INTEGER
        allowNull: true
    missao_3:
        type: Sequelize.INTEGER
        allowNull: true
    chegada: 
        type: Sequelize.DATE(6)
        allowNull: true

export var Competicao = sequelize.define 'competicoes',
    nome:
        type: Sequelize.STRING
        unique: true
        allowNull: false

User.hasMany(Competicao)

Competicao.hasMany(Equipe)
Competicao.hasMany(Resultado)

Equipe.belongsTo(Competicao)
Equipe.hasMany(Resultado)

Resultado.belongsTo(Equipe)

await sequelize.sync
    .then do 
        console.log('[OK] CREATE TABLES')
    .catch do |error| 
        console.log('[ERROR] CREATE TABLES - ', error)