function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = require('imba'), _3 = Imba.createTagList, _2 = Imba.createTagMap, _1 = Imba.createElement;
var Search = Imba.defineTag('Search', 'input', function(tag){
	tag.prototype.mount = function (){
		return this.dom().focus();
	};
	
	tag.prototype.render = function (){
		return this.$open(0).synced();
	};
});

var Option = Imba.defineTag('Option', 'li', function(tag){
	tag.prototype.ariaSelected = function(v){ return this.getAttribute('aria-selected'); }
	tag.prototype.setAriaSelected = function(v){ this.setAttribute('aria-selected',v); return this; };
	tag.prototype.value = function(v){ return this._value; }
	tag.prototype.setValue = function(v){ this._value = v; return this; };
	tag.prototype.name = function(v){ return this._name; }
	tag.prototype.setName = function(v){ this._name = v; return this; };
	tag.prototype.__mouse_over = {'default': false,name: 'mouse_over'};
	tag.prototype.mouse_over = function(v){ return this._mouse_over; }
	tag.prototype.setMouse_over = function(v){ this._mouse_over = v; return this; }
	tag.prototype._mouse_over = false;
	tag.prototype.__selected = {'default': false,name: 'selected'};
	tag.prototype.selected = function(v){ return this._selected; }
	tag.prototype.setSelected = function(v){ this._selected = v; return this; }
	tag.prototype._selected = false;
	
	
	tag.prototype.mount = function (){
		var v_;
		return (this.setAriaSelected(v_ = ("" + this.selected())),v_);
	};
	
	tag.prototype.onmouseover = function (){
		return (this.setMouse_over(true),true);
	};
	
	tag.prototype.onmouseout = function (){
		return (this.setMouse_over(false),false);
	};
	
	tag.prototype.render = function (){
		return this.$open(0).flag('select2-results__option').flagIf('select2-results__option--highlighted',(this.mouse_over() || this.selected())).setChildren(
			this.name()
		,3).synced();
	};
});


