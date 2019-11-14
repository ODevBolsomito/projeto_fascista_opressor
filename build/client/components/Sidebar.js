var Imba = require('imba'), _1 = Imba.createElement;
var State = require('../State').State;

var Sidebar = Imba.defineTag('Sidebar', function(tag){
	
	tag.prototype.toggle = function(v){ return this._toggle; }
	tag.prototype.setToggle = function(v){ this._toggle = v; return this; };
	tag.prototype.user_actions = function(v){ return this._user_actions; }
	tag.prototype.setUser_actions = function(v){ this._user_actions = v; return this; };
	
	tag.prototype.mount = function (){
		var self = this;
		return window.onchangehash = function() { return self.render(); };
	};
	
	tag.prototype.toogle_user_actions = function (){
		var v_;
		return (this.setUser_actions(v_ = !(this.user_actions())),v_);
	};
	
	tag.prototype.logout = function (){
		State.user = false;
		window.sessionStorage.setItem('user',State.user);
		return window.location.assign('/');
	};
	
	tag.prototype.change_page = function (page){
		return window.location.assign(("/#/" + page));
	};
	
	tag.prototype.close = function (){
		return this.trigger('close');
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).setChildren([
			self.toggle() ? (($[0] || _1('div',$,0,self).on$(0,['tap','close'],self).flag('sa-backdrop'))) : void(0),
			($[1] || _1('aside',$,1,self).flag('sidebar').setContent(
				$[2] || _1('div',$,2,1).flag('scrollbar-inner').setContent([
					
					_1('div',$,3,2).flag('user').on$(0,['tap','toogle_user_actions'],self).setContent([
						_1('div',$,4,3).flag('user__info').dataset('toggle',"dropdown").setContent(
							$[5] || _1('div',$,5,4).setContent([
								_1('div',$,6,5).flag('user__data').setStyle('font-size: 15'),
								_1('div',$,7,5).flag('user__name'),
								_1('div',$,8,5).flag('user__data')
							],2)
						,2),
						
						_1('div',$,9,3).flag('dropdown-menu').setContent(
							$[10] || _1('a',$,10,9).on$(0,['tap','logout'],self).flag('dropdown-item').setText("Sair")
						,2)
					],2),
					
					_1('ul',$,11,2).flag('navigation').setContent([
						_1('li',$,12,11).setContent(
							$[13] || _1('a',$,13,12).on$(0,['tap',function() { return self.change_page('placar'); }],self).setContent([
								$[14] || _1('i',$,14,13).flag('zmdi').flag('zmdi-chart'),
								" Placar"
							],2)
						,2),
						
						_1('li',$,15,11).setContent(
							$[16] || _1('a',$,16,15).on$(0,['tap',function() { return self.change_page('equipes'); }],self).setContent([
								$[17] || _1('i',$,17,16).flag('zmdi').flag('zmdi-format-list-bulleted'),
								" Equipes"
							],2)
						,2),
						
						_1('li',$,18,11).setContent(
							$[19] || _1('a',$,19,18).on$(0,['tap',function() { return self.change_page('competicoes'); }],self).setContent([
								$[20] || _1('i',$,20,19).flag('zmdi').flag('zmdi-local-bar'),
								" Competições"
							],2)
						,2)
					],2)
				],2)
			,2)).flagIf('toggled',(self.toggle())).end((
				$[4].end((
					$[6].setContent(
						function() { try {
							return State.competicao.nome;
						} catch (e) { }; }()
					,3).end(),
					$[7].setContent(
						function() { try {
							return State.user.nome;
						} catch (e) { }; }()
					,3),
					$[8].setContent(
						function() { try {
							return State.user.email;
						} catch (e) { }; }()
					,3)
				,true)),
				$[9].flagIf('show',(self.user_actions())),
				$[12].flagIf('navigation__active',(window.location.hash == '#/placar')),
				$[15].flagIf('navigation__active',(window.location.hash == '#/equipes')),
				$[18].flagIf('navigation__active',(window.location.hash == '#/competicoes'))
			,true))
		],1).synced();
	};
})
exports.Sidebar = Sidebar;
