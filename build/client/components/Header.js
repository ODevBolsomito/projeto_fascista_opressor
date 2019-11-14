var Imba = require('imba'), _1 = Imba.createElement;
var Header = Imba.defineTag('Header', function(tag){
	tag.prototype.mount = function (){
		var self = this;
		return window.addEventListener('scroll',function() { return self.render(); });
	};
	
	tag.prototype.unmount = function (){
		var self = this;
		return window.removeEventListener('scroll',function() { return self.render(); });
	};
	
	tag.prototype.toggle_sidebar = function (){
		return this.trigger('toggle_sidebar');
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).setChildren(
			$[0] || _1('header',$,0,this).flag('header').setContent([
				_1('div',$,1,0).flag('navigation-trigger').flag('hidden-xl-up').on$(0,['tap','toggle_sidebar'],this).setContent(
					$[2] || _1('i',$,2,1).flag('zmdi').flag('zmdi-menu')
				,2),
				
				_1('div',$,3,0).flag('logo').flag('hidden-sm-down').setContent(
					$[4] || _1('h1',$,4,3).setContent(
						$[5] || _1('a',$,5,4).setText("CCDC")
					,2)
				,2)
			],2)
		,2).synced((
			$[0].flagIf('header--scrolled',(window.scrollY))
		,true));
	};
})
exports.Header = Header;
