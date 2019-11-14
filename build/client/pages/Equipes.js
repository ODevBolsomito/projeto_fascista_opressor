function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _2 = Imba.createTagList, _1 = Imba.createElement;
var Equipe = require('../models/Equipe').Equipe;
var State = require('../State').State;

var Equipes = Imba.defineTag('Equipes', function(tag){
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).flag('fadeIn').flag('animated').setChildren($.$ = $.$ || [
			_1('header',$,0,this).flag('content__title').setContent(
				$[1] || _1('h1',$,1,0).setText("Equipes")
			,2),
			_1(Crud,$,2,this)
		],2).synced((
			$[2].end()
		,true));
	};
})
exports.Equipes = Equipes;

var Crud = Imba.defineTag('Crud', function(tag){
	tag.prototype.sort = function(v){ return this._sort; }
	tag.prototype.setSort = function(v){ this._sort = v; return this; };
	tag.prototype.equipes = function(v){ return this._equipes; }
	tag.prototype.setEquipes = function(v){ this._equipes = v; return this; };
	tag.prototype.target = function(v){ return this._target; }
	tag.prototype.setTarget = function(v){ this._target = v; return this; };
	
	tag.prototype.mount = function (){
		return this.sync();
	};
	
	tag.prototype.formClose = function (){
		var v_;
		return (this.setTarget(null),null);
	};
	
	tag.prototype.sync = async function (){
		this.setEquipes(await Equipe.all());
		return this.render();
	};
	
	tag.prototype.actionNew = function (){
		var v_;
		return (this.setTarget(v_ = new Equipe({competicaoId: State.competicao.id})),v_);
	};
	
	tag.prototype.actionDestroy = async function (record){
		await record.destroy();
		return this.sync();
	};
	
	tag.prototype.actionEdit = function (record){
		return (this.setTarget(record),record);
	};
	
	tag.prototype.select = function (rec){
		return this.trigger('select',rec);
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).setChildren([
			self.target() ? (
				($[0] || _1(Form,$,0,self).on$(0,['close','formClose'],self).on$(1,['update','sync'],self).on$(2,['create','sync'],self)).setTarget(self.target()).end()
			) : void(0),
			($[1] || _1('header',$,1,self).flag('content__title').setContent(
				$[2] || _1('h1',$,2,1)
			,2)).end((
				$[2].setContent(
					self.title()
				,3)
			,true)),
			($[3] || _1('div',$,3,self).flag('card').setContent(
				$[4] || _1('div',$,4,3).flag('card-body').setContent(
					$[5] || _1('div',$,5,4).flag('table-responsive').setContent(
						$[6] || _1('div',$,6,5).setId('data-table_wrapper').flag('dataTables_wrapper').flag('no-footer').setContent([
							_1('button',$,7,6).setType("button").flag('btn').flag('btn-link').flag('button-add-record').on$(0,['tap','actionNew'],self),
							_1('div',$,9,6).flag('table-content').setContent(
								$[10] || _1('table',$,10,9).flag('table').flag('dataTable').setContent([
									_1('thead',$,11,10).setContent(
										$[12] || _1('tr',$,12,11).setContent([
											_1('th',$,13,12).setText("Nome"),
											_1('th',$,14,12).flag('table-action').setContent(
												$[15] || _1('a',$,15,14).flag('zmdi').flag('zmdi-delete')
											,2),
											_1('th',$,16,12).flag('table-action').setContent(
												$[17] || _1('a',$,17,16).flag('zmdi').flag('zmdi-edit')
											,2)
										],2)
									,2),
									_1('tbody',$,18,10)
								],2)
							,2)
						],2)
					,2)
				,2)
			,2)).end((
				$[7].setContent([
					$[8] || _1('i',$,8,7).flag('zmdi').flag('zmdi-plus'),
					(" Adicionar " + (Equipe.name))
				],1).end(),
				$[18].setContent(
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = iter$(self.equipes()), len = $0.taglen = items.length, equipe; i < len; i++) {
							equipe = items[i];
							(t0 = $0[i] || (t0=_1('tr',$0,i)).flag('main_table_tr').setContent([
								_1('td',t0.$,'A',t0),
								_1('td',t0.$,'B',t0).flag('table-action').flag('table-action-destroy').setTitle("Excluir").setContent(
									t0.$.C || _1('a',t0.$,'C','B').flag('zmdi').flag('zmdi-delete')
								,2),
								_1('td',t0.$,'D',t0).flag('table-action').flag('table-action-update').setTitle("Editar").setContent(
									t0.$.E || _1('a',t0.$,'E','D').flag('zmdi').flag('zmdi-edit')
								,2)
							],2)).on$(0,['tap',['select',equipe]],self).end((
								t0.$.A.setContent(
									equipe.nome
								,3),
								t0.$.B.on$(0,['tap',['actionDestroy',equipe]],self).end(),
								t0.$.D.on$(0,['tap',['actionEdit',equipe]],self).end()
							,true));
						};return $0;
					})($[19] || _2($,19,$[18]))
				,4)
			,true))
		],1).synced();
	};
});

