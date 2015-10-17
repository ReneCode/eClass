// eClassLevel

var Stack = require('./Stack.js');
var EClassFeature = require('./eClassFeature.js');

var EClassLevel = function (src) {
	if (!(this instanceof EClassLevel)) {
		return new EClassLevel();
	}
	// basis-init aufrufen !!
	this.init();
//	this.level = new Stack;
	this.stackParentId = new Stack();
	this.lastFeature = undefined; // new EClassFeature(-1,0,"ROOT", "ROOT");
};

EClassLevel.prototype = new Stack();
EClassLevel.prototype.constructor = EClassLevel;

EClassLevel.prototype.setFeature = function(f) {
	if (this.lastFeature == undefined || this.lastFeature.id == f.parentId) {
		// one level below
		this.push(1);
		this.stackParentId.push(f.parentId);
	}
	else if (this.lastFeature.parentId == f.parentId) {
		// same level
		// increment current level
		this.incTop();
	}
	else {
		// higher level
		var cnt = 0;
		while (!this.stackParentId.isEmpty()  &&  this.stackParentId.top() != f.parentId) {
			this.stackParentId.pop();
			cnt++;
		}
		while (cnt > 0) {
			this.pop();
			cnt--;
		}
		this.incTop();
	}

	// only copy that properties
	if (this.lastFeature == undefined)
	{
		this.lastFeature = {};
	}
	this.lastFeature.id = f.id;
	this.lastFeature.parentId = f.parentId;
};


EClassLevel.prototype.sameLevel = function(other) {
	return this.equal(other);
};


module.exports = EClassLevel;


