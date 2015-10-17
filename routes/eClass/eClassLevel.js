// eClassLevel

var Stack = require('./Stack.js');
var EClassFeature = require('./eClassFeature.js');

var EClassLevel = function () {
	this.level = new Stack;
	this.stackParentId = new Stack();
	this.lastFeature = undefined; // new EClassFeature(-1,0,"ROOT", "ROOT");
};

EClassLevel.prototype.setFeature = function(f) {
	if (this.lastFeature == undefined || this.lastFeature.id == f.parentId) {
		// one level below
		this.level.push(1);
		this.stackParentId.push(f.parentId);
	}
	else if (this.lastFeature.parentId == f.parentId) {
		// same level
		// increment current level
		this.level.incTop();
	}
	else {
		// higher level
		var cnt = 0;
		while (!this.stackParentId.isEmpty()  &&  this.stackParentId.top() != f.parentId) {
			this.stackParentId.pop();
			cnt++;
		}
		while (cnt > 0) {
			this.level.pop();
			cnt--;
		}
		this.level.incTop();
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
	var cnt = this.level.length;
	if (cnt != other.level.length) {
		return false;
	}
	else {
		for (var i=0; i<cnt; i++) {
			if (this.level[i] !== other.level[i]) {
				return false;
			}
		}
		// all elements are equal
		return true;
	}
};
EClassLevel.prototype.contains = function(other) {
	return this.level.contains(other.level);
}

EClassLevel.prototype.incTop = function() {
	this.level.incTop();
}

EClassLevel.prototype.asArray = function() {
	return this.level.asArray();
}

module.exports = EClassLevel;


