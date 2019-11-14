function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _2 = Imba.createTagList, _1 = Imba.createElement;
var Resultado = require('../models/Resultado').Resultado;
var Equipe = require('../models/Equipe').Equipe;
var Select = require('../components/Select').Select;
var State = require('../State').State;


var mili_sec = {
	mili: 0,
	sec: 0
};

var Resultados = Imba.defineTag('Resultados', function(tag){
	tag.prototype.equipes = function(v){ return this._equipes; }
	tag.prototype.setEquipes = function(v){ this._equipes = v; return this; };
	tag.prototype.equipe_selecionada = function(v){ return this._equipe_selecionada; }
	tag.prototype.setEquipe_selecionada = function(v){ this._equipe_selecionada = v; return this; };
	tag.prototype.__loading = {'default': true,name: 'loading'};
	tag.prototype.loading = function(v){ return this._loading; }
	tag.prototype.setLoading = function(v){ this._loading = v; return this; }
	tag.prototype._loading = true;
	
	tag.prototype.mount = async function (){
		this.setEquipes(await Equipe.all());
		this._loading = false;
		return this.render();
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).flag('fadeIn').flag('animated').setChildren($.$ = $.$ || [
			_1('header',$,0,this).flag('content__title').setContent(
				$[1] || _1('h1',$,1,0).setText("Resultados")
			,2),
			
			_1('div',$,2,this).flag('card').setContent(
				$[3] || _1('div',$,3,2).flag('card-body').setContent([
					_1(IniciarPercurso,$,4,3),
					_1(Tabela,$,5,3)
				],2)
			,2)
		],2).synced((
			$[4].setEquipes(this.equipes()).setLoading(this.loading()).end(),
			$[5].setEquipes(this.equipes()).end()
		,true));
	};
})
exports.Resultados = Resultados;

var IniciarPercurso = Imba.defineTag('IniciarPercurso', function(tag){
	tag.prototype.equipes = function(v){ return this._equipes; }
	tag.prototype.setEquipes = function(v){ this._equipes = v; return this; };
	tag.prototype.equipe_selecionada = function(v){ return this._equipe_selecionada; }
	tag.prototype.setEquipe_selecionada = function(v){ this._equipe_selecionada = v; return this; };
	tag.prototype.__loading = {'default': true,name: 'loading'};
	tag.prototype.loading = function(v){ return this._loading; }
	tag.prototype.setLoading = function(v){ this._loading = v; return this; }
	tag.prototype._loading = true;
	
	tag.prototype.changeEquipe = function (e){
		var v_;
		return (this.setEquipe_selecionada(v_ = e.data()),v_);
	};
	
	tag.prototype.iniciarPercurso = async function (){
		return await Resultado.create({equipeId: this.equipe_selecionada()});
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).flag('row').setChildren($.$ = $.$ || [
			_1('div',$,0,this).flag('col'),
			_1('div',$,2,this).flag('col').setContent(
				$[3] || _1('button',$,3,2).setType("button").flag('btn').flag('btn-link').flag('button-add-record').on$(0,['tap','iniciarPercurso'],this).setContent([
					" INICIAR ",
					$[4] || _1('i',$,4,3).flag('zmdi').flag('zmdi-hc-1x').flag('zmdi-play')
				],2)
			,2)
		],2).synced((
			$[0].setContent(
				(!(this.loading())) ? (
					($[1] || _1(Select,$,1,0).on$(0,['change','changeEquipe'],this)).setDefault(({name: 'EQUIPE',value: null})).setOptions((this.equipes().map(function(e) { return e.nome; }))).setValues((this.equipes().map(function(e) { return e.id; }))).end()
				) : void(0)
			,3),
			$[3].end()
		,true));
	};
});

