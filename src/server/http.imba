require('dotenv').config

const express = require 'express'
const cors    = require 'cors'
const bcrypt  = require 'bcryptjs'
const jwt     = require 'jsonwebtoken'

import User, Equipe, Competicao, Resultado from './db'

var server = express()

server.use cors
    origin: 'http://localhost:8080'
    methods:['GET','POST','PUT','DELETE']
    credentials: true
    exposedHeaders: 'Access-Token'

server.use express.json

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


# COMPETICOES
server.get('/competicoes') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let competicoes = await Competicao.findAll(where: {userId: userId})
    return res.json competicoes.map do |competicao| competicao:dataValues

server.post('/competicoes') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body:competicao
    params:userId = userId
    let competicao = await Competicao.create(params)
    return res.json competicao:dataValues

server.put('/competicoes/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body:competicao
    let update = await Competicao.update(params, where: {id: req:params:id, userId: userId})
    if update:dataValues
        return res.json update:dataValues
    else
        return res.json update:errors

server.delete('/competicoes/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Competicao.destroy(where: {id: req:params:id, userId: userId})
    if destroy
        return res.json true
    else
        return res.json destroy:errors


# EQUIPES
server.get('/equipes') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let equipes = await Equipe.findAll
    return res.json equipes.map do |equipe| equipe:dataValues

server.post('/equipes') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let equipe = await Equipe.create(req:body:equipe)
    return res.json equipe:dataValues

server.put('/equipes/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let params = req:body:equipe
    let update = await Equipe.update(params, where: {id: req:params:id})
    if update:dataValues
        return res.json update:dataValues
    else
        return res.json update:errors

server.delete('/equipes/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Equipe.destroy(where: {id: req:params:id})
    if destroy
        return res.json true
    else
        return res.json destroy:errors


# RESULTADOS
server.get('/resultados') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let resultados = await Resultado.findAll
    return res.json resultados.map do |resultado| resultado:dataValues

server.post('/resultados') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    console.log "\n\n\n"
    console.log req:body
    console.log "\n\n\n"
    let resultado = await Resultado.create(req:body:resultado)
    return res.json resultado:dataValues

# server.put('/resultados/:id') do |req, res|
#     let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
#     return res.sendStatus 401 unless userId
#     let params = req:body:resultado
#     let update = await Resultado.update(params, where: {id: req:params:id})
#     if update:dataValues
#         return res.json update:dataValues
#     else
#         return res.json update:errors

server.delete('/resultados/:id') do |req, res|
    let userId = jwt.verify(req:headers:accesstoken, process:env:SECRET):userId
    return res.sendStatus 401 unless userId
    let destroy = await Resultado.destroy(where: {id: req:params:id})
    if destroy
        return res.json true
    else
        return res.json destroy:errors



server.listen(process:env.PORT) do
    console.log 'server is running on port ' + process:env.PORT
