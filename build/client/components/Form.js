var Imba = require('imba'), _2 = Imba.createTagList, _1 = Imba.createElement;
var Form = Imba.defineTag('Form', function(tag){
	tag.prototype.target = function(v){ return this._target; }
	tag.prototype.setTarget = function(v){ this._target = v; return this; };
	tag.prototype.model = function(v){ return this._model; }
	tag.prototype.setModel = function(v){ this._model = v; return this; };
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
		var $ = this.$, self = this;
		return self.$open(0).setChildren(
			$[0] || _1('div',$,0,self).on$(0,['mousedown','clickOut'],self).flag('modal').flag('fadeIn').flag('animated').flag('show').setStyle("display: block;").setContent(
				$[1] || _1('div',$,1,0).flag('modal-dialog').setContent(
					$[2] || _1('div',$,2,1).flag('modal-content').flag('model-form-content').flag('animated').flag('fadeInUp').setContent([
						_1('div',$,3,2).flag('modal-header').setContent(
							$[4] || _1('h5',$,4,3).flag('modal-title')
						,2),
						_1('div',$,5,2).flag('modal-body').setContent(
							$[6] || _1('div',$,6,5).flag('card').setContent(
								$[7] || _1('div',$,7,6).flag('card-body').setContent(
									$[8] || _1('form',$,8,7).on$(0,['submit','prevent'],self)
								,2)
							,2)
						,2),
						_1('div',$,10,2).flag('modal-footer').setContent([
							_1('button',$,11,10).setType("button").flag('btn').flag('btn-link').on$(0,['tap','submit'],self),
							_1('button',$,13,10).setType("button").flag('btn').flag('btn-link').on$(0,['tap','close_modal'],self).setText('Cancelar')
						],2)
					],2)
				,2)
			,2)
		,2).synced((
			$[0].end((
				$[2].flagIf('fadeOutDown',(self._closing)).end((
					$[4].setContent(
						(self.target().id ? 'Atualizar ' : 'Criar ') + ("" + (self.model().name))
					,3),
					$[8].setContent(
						(function tagLoop($0) {
							var t0;
							for (let o = self.model().inputs(), col_config, i = 0, keys = Object.keys(o), l = $0.taglen = keys.length, col_name; i < l; i++){
								col_name = keys[i];col_config = o[col_name];(t0 = $0[i] || (t0=_1('div',$0,i)).flag('form-row').setContent(
									t0.$.A || _1('div',t0.$,'A',t0).flag('col').setContent(
										t0.$.B || _1('div',t0.$,'B','A').flag('form-group')
									,2)
								,2)).end((
									t0.$.B.setContent([
										(t0.$.C || _1('label',t0.$,'C','B')).setContent(
											col_config.human_name
										,3),
										(self.model().inputs()[col_name].type == 'String') ? (
											(t0.$.D || _1('input',t0.$,'D','B').flag('form-control').flag('form-control-lg').setType("text")).bindData(self.target(),col_name).setPlaceholder(col_config.human_name).end()
										) : ((self.model().inputs()[col_name].type == 'Number') ? (
											(t0.$.E || _1('input',t0.$,'E','B').flag('form-control').flag('form-control-lg').setType("number")).bindData(self.target(),col_name).setPlaceholder(col_config.human_name).end()
										) : ((self.model().inputs()[col_name].type == 'Password') ? (
											(t0.$.F || _1('input',t0.$,'F','B').flag('form-control').flag('form-control-lg').setType("password")).bindData(self.target(),col_name).setPlaceholder(col_config.human_name).end()
										) : void(0))),
										// elif model.inputs[col_name]:foreign_key
										//     <Select 
										//         :change=(do |e| selectOption(e, model.inputs[col_name]:foreign_key)) 
										//         options=(nested_options[col].map do |rec| rec[model.inputs[col_name]:main_field]) 
										//         values=(nested_options[col].map do |rec| rec:id)
										//         selection=( target[model.inputs[col_name]:foreign_key] )
										//     >
										
										self.errors()[col_name] ? (
											(t0.$.G || _1('small',t0.$,'G','B').flag('validation-error')).setContent(
												self.errors()[col_name]
											,3)
										) : void(0)
									],1)
								,true));
							};return $0;
						})($[9] || _2($,9,$[8]))
					,4).end(),
					$[11].setContent([
						self.target().id ? 'Atualizar ' : 'Criar ',
						self.loading() ? (
							($[12] || _1('i',$,12,11).flag('zmdi').flag('zmdi-spinner').flag('zmdi-hc-spin'))
						) : void(0)
					],1).end(),
					$[13].end()
				,true))
			,true))
		,true));
	};
})
exports.Form = Form;
