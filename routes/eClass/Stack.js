// Stack

var Stack = function() {
	this.level = [];
};

Stack.prototype.push = function(v) {
	this.level.push(v);
};

Stack.prototype.pop = function() {
	this.level.pop();
};

Stack.prototype.top = function() {
	var len = this.level.length;
	if (len > 0) {
		return this.level[ this.level.length -1];
	}
	else {
		return undefined;
	}
};

Stack.prototype.isEmpty = function() {
	return this.level.length == 0;
};

Stack.prototype.asList = function() {
	return this.level;
}

Stack.prototype.incTop = function() {
	var v = this.top();
	if (v != undefined)
	{
		v++;
		this.pop();
		this.push(v);		
	}
}

Stack.prototype.count = function() {
	return this.level.length;
};


Stack.prototype.contains = function(other) {
	// this = 1.2.3.4   other = 1.2.3
	// => true
	if (this.level.length >= other.level.length) {
		var cnt = other.level.length;
		for (var i=0; i<cnt; i++) {
			if (this.level[i] !== other.level[i]) {
				return false;
			}
		}
		// all cnt elements are equal
		return true;
	}
	return false;
};

module.exports = Stack;