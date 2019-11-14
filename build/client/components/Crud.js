function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _2 = Imba.createTagList, _3 = Imba.createTagMap, _1 = Imba.createElement;
var Form = require('./Form').Form;

var Crud = Imba.defineTag('Crud', function(tag){
	tag.prototype.model = function(v){ return this._model; }
	tag.prototype.setModel = function(v){ this._model = v; return this; };
	tag.prototype.sort = function(v){ return this._sort; }
	tag.prototype.setSort = function(v){ this._sort = v; return this; };
	tag.prototype.records = function(v){ return this._records; }
	tag.prototype.setRecords = function(v){ this._records = v; return this; };
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
		this.setRecords(await this.model().all());
		return this.render();
	};
	
	tag.prototype.actionNew = function (){
		var v_;
		return (this.setTarget(v_ = new (this.model())()),v_);
	};
	
	tag.prototype.actionDestroy = async function (record){
		await record.destroy();
		return this.sync();
	};
	
	tag.prototype.actionEdit = function (record){
		this.setTarget(record);
		return this.sync();
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).setChildren([
			self.target() ? (
				($[0] || _1(Form,$,0,self).on$(0,['close','formClose'],self).on$(1,['update','sync'],self).on$(2,['create','sync'],self)).setTarget(self.target()).setModel(self.model()).end()
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
										$[12] || _1('tr',$,12,11)
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
					(" Adicionar " + (self.model().name))
				],1).end(),
				$[12].setContent([
					
					(function tagLoop($0) {
						for (let o = self.model().fields(), config, i = 0, keys = Object.keys(o), l = $0.taglen = keys.length, field; i < l; i++){
							field = keys[i];config = o[field];($0[i] || _1('th',$0,i)).setContent(
								config.human_name
							,3);
						};return $0;
					})($[13] || _2($,13,$[12])),
					$[14] || _1('th',$,14,12).flag('table-action').setContent(
						$[15] || _1('a',$,15,14).flag('zmdi').flag('zmdi-delete')
					,2),
					$[16] || _1('th',$,16,12).flag('table-action').setContent(
						$[17] || _1('a',$,17,16).flag('zmdi').flag('zmdi-edit')
					,2)
				],1),
				$[18].setContent(
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = iter$(self.records()), len = $0.taglen = items.length, record; i < len; i++) {
							record = items[i];
							(t0 = $0[i] || (t0=_1('tr',$0,i)).flag('main_table_tr')).setContent([
								(function tagLoop($0) {
									var $$ = $0.$iter();
									for (let o = self.model().fields(), config, j = 0, keys = Object.keys(o), l = keys.length, field; j < l; j++){
										field = keys[j];config = o[field];let cell = null;
										if (config.foreign_key) {
											cell = function() { try {
												return record[field][config.main_field];
											} catch (e) { }; }();
										} else {
											if (config.type == 'Date') {
												cell = function() { try {
													return self.formatDate(record[field]);
												} catch (e) { }; }();
											} else if (config.type == 'DateTime') {
												cell = function() { try {
													return self.formatDateTime(record[field]);
												} catch (e) { }; }();
											} else {
												cell = function() { try {
													return record[field];
												} catch (e) { }; }();
											};
										};
										$$.push(($0[j] || _1('td',$0,j)).on$(0,['tap',['trigger','select',record]],self).setStyle(("min-width: " + (cell && cell.length * 13) + "px")).setContent(
											cell
										,3).end());
									};return $$;
								})(t0.$['A'] || _3(t0.$,'A',$0[i])),
								(t0.$.B || _1('td',t0.$,'B',t0).flag('table-action').flag('table-action-destroy').setTitle("Excluir").setContent(
									t0.$.C || _1('a',t0.$,'C','B').flag('zmdi').flag('zmdi-delete')
								,2)).on$(0,['tap',function() { return self.actionDestroy(record); }],self).end(),
								(t0.$.D || _1('td',t0.$,'D',t0).flag('table-action').flag('table-action-update').setTitle("Editar").setContent(
									t0.$.E || _1('a',t0.$,'E','D').flag('zmdi').flag('zmdi-edit')
								,2)).on$(0,['tap',function() { return self.actionEdit(record); }],self).end()
							],1);
						};return $0;
					})($[19] || _2($,19,$[18]))
				,4)
			,true))
		],1).synced();
	};
})
exports.Crud = Crud;
