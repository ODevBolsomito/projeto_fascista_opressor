var Imba = require('imba'), _1 = Imba.createElement;
const axios = require('axios');

var State = require('../State').State;

var Login = Imba.defineTag('Login', function(tag){
	tag.prototype.email = function(v){ return this._email; }
	tag.prototype.setEmail = function(v){ this._email = v; return this; };
	tag.prototype.password = function(v){ return this._password; }
	tag.prototype.setPassword = function(v){ this._password = v; return this; };
	tag.prototype.actions = function(v){ return this._actions; }
	tag.prototype.setActions = function(v){ this._actions = v; return this; };
	tag.prototype.loading = function(v){ return this._loading; }
	tag.prototype.setLoading = function(v){ this._loading = v; return this; };
	
	tag.prototype.login = async function (){
		try {
			let response = await axios(
				{url: "http://localhost:9000/login",
				method: 'POST',
				data: {
					email: this.email(),
					password: this.password()
				}}
			);
			
			
			if (response.data) {
				State.user = response.data;
				console.log(response.headers['access-token']);
				window.sessionStorage.setItem('token',response.headers['access-token']);
				window.sessionStorage.setItem('user',JSON.stringify(State.user));
				return window.location.assign('#/competicoes');
			};
		} catch (e) {
			if (e.response) {
				return State.errors = [].concat([].slice.call(State.errors), [e.response.data]);
			};
		};
	};
	
	tag.prototype.toggle_actions = function (){
		var v_;
		return (this.setActions(v_ = !(this.actions())),v_);
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).setChildren(
			$[0] || _1('div',$,0,this).flag('login').setContent(
				$[1] || _1('div',$,1,0).flag('login__block').flag('active').setContent([
					_1('div',$,2,1).flag('login__block__header').setContent([
						_1('i',$,3,2).flag('zmdi').flag('zmdi-account-circle'),
						"Olá! Por favor entre",
						
						_1('div',$,4,2).flag('actions').flag('actions--inverse').flag('login__block__actions').on$(0,['tap','toggle_actions'],this).setContent(
							$[5] || _1('div',$,5,4).setContent([
								_1('i',$,6,5).dataset('toggle',"dropdown").flag('zmdi').flag('zmdi-more-vert').flag('actions__item'),
								_1('div',$,7,5).flag('dropdown-menu').flag('dropdown-menu-right').flag('login-actions').setContent(
									$[8] || _1('a',$,8,7).flag('dropdown-item').setText("Create an account")
								,2)
							],2)
						,2)
					],2),
					
					_1('div',$,9,1).flag('login__block__body').setContent([
						_1('div',$,10,9).flag('form-group').setContent(
							$[11] || _1('input',$,11,10).on$(0,['keypress','enter','login'],this).setType("email").flag('form-control').flag('text-center').setPlaceholder("User")
						,2),
						
						_1('div',$,12,9).flag('form-group').setContent(
							$[13] || _1('input',$,13,12).on$(0,['keypress','enter','login'],this).setType("password").flag('form-control').flag('text-center').setPlaceholder("Password")
						,2),
						
						_1('a',$,14,9).on$(0,['tap','login'],this).flag('btn').flag('btn--icon').flag('login__block__btn')
					],2)
				],2)
			,2)
		,2).synced((
			$[5].flagIf('dropdown',(!(this.actions()))).flagIf('dropdown_show',(this.actions())).end((
				$[6].end(),
				$[7].flagIf('show',(this.actions())).end((
					$[8].on$(0,['tap',function() { return window.location.assign('#/signup'); }],this)
				,true))
			,true)),
			$[11].bindData(this,'email',[]).end(),
			$[13].bindData(this,'password',[]).end(),
			$[14].setContent(
				this.loading() ? (
					($[15] || _1('i',$,15,14).flag('zmdi').flag('zmdi-spinner').flag('zmdi-hc-spin'))
				) : (
					($[16] || _1('i',$,16,14).flag('zmdi').flag('zmdi-long-arrow-right'))
				)
			,3)
		,true));
	};
})
exports.Login = Login;
