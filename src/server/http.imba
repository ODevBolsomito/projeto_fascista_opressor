require('dotenv').config

const express = require('express')
const cors    = require('cors')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')

import User, Equipe, Competicao, Resultado from './db'

var server = express()

server.use cors
    origin: 'http://localhost:8080'
    methods:['GET','POST','PUT','DELETE']
    credentials: true
    exposedHeaders: 'Access-Token'

server.use express.json

server.use "*", do |req, resp, next|
    console.log("\n\n")
    console.log(:params, req:params)
    console.log("\n")
    console.log(:body, req:body)
    next()

# LOGIN
server.post('/login') do |req, res|
    let user = await User.findOne(where: {email: req:body:email})
    unless user
        return res.status(401).send("Usuário inválido!")
    unless (await bcrypt.compareSync(req:body:password, user:dataValues:encrypted_password))
        return res.status(401).send("Senha inválida!")
    
    let token = jwt.sign({userId: user:dataValues:id}, process:env.SECRET, { expiresIn: '1day' })
    res.set('Access-Token', token)
    res.json
        email: user:dataValues:email
        nome: user:dataValues:nome

# SIGNUP
server.post('/signup') do |req, res|
    let exists-email = await User.findOne(where: {email: req:body:email})
    if (exists-email)
        return res.json {errors: ['duplicated-user']}
    await User.create
        email: req:body:email
        nome: req:body:nome
        encrypted_password: (await bcrypt.hashSync(req:body:password, 10))
    return res.json {success: 'signup'}


# ROUTERS
var routeCompeticoes = express.Router();
var routeEquipes = express.Router({mergeParams: true});
var routeResultados = express.Router({mergeParams: true});


# COMPETICOES

routeCompeticoes.get('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let competicoes = await Competicao.findAll(where: {userId: userId})
    return res.json competicoes.map do |competicao| competicao:dataValues

routeCompeticoes.post('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body
    params:userId = userId
    let competicao = await Competicao.create(params)
    return res.json competicao:dataValues

routeCompeticoes.put('/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body
    let update = await Competicao.update(params, where: {id: req:params:id, userId: userId})
    if update:dataValues
        return res.json update:dataValues
    else
        return res.json update:errors

routeCompeticoes.delete('/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Competicao.destroy(where: {id: req:params:id, userId: userId})
    if destroy
        return res.json true
    else
        return res.json destroy:errors

routeCompeticoes.use('/:competicaoId/equipes', routeEquipes);
routeCompeticoes.use('/:competicaoId/resultados', routeResultados);


# EQUIPES
routeEquipes.get('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let equipes = await Equipe.findAll(where: {competicaoId: req:params:competicaoId})
    return res.json equipes.map do |equipe| equipe:dataValues

routeEquipes.post('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body
    params:competicaoId = req:params:competicaoId
    let equipe = await Equipe.create(params)
    return res.json equipe:dataValues

routeEquipes.put('/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body:equipe
    let update = await Equipe.update(params, where: {id: req:params:id})
    if update:dataValues
        return res.json update:dataValues
    else
        return res.json update:errors

routeEquipes.delete('/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Equipe.destroy(where: {id: req:params:id})
    if destroy
        return res.json true
    else
        return res.json destroy:errors


# RESULTADOS
routeResultados.get('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let resultados = await Resultado.findAll(where: {competicaoId: req:params:competicaoId})
    return res.json resultados.map do |resultado| resultado:dataValues

routeResultados.post('/') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body
    params:competicaoId = req:params:competicaoId
    let resultado = await Resultado.create(req:body)
    return res.json resultado:dataValues

routeResultados.delete('/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Resultado.destroy(where: {id: req:params:id})
    if destroy
        return res.json true
    else
        return res.json destroy:errors


server.use('/competicoes', routeCompeticoes)

server.listen(process:env.PORT) do
    console.log 'server is running on port ' + process:env.PORT
