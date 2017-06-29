//闭包的应用1
for (var i = 0; i < 5; i++) {
	(function(i) {
		setTimeout(function() {
			console.log(i)
		}, i * 1000)
	})(i);
}
//闭包的应用2
function a() {
	var b = 1;
	var c = function() {
		console.log(b);
	};
	return c;
};
var d = a();
d();
//闭包的应用3
function f1() {
	var n = 999;
	nAdd = function() {
		n += 1
	};
	function f2() {
		alert(n)
	};
	return f2;
};
var result = f1();
result();
nAdd();
result();
//闭包的应用4
var name = "meimei";
function Private() {
	var name = "leilei";
	return {
		getName : function() {
			console.log(name);
		},
		setName: function(val) {
			name = val;
		}
	}
};
var private = Private();
private.getName();
private.setName("Eric");
private.getName();

//-------------原型
function person(name, age) {
	this.name = name;
	this.age = age
};
person.prototype.say = function() {
	console.log(this.name + ":" + this.age);
};
//继承1
function superman (name, age) {
	person.call(this, name, age);
};
//继承2
superman.prototype = new person();
superman.prototype.fight = function() {
	this.say();
	console.log("fighting");
}
var s = new superman('Eric', 29);
s.fight();

var Demo = function(name) {
	this.name = name;
	this.init()
};
Demo.prototype = {
	getName: function() {
		return "SB";
	},
	setName: function(str) {
		return str + this.getName();
	},
	init: function() {
		alert(this.setName(this.name));
		this.bindEvent();
	},
	bindEvent: function(){}
};
var SD = new Demo("sd");

SD.setName("gogo");