var Form = Imba.defineTag('Form', function(tag){
	tag.prototype.target = function(v){ return this._target; }
	tag.prototype.setTarget = function(v){ this._target = v; return this; };
	tag.prototype.action = function(v){ return this._action; }
	tag.prototype.setAction = function(v){ this._action = v; return this; };
	tag.prototype.loading = function(v){ return this._loading; }
	tag.prototype.setLoading = function(v){ this._loading = v; return this; };
	tag.prototype.__errors = {'default': {},name: 'errors'};
	tag.prototype.errors = function(v){ return this._errors; }
	tag.prototype.setErrors = function(v){ this._errors = v; return this; }
	tag.prototype._errors = {};
	
	tag.prototype.close_modal = function (){
		var self = this;
		self._closing = true;
		return Imba.setTimeout(500,function() {
			self.setTarget(null);
			self._closing = false;
			return self.trigger('close');
		});
	};
	
	tag.prototype.clickOut = function (e){
		if (e.event().target.classList.contains('modal')) {
			return this.close_modal();
		};
	};
	
	tag.prototype.submit = async function (){
		this.setLoading(true);
		if (this.target().id) {
			this.trigger('update',(await this.target().save()));
		} else {
			this.trigger('create',(await this.target().save()));
		};
		this.setLoading(false);
		return this.close_modal();
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).setChildren(
			$[0] || _1('div',$,0,this).on$(0,['mousedown','clickOut'],this).flag('modal').flag('fadeIn').flag('animated').flag('show').setStyle("display: block;").setContent(
				$[1] || _1('div',$,1,0).flag('modal-dialog').setContent(
					$[2] || _1('div',$,2,1).flag('modal-content').flag('model-form-content').flag('animated').flag('fadeInUp').setContent([
						_1('div',$,3,2).flag('modal-header').setContent(
							$[4] || _1('h5',$,4,3).flag('modal-title')
						,2),
						_1('div',$,5,2).flag('modal-body').setContent(
							$[6] || _1('div',$,6,5).flag('card').setContent(
								$[7] || _1('div',$,7,6).flag('card-body').setContent(
									$[8] || _1('form',$,8,7).on$(0,['submit','prevent'],this).setContent(
										$[9] || _1('div',$,9,8).flag('form-row').setContent(
											$[10] || _1('div',$,10,9).flag('col').setContent(
												$[11] || _1('div',$,11,10).flag('form-group')
											,2)
										,2)
									,2)
								,2)
							,2)
						,2),
						_1('div',$,15,2).flag('modal-footer').setContent([
							_1('button',$,16,15).setType("button").flag('btn').flag('btn-link').on$(0,['tap','submit'],this),
							_1('button',$,18,15).setType("button").flag('btn').flag('btn-link').on$(0,['tap','close_modal'],this).setText('Cancelar')
						],2)
					],2)
				,2)
			,2)
		,2).synced((
			$[0].end((
				$[2].flagIf('fadeOutDown',(this._closing)).end((
					$[4].setContent(
						(this.target().id ? 'Atualizar ' : 'Criar ') + "Equipe"
					,3),
					$[8].end((
						$[11].setContent([
							($[12] || _1('label',$,12,11).setText("Nome")),
							($[13] || _1('input',$,13,11).flag('form-control').flag('form-control-lg').setPlaceholder("Nome").setType("text")).bindData(this.target(),'nome').end(),
							
							this.errors().nome ? (
								($[14] || _1('small',$,14,11).flag('validation-error')).setContent(
									this.errors().nome
								,3)
							) : void(0)
						],1)
					,true)),
					$[16].setContent([
						this.target().id ? 'Atualizar ' : 'Criar ',
						this.loading() ? (
							($[17] || _1('i',$,17,16).flag('zmdi').flag('zmdi-spinner').flag('zmdi-hc-spin'))
						) : void(0)
					],1).end(),
					$[18].end()
				,true))
			,true))
		,true));
	};
});