var Tabela = Imba.defineTag('Tabela', function(tag){
	tag.prototype.resultados = function(v){ return this._resultados; }
	tag.prototype.setResultados = function(v){ this._resultados = v; return this; };
	tag.prototype.equipes = function(v){ return this._equipes; }
	tag.prototype.setEquipes = function(v){ this._equipes = v; return this; };
	tag.prototype.loading = function(v){ return this._loading; }
	tag.prototype.setLoading = function(v){ this._loading = v; return this; };
	tag.prototype.counter = function(v){ return this._counter; }
	tag.prototype.setCounter = function(v){ this._counter = v; return this; };
	
	tag.prototype.show_counter = function(v){ return this._show_counter; }
	tag.prototype.setShow_counter = function(v){ this._show_counter = v; return this; };
	
	tag.prototype.mount = async function (){
		var self = this;
		self.setResultados((await Resultado.all()).filter(function(r) { return r.competicaoId = State.competicao.id; }));
		Imba.setInterval(600,async function() {
			var v_;
			return (self.setResultados(v_ = (await Resultado.all()).filter(function(r) { return r.competicaoId = State.competicao.id; })),v_);
		});
		return self.render();
	};
	
	
	tag.prototype.equipeFrom = function (res){
		return (this.equipes() || []).find(function(e) {
			return e.id == res.equipeId;
		});
	};
	
	
	tag.prototype.pontuacaoFrom = function (res){
		return (res.arco1 && 10 || 0) + (res.arco2 && 10 || 0) + (res.placa1 && 10 || 0) + (res.placa2 && 10 || 0) + (res.golf && 10 || 0);
	};
	
	
	tag.prototype.tempoFrom = function (res){
		if (res.largada && res.chegada) {
			let chegada = JSON.parse(res.chegada);
			let largada = JSON.parse(res.largada);
			return ("" + ((chegada - largada) / 1000));
		} else if (res.largada) {
			if (!(this.show_counter())) {
				this.setCounter((_1(Counter)).end());
				this.setShow_counter(true);
			};
			return this.counter();
		} else {
			return "0.000";
		};
	};
	
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).flag('table-responsive').setChildren(
			$[0] || _1('div',$,0,self).setId('data-table_wrapper').flag('dataTables_wrapper').flag('no-footer').setContent(
				$[1] || _1('div',$,1,0).flag('table-content')
			,2)
		,2).synced((
			$[1].setContent(
				(!(self.loading())) ? (
					($[2] || _1('table',$,2,1).flag('table').flag('table-bordered').flag('mb-0').setContent([
						_1('thead',$,3,2).setContent(
							$[4] || _1('tr',$,4,3).setContent([
								_1('th',$,5,4).setText("Equipe"),
								_1('th',$,6,4).setText("Pontuação"),
								_1('th',$,7,4).setText("Tempo"),
								_1('th',$,8,4)
							],2)
						,2),
						_1('tbody',$,9,2)
					],2)).end((
						$[9].setContent(
							(function tagLoop($0) {
								var t0;
								for (let i = 0, items = iter$(self.resultados()), len = $0.taglen = items.length, res; i < len; i++) {
									res = items[i];
									(t0 = $0[i] || (t0=_1('tr',$0,i)).flag('main_table_tr').setContent([
										_1('td',t0.$,'A',t0),
										_1('td',t0.$,'B',t0),
										_1('td',t0.$,'C',t0),
										
										
										_1('td',t0.$,'D',t0).flag('table-action-destroy').setTitle('Cancelar').setContent(
											t0.$.E || _1('i',t0.$,'E','D').flag('zmdi').flag('zmdi-hc-1x').flag('zmdi-delete')
										,2)
									],2)).end((
										t0.$.A.setContent(
											(self.equipeFrom(res) || {}).nome
										,3),
										t0.$.B.setContent(
											self.pontuacaoFrom(res)
										,3),
										t0.$.C.setContent(
											self.tempoFrom(res)
										,3),
										t0.$.D.on$(0,['tap',function() { return (res).destroy(); }],self).end()
									,true));
								};return $0;
							})($[10] || _2($,10,$[9]))
						,4)
					,true))
				) : void(0)
			,3)
		,true));
	};
});

var Counter = Imba.defineTag('Counter', function(tag){
	tag.prototype.mount = function (){
		this.schedule({interval: 10});
		return mili_sec = {
			sec: 0,
			mili: 0
		};
	};
	
	tag.prototype.tick = function (){
		mili_sec.mili += 10;
		if (mili_sec.mili > 999) {
			mili_sec.sec++;
			mili_sec.mili = 0;
		};
		return this.render();
	};
	
	tag.prototype.render = function (){
		return this.$open(0).setText("" + (mili_sec.sec) + "." + (mili_sec.mili)).synced();
	};
});
