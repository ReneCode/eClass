

var Stack = function() {
	var level = [];

	this.push = function(v) {
		level.push(v);
	}

	this.top = function() {
		var index = level.length -1;
		return level[index];
	}

	this.pop = function() {
		level.pop();
	}

	this.isEmpty = function() {
		return level.length == 0;
	}

	this.asList = function() {
		return level;
	}


}



module.exports = Stack;