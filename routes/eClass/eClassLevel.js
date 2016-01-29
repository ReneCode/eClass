// eClassLevel

// var Stack = require('./Stack.js');
var EClassFeature = require('./eClassFeature.js');
/*
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
*/

var ID_UNDEFINED = -2;

var EClassLevel = function() {
	this.stackLevel = [];
	this.stackPath = []; 
	this.stackParentId = [];
	this.lastId = ID_UNDEFINED;
	this.lastParentId = ID_UNDEFINED;
}

EClassLevel.prototype.addLevel = function(f) {
	this.stackLevel.push(1);
	this.stackPath.push(f.getFeatureId());
};

EClassLevel.prototype.incTopLevel = function(f) {
	var cnt = this.stackLevel.length;
	if (cnt > 0) {
		this.stackLevel[cnt-1]++;
		this.stackPath[cnt-1] = f.getFeatureId();
	}
};

EClassLevel.prototype.addLevel = function(f) {
	this.stackLevel.push(1);
	this.stackPath.push(f.getFeatureId());
};

EClassLevel.prototype.subLevel = function(cnt) {
	while (cnt > 0) {
		this.stackLevel.pop();
		this.stackPath.pop();
        cnt--;
	}
};

EClassLevel.prototype.getFeaturePath = function() {
	return this.stackPath;
}

EClassLevel.prototype.getFullLevel = function() {
    return this.stackLevel;
}

EClassLevel.prototype.findParent = function(parentId) {
	var cnt = 0;
	while (this.stackParentId.length > 0  &&  
			this.stackParentId[this.stackParentId.length-1] != parentId) {
		this.stackParentId.pop();
		cnt++;
	}
	return cnt;
};

EClassLevel.prototype.contains = function(otherLevel) {
	// this = 1.2.3.4	   other = 1.2
	// => true
	if (this.stackLevel.length >= otherLevel.length) {
		var cnt = otherLevel.length;
		for (var i=0; i<cnt; i++) {
			if (this.stackLevel[i] != otherLevel[i]) {
				return false;
			}
		}
		// all are equal
		return true;
	}
	// other is bigger than me
	return false;
};

EClassLevel.prototype.equal = function(otherLevel) {
	var cnt = this.stackLevel.length;
	if (cnt != otherLevel.length) {
		return false;
	} 
	else {
		for (var i=0; i<cnt; i++) {
			if (this.stackLevel[i] != otherLevel[i]) {
				return false;
			}
		}
		return true;
	}
};

EClassLevel.prototype.setFeature = function(f) {
	if (this.lastId == ID_UNDEFINED ||  this.lastId == f.getParentId()) {
		this.addLevel(f);
		this.stackParentId.push(f.getParentId());
	}
	else if (this.lastParentId == f.getParentId()) {
		// same level
		this.incTopLevel();
	}
	else {
		var cnt = this.findParent(f.getParentId());
		this.subLevel(cnt);
		this.incTopLevel(f);
	}
	this.lastId = f.getId();
	this.lastParentId = f.getParentId;
};

/*
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

*/

EClassLevel.prototype.sameLevel = function(other) {
	return this.equal(other);
};


module.exports = EClassLevel;


