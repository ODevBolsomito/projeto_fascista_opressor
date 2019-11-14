var Imba = require('imba'), _1 = Imba.createElement;
const axios = require('axios');

var State = require('../State').State;
var Crud = require('../components/Crud').Crud;
var Competicao = require('../models/Competicao').Competicao;


var Competicoes = Imba.defineTag('Competicoes', function(tag){
	
	tag.prototype.form = function(v){ return this._form; }
	tag.prototype.setForm = function(v){ this._form = v; return this; };
	tag.prototype.list = function(v){ return this._list; }
	tag.prototype.setList = function(v){ this._list = v; return this; };
	
	tag.prototype.novaCompeticao = function (){
		return (this.setForm(true),true);
	};
	
	tag.prototype.listaCompeticao = function (){
		return (this.setList(true),true);
	};
	
	tag.prototype.render = function (){
		var self = this, $ = this.$;
		return self.$open(0).flag('main').setChildren([
			self.form() ? (
				($[0] || _1(Form,$,0,self).on$(0,['close',function() { return (self.setForm(false),false); }],self)).end()
			) : void(0),
			self.list() ? (
				($[1] || _1(List,$,1,self)).end()
			) : (
				($[2] || _1('div',$,2,self).setContent(
					$[3] || _1('div',$,3,2).flag('login').setContent(
						$[4] || _1('div',$,4,3).flag('row').setContent([
							_1('div',$,5,4).flag('col').on$(0,['tap','novaCompeticao'],self).setContent(
								$[6] || _1('div',$,6,5).flag('card').setStyle("height: 36vh;").setContent(
									$[7] || _1('div',$,7,6).flag('card-body').flag('card-body-button').setContent(
										$[8] || _1('header',$,8,7).flag('content__title').flag('card-body-button-header').setContent([
											_1('h1',$,9,8).setText("Nova competição"),
											_1('i',$,10,8).flag('zmdi').flag('zmdi-plus-circle').flag('zmdi-hc-5x')
										],2)
									,2)
								,2)
							,2),
							
							_1('div',$,11,4).flag('col').on$(0,['tap','listaCompeticao'],self).setContent(
								$[12] || _1('div',$,12,11).flag('card').setStyle("height: 36vh;").setContent(
									$[13] || _1('div',$,13,12).flag('card-body').flag('card-body-button').setContent(
										$[14] || _1('header',$,14,13).flag('content__title').flag('card-body-button-header').setContent([
											_1('h1',$,15,14).setText("Competição já cadastrada"),
											_1('i',$,16,14).flag('zmdi').flag('zmdi-view-list-alt').flag('zmdi-hc-5x')
										],2)
									,2)
								,2)
							,2)
						],2)
					,2)
				,2)).end((
					$[6].end(),
					$[12].end()
				,true))
			)
		],1).synced();
	};
})
exports.Competicoes = Competicoes;


var List = Imba.defineTag('List', function(tag){
	
	tag.prototype.selecionaCompeticao = function (comp){
		State.competicao = comp;
		window.sessionStorage.setItem('competicao',JSON.stringify(State.competicao));
		return window.location.assign('#/equipes');
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).flag('content').flag('content--full').flag('fadeIn').flag('animated').setChildren($.$ = $.$ || [
			_1('header',$,0,self).flag('content__title').setContent(
				$[1] || _1('h1',$,1,0).setText("Selecione uma competições")
			,2),
			_1(Crud,$,2,self).on$(0,['select',function(e) { return self.selecionaCompeticao(e.data()); }],self)
		],2).synced((
			$[2].setModel(Competicao).end()
		,true));
	};
});


var Form = Imba.defineTag('Form', function(tag){
	tag.prototype.create = async function (){
		State.competicao = await Competicao.create(
			{nome: this._nome}
		);
		window.sessionStorage.setItem('competicao',JSON.stringify(State.competicao));
		return window.location.assign('#/equipes');
	};
	
	tag.prototype.clickOut = function (e){
		var self = this;
		if (e.event().target.classList.contains('modal')) {
			self._closing = true;
			return Imba.setTimeout(300,function() {
				self.trigger('close');
				return self._closing = false;
			});
		};
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).setChildren(
			$[0] || _1('div',$,0,this).on$(0,['mousedown','clickOut'],this).flag('modal').flag('fadeIn').flag('animated').flag('show').setStyle("display: block;").setContent(
				$[1] || _1('div',$,1,0).flag('modal-dialog').setContent(
					$[2] || _1('div',$,2,1).flag('modal-content').flag('model-form-content').flag('animated').flag('fadeInUp').setContent([
						_1('div',$,3,2).flag('modal-header').setContent(
							$[4] || _1('h5',$,4,3).flag('modal-title').setText('Nova competição')
						,2),
						
						_1('div',$,5,2).flag('modal-body').setContent(
							$[6] || _1('form',$,6,5).setContent(
								$[7] || _1('div',$,7,6).flag('form-row').setContent(
									$[8] || _1('div',$,8,7).flag('col').setContent(
										$[9] || _1('div',$,9,8).flag('form-group').setContent(
											$[10] || _1('input',$,10,9).on$(0,['keydown','esc',['trigger','close']],this).setAutofocus('autofocus').flag('form-control').flag('form-control-lg').setPlaceholder('nome')
										,2)
									,2)
								,2)
							,2)
						,2),
						
						_1('div',$,11,2).flag('modal-footer').setContent(
							$[12] || _1('button',$,12,11).setType("button").flag('btn').flag('btn-link').on$(0,['tap','create'],this)
						,2)
					],2)
				,2)
			,2)
		,2).synced((
			$[0].end((
				$[2].flagIf('fadeOutDown',(this._closing)).end((
					$[6].end((
						$[10].bindData(this,'_nome').end()
					,true)),
					$[12].setContent([
						this._loading ? (
							($[13] || _1('i',$,13,12).flag('zmdi').flag('zmdi-spinner').flag('zmdi-hc-spin'))
						) : void(0),
						' Criar'
					],1).end()
				,true))
			,true))
		,true));
	};
});
