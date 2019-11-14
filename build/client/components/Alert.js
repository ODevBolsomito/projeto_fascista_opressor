function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _1 = Imba.createElement;
// ==== Fade In

// bounceIn
// bounceInDown
// bounceInLeft
// bounceInRight
// bounceInUp
// fadeIn
// fadeInDown
// fadeInDownBig
// fadeInLeft
// fadeInLeftBig
// fadeInRight
// fadeInRightBig
// fadeInUp
// fadeInUpBig
// flipInX
// flipInY
// lightSpeedIn
// rotateIn
// rotateInDownLeft
// rotateInDownRight
// rotateInUpLeft
// rotateInUpRight
// rollIn
// zoomIn
// zoomInDown
// zoomInLeft
// zoomInRight
// zoomInUp
// slideInDown
// slideInLeft
// slideInRight
// slideInUp

// ==== Fade Out

// bounceOut
// bounceOutDown
// bounceOutLeft
// bounceOutRight
// bounceOutUp
// fadeOut
// fadeOutDown
// fadeOutDownBig
// fadeOutLeft
// fadeOutLeftBig
// fadeOutRight
// fadeOutRightBig
// fadeOutUp
// fadeOutUpBig
// flipOutX
// flipOutY
// lightSpeedOut
// rotateOut
// rotateOutDownLeft
// rotateOutDownRight
// rotateOutUpLeft
// rotateOutUpRight
// rollOut
// zoomOut
// zoomOutDown
// zoomOutLeft
// zoomOutRight
// zoomOutUp
// slideOutDown
// slideOutLeft
// slideOutRight
// slideOutUp

// === Positions

// top
// top-left
// top-right
// bottom
// bottom-left
// bottom-right


var count = 0;
var y_position = [15];

var Alert = Imba.defineTag('Alert', function(tag){
	
	tag.prototype.fading = function(v){ return this._fading; }
	tag.prototype.setFading = function(v){ this._fading = v; return this; };
	tag.prototype.step = function(v){ return this._step; }
	tag.prototype.setStep = function(v){ this._step = v; return this; };
	tag.prototype.top = function(v){ return this._top; }
	tag.prototype.setTop = function(v){ this._top = v; return this; };
	tag.prototype.bottom = function(v){ return this._bottom; }
	tag.prototype.setBottom = function(v){ this._bottom = v; return this; };
	tag.prototype.index = function(v){ return this._index; }
	tag.prototype.setIndex = function(v){ this._index = v; return this; };
	tag.prototype.life = function(v){ return this._life; }
	tag.prototype.setLife = function(v){ this._life = v; return this; };
	tag.prototype.position = function(v){ return this._position; }
	tag.prototype.setPosition = function(v){ this._position = v; return this; };
	tag.prototype.fade_out = function(v){ return this._fade_out; }
	tag.prototype.setFade_out = function(v){ this._fade_out = v; return this; };
	tag.prototype.fade_in = function(v){ return this._fade_in; }
	tag.prototype.setFade_in = function(v){ this._fade_in = v; return this; };
	tag.prototype.type = function(v){ return this._type; }
	tag.prototype.setType = function(v){ this._type = v; return this; };
	
	tag.prototype.build = function (){
		y_position[count + 1] = count * 70 + 15;
		count++;
		this._index = count;
		this._step = 0;
		return this._fade_out = false;
	};
	
	tag.prototype.mount = function (){
		this._life = this.data().life || 5000;
		this._position = this.data().position || "top-right";
		this._fade_out = this.data().fade_out || "slideOutUp";
		this._fade_in = this.data().fade_in || "slideInDown";
		this._type = this.data().type;
		
		if (this.position().includes("top")) {
			this.setTop((this.index() === 1) ? 15 : (this.index() * 70 - 55));
			this.setBottom(false);
		};
		if (this.position().includes("bottom")) {
			this.setBottom((this.index() === 1) ? 15 : (this.index() * 70 - 55));
			this.setTop(false);
		};
		
		return this.schedule({interval: 1});
	};
	
	tag.prototype.unmount = function (){
		if (this.index() == count) {
			count = 0;
		};
		this.dequeue();
		return this.unschedule();
	};
	
	tag.prototype.dequeue = function (){
		var self = this;
		y_position = y_position.map(function(y,i) {
			return (i > self.index()) ? (y - 70) : y;
		});
		
		let res = [];
		for (let i = 0, items = iter$(y_position), len = items.length, y; i < len; i++) {
			y = items[i];
			if (i > 1 && y > 15) { break; };
			res.push((y_position.length - 1 == i) && (
				y_position = [15]
			));
		};
		return res;
	};
	
	tag.prototype.tick = function (){
		var v_;
		if (this.step() == parseInt(this.life() / 4)) {
			this.setFading(true);
			this.unmount();
		};
		
		((this.setStep(v_ = this.step() + 1),v_)) - 1;
		return this.render();
	};
	
	tag.prototype.close = function (){
		this.setFading(true);
		return this.unmount();
	};
	
	tag.prototype.render = function (){
		var $ = this.$;
		return this.$open(0).flag('alert').flag('alert--notify').flag('animated').flag('alert-dismissible').flag('alert-inverse').setFlag(-1,("alert-" + this.position())).setFlag(-2,this.fading() && this.fade_out()).setFlag(-3,this.fade_in()).setFlag(-4,this.type() && (("alert-" + this.type()))).setStyle(("" + (this.top() ? (("top: " + this.top() + "px")) : (("bottom: " + this.bottom() + "px"))))).setChildren($.$ = $.$ || [
			_1('span',$,0,this).dataset('notify',"message"),
			_1('a',$,1,this).setContent(
				$[2] || _1('button',$,2,1).flag('close').flag('btn').flag('btn-sm').flag('btn-light').setType("button").setContent(
					$[3] || _1('span',$,3,2).on$(0,['tap','close'],this).setText("×")
				,2)
			,2)
		],2).synced((
			$[0].setContent(
				this.data().message
			,3).end(),
			$[2].end()
		,true));
	};
})
exports.Alert = Alert;
