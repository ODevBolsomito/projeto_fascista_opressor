require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var db$ = require('./db'), User = db$.User, Equipe = db$.Equipe, Competicao = db$.Competicao, Resultado = db$.Resultado;

var server = express();

server.use(cors(
	{origin: 'http://localhost:8080',
	methods: ['GET','POST','PUT','DELETE'],
	credentials: true,
	exposedHeaders: 'Access-Token'}
));

server.use(express.json());

server.use("*",function(req,resp,next) {
	console.log("\n\n");
	console.log('params',req.params);
	console.log("\n");
	console.log('body',req.body);
	return next();
});

// LOGIN
server.post('/login',async function(req,res) {
	let user = await User.findOne({where: {email: req.body.email}});
	if (!user) {
		return res.status(401).send("Usuário inválido!");
	};
	if (!(await bcrypt.compareSync(req.body.password,user.dataValues.encrypted_password))) {
		return res.status(401).send("Senha inválida!");
	};
	
	let token = jwt.sign({userId: user.dataValues.id},process.env.SECRET,{expiresIn: '1day'});
	res.set('Access-Token',token);
	return res.json(
		{email: user.dataValues.email,
		nome: user.dataValues.nome}
	);
});

// SIGNUP
server.post('/signup',async function(req,res) {
	let existsEmail = await User.findOne({where: {email: req.body.email}});
	if ((existsEmail)) {
		return res.json({errors: ['duplicated-user']});
	};
	await User.create(
		{email: req.body.email,
		nome: req.body.nome,
		encrypted_password: (await bcrypt.hashSync(req.body.password,10))}
	);
	return res.json({success: 'signup'});
});


// ROUTERS
var routeCompeticoes = express.Router();;
var routeEquipes = express.Router({mergeParams: true});;
var routeResultados = express.Router({mergeParams: true});;


// COMPETICOES

routeCompeticoes.get('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let competicoes = await Competicao.findAll({where: {userId: userId}});
	return res.json(competicoes.map(function(competicao) { return competicao.dataValues; }));
});

routeCompeticoes.post('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let params = req.body;
	params.userId = userId;
	let competicao = await Competicao.create(params);
	return res.json(competicao.dataValues);
});

routeCompeticoes.put('/:id',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let params = req.body;
	let update = await Competicao.update(params,{where: {id: req.params.id,userId: userId}});
	if (update.dataValues) {
		return res.json(update.dataValues);
	} else {
		return res.json(update.errors);
	};
});

routeCompeticoes.delete('/:id',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let destroy = await Competicao.destroy({where: {id: req.params.id,userId: userId}});
	if (destroy) {
		return res.json(true);
	} else {
		return res.json(destroy.errors);
	};
});

routeCompeticoes.use('/:competicaoId/equipes',routeEquipes);;
routeCompeticoes.use('/:competicaoId/resultados',routeResultados);;


// EQUIPES
routeEquipes.get('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let equipes = await Equipe.findAll({where: {competicaoId: req.params.competicaoId}});
	return res.json(equipes.map(function(equipe) { return equipe.dataValues; }));
});

routeEquipes.post('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let params = req.body;
	params.competicaoId = req.params.competicaoId;
	let equipe = await Equipe.create(params);
	return res.json(equipe.dataValues);
});

routeEquipes.put('/:id',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let params = req.body.equipe;
	let update = await Equipe.update(params,{where: {id: req.params.id}});
	if (update.dataValues) {
		return res.json(update.dataValues);
	} else {
		return res.json(update.errors);
	};
});

routeEquipes.delete('/:id',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let destroy = await Equipe.destroy({where: {id: req.params.id}});
	if (destroy) {
		return res.json(true);
	} else {
		return res.json(destroy.errors);
	};
});


// RESULTADOS
routeResultados.get('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let resultados = await Resultado.findAll({where: {competicaoId: req.params.competicaoId}});
	return res.json(resultados.map(function(resultado) { return resultado.dataValues; }));
});

routeResultados.post('/',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let params = req.body;
	params.competicaoId = req.params.competicaoId;
	let resultado = await Resultado.create(req.body);
	return res.json(resultado.dataValues);
});

routeResultados.delete('/:id',async function(req,res) {
	let userId = jwt.verify(req.headers.accesstoken,process.env.SECRET).userId;
	if (!userId) { return res.sendStatus(401) };
	let destroy = await Resultado.destroy({where: {id: req.params.id}});
	if (destroy) {
		return res.json(true);
	} else {
		return res.json(destroy.errors);
	};
});


server.use('/competicoes',routeCompeticoes);

server.listen(process.env.PORT,function() {
	return console.log('server is running on port ' + process.env.PORT);
});
