function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _2 = Imba.createTagList, _1 = Imba.createElement;
var State = require('./State').State;

var Login = require('./pages/Login').Login;
var Signup = require('./pages/Signup').Signup;
var Competicoes = require('./pages/Competicoes').Competicoes;

var Resultados = require('./pages/Resultados').Resultados;
var Equipes = require('./pages/Equipes').Equipes;

var Sidebar = require('./components/Sidebar').Sidebar;
var Header = require('./components/Header').Header;
var Alert = require('./components/Alert').Alert;

var App = Imba.defineTag('App', function(tag){
	tag.prototype.handle_url = function (url){
		if (State.user) {
			return window.location.assign('#' + url.replace(/\#/g,''));
		} else if (url != '#/signup') {
			return window.location.assign('#/login');
		};
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		self.handle_url(window.location.hash);
		return self.$open(0).flag('app').setStyle(("min-height: " + (window.innerHeight) + ";background-image: url(img/bg.jpg); background-size: cover; background-repeat: no-repeat;background-attachment: fixed;")).setChildren( // 👎
			$[0] || _1('main',$,0,self).flag('main')
		,2).synced((
			$[0].setContent([
				(function tagLoop($0) {
					for (let i = 0, items = iter$(State.errors), len = $0.taglen = items.length; i < len; i++) {
						($0[i] || _1(Alert,$0,i)).setData({
							message: items[i],
							position: "top-right",
							fade_out: "fadeOutRight",
							fade_in: "bounceIn",
							type: "danger"
						}).end();
					};return $0;
				})($[1] || _2($,1,$[0])),
				(function tagLoop($0) {
					for (let i = 0, items = iter$(State.success), len = $0.taglen = items.length; i < len; i++) {
						($0[i] || _1(Alert,$0,i)).setData({
							message: items[i],
							position: "top-right",
							fade_out: "fadeOutRight",
							fade_in: "bounceIn",
							type: "success"
						}).end();
					};return $0;
				})($[2] || _2($,2,$[0])),
				(window.location.hash == "#/login") ? (
					($[3] || _1(Login,$,3,0)).end()
				) : ((window.location.hash == "#/signup") ? (
					($[4] || _1(Signup,$,4,0)).end()
				) : ((window.location.hash == "#/competicoes") ? (
					($[5] || _1(Competicoes,$,5,0)).end()
				) : Imba.static([
					($[6] || _1(Header,$,6,0).on$(0,['toggle_sidebar',function() { return self._sidebar = !self._sidebar; }],self)).end(),
					($[7] || _1(Sidebar,$,7,0).on$(0,['close',function() { return self._sidebar = false; }],self)).setToggle(self._sidebar).end(),
					($[8] || _1('section',$,8,0).flag('content')).setContent([
						['#/','#/placar'].includes(window.location.hash) ? (($[9] || _1(Resultados,$,9,8)).end()) : void(0),
						['#/equipes'].includes(window.location.hash) ? (($[10] || _1(Equipes,$,10,8)).end()) : void(0)
					],1)
				],2,1)))
			],1)
		,true));
	};
});

Imba.mount((_1(App)).end());