var Select = Imba.defineTag('Select', function(tag){
	tag.prototype.multiple = function(v){ return this.getAttribute('multiple'); }
	tag.prototype.setMultiple = function(v){ this.setAttribute('multiple',v); return this; };
	tag.prototype['default'] = function(v){ return this._default; }
	tag.prototype.setDefault = function(v){ this._default = v; return this; };
	tag.prototype.options = function(v){ return this._options; }
	tag.prototype.setOptions = function(v){ this._options = v; return this; };
	tag.prototype.values = function(v){ return this._values; }
	tag.prototype.setValues = function(v){ this._values = v; return this; };
	tag.prototype.selection = function(v){ return this._selection; }
	tag.prototype.setSelection = function(v){ this._selection = v; return this; };
	tag.prototype.placeholder = function(v){ return this._placeholder; }
	tag.prototype.setPlaceholder = function(v){ this._placeholder = v; return this; };
	tag.prototype.show_dropdown = function(v){ return this._show_dropdown; }
	tag.prototype.setShow_dropdown = function(v){ this._show_dropdown = v; return this; };
	tag.prototype.default_value = function(v){ return this._default_value; }
	tag.prototype.setDefault_value = function(v){ this._default_value = v; return this; };
	tag.prototype.onchange = function(v){ return this._onchange; }
	tag.prototype.setOnchange = function(v){ this._onchange = v; return this; };
	tag.prototype.boundings = function(v){ return this._boundings; }
	tag.prototype.setBoundings = function(v){ this._boundings = v; return this; };
	tag.prototype.__filter = {'default': '',name: 'filter'};
	tag.prototype.filter = function(v){ return this._filter; }
	tag.prototype.setFilter = function(v){ this._filter = v; return this; }
	tag.prototype._filter = '';
	
	tag.prototype.mount = function (){
		var v_;
		this.setSelection(this.default_value());
		return (this.setBoundings(v_ = this.dom().getBoundingClientRect()),v_);
	};
	
	tag.prototype.toggle_dropdown = function (){
		let els = document.getElementsByClassName('select-backdrop');
		Array.from(els).forEach(function(el) {
			return el.click();
		});
		this.setShow_dropdown(!(this.show_dropdown()));
		return this.render();
	};
	
	tag.prototype.selectOption = function (val){
		var selection_, v_;
		if (this.multiple()) {
			(selection_ = this.selection()) || ((this.setSelection(v_ = []),v_));
			if (this.selection().includes(val)) {
				var index = this.selection().indexOf(val);
				if ((index !== -1)) { this.selection().splice(index,1) };
			} else {
				this.selection().push(val);
			};
		} else {
			this.setSelection(val);
		};
		this.trigger('change',this.selection());
		
		return (this.setShow_dropdown(false),false);
	};
	
	tag.prototype.checkSelection = function (val){
		if (this.multiple()) {
			return this.selection().includes(val);
		} else {
			return this.selection() == val;
		};
	};
	
	tag.prototype.changeFilter = function (e){
		var v_;
		return (this.setFilter(v_ = e.event().target.value),v_);
	};
	
	tag.prototype.matchFilter = function (opt){
		return opt && opt.toString().toLowerCase().includes(this.filter().toLowerCase());
	};
	
	tag.prototype.closeDropdown = function (e){
		if (e.event().target.classList.contains('select-backdrop')) {
			let els = document.getElementsByClassName('select-backdrop');
			this.setShow_dropdown(false);
			return Array.from(els).forEach(function(el) {
				return el.click();
			});
		};
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		if (!(self.options())) { return };
		return self.$open(0).setChildren([
			($[0] || _1('span',$,0,self).on$(0,['tap','toggle_dropdown'],self).flag('select2').flag('select2-container').flag('select2-container--default').flag('select2-container--below').flag('select2-container--focus').setStyle("width: 100%;").setContent([
				_1('span',$,1,0).flag('selection').setContent(
					$[2] || _1('span',$,2,1).flag('select2-selection').flag('select2-selection--single').setContent([
						_1('span',$,3,2).flag('select2-selection__rendered').setId('select2-wfcr-container').setTitle("Scion"),
						_1('span',$,4,2).flag('select2-selection__arrow').setRole("presentation").setContent(
							$[5] || _1('b',$,5,4).setRole("presentation")
						,2)
					],2)
				,2),
				_1('span',$,6,0).flag('dropdown-wrapper')
			],2)).end((
				$[3].setContent(
					self.options()[self.values().indexOf(self.selection() || self.default_value())] || (self.default() && self.default().name) || self.placeholder() || "Selecione"
				,3).end(),
				$[4].end((
					$[5].end()
				,true))
			,true)),
			
			self.show_dropdown() ? Imba.static([
				($[7] || _1('div',$,7,self).flag('select-backdrop').on$(0,['tap','closeDropdown'],self)),
				($[8] || _1('span',$,8,self).flag('select2-container').flag('select2-container--default').flag('select2-container--open').setContent(
					$[9] || _1('span',$,9,8).flag('select2-dropdown').flag('select2-dropdown--below').setContent([
						_1('span',$,10,9).flag('select2-search').flag('select2-search--dropdown').setContent(
							$[11] || _1(Search,$,11,10).on$(0,['keyup','changeFilter'],self).flag('select2-search__field')
						,2),
						_1('span',$,12,9).flag('select2-results').setContent(
							$[13] || _1('ul',$,13,12).flag('select2-results__options')
						,2)
					],2)
				,2)).setStyle(("position: absolute; top: " + (self.dom().offsetTop + self.boundings().height) + "px; left: " + (self.dom().offsetLeft) + "px;")).end((
					$[9].setStyle(("width: auto; min-width: " + (self.boundings().width) + "px; position: relative;")).end((
						$[11].end(),
						$[13].setContent([
							self.default() ? (
								($[14] || _1(Option,$,14,13).on$(0,['tap',function() { return self.selectOption(null); }],self)).setName((self.default().name)).setValue((self.default().value),1).setSelected((self.checkSelection(null))).end()
							) : void(0),
							(function tagLoop($0) {
								var $$ = $0.$iter();
								for (let i = 0, items = iter$(self.options()), len = items.length, opt; i < len; i++) {
									opt = items[i];
									if (self.matchFilter(opt)) {
										$$.push(($0[i] || _1(Option,$0,i)).setName((opt)).setValue((self.values()[i]),1).setSelected((self.checkSelection(self.values()[i]))).on$(0,['tap',function() { return self.selectOption(self.values()[i]); }],self).end());
									};
								};return $$;
							})($[15] || _2($,15,$[13]))
						],1)
					,true))
				,true))
			],2,1) : void(0)
		],1).synced();
	};
})
exports.Select = Select;


