var EClassFeature = require('./eClassFeature.js')
var Stack = require('./Stack.js');
var EClassMetaData = require('./eClassMetaData.js');
var EClassLevel = require('./EClassLevel.js');

var eClassFeatureTree = function() {
	var level 

	this.incrementLevel = function(l) {
		var tmp = l.top();
		tmp++;
		l.pop();
		l.push(tmp);
	}

	this.create = function(list) {
		var root = new EClassFeature(-1,0,"ROOT", "ROOT");
		var eClassLevel = new EClassLevel();

		var waitingBlocks = [];
		var nBlockIndex = -1;
		var state = 'waitcardinal';
		var nextBlockLevel = undefined;
		var blockLevelCount = 0;

		for (var i=0; i<list.length; i++) {
			var f = list[i];

			eClassLevel.setFeature(f);

			f.level = eClassLevel.asArray().join('.');

			if (f.level == 34) {
				var x = "hallo";
			}

/*
			if (state == 'waitnextblock') {
				if (level.count() < blockLevelCount) {
					nBlockIndex = -1;
					state = 'waitcardinal';
				}
				else if (f.level == nextBlockLevel) {
					if (waitingBlocks.indexOf(f.ftid) != -1) {
						nBlockIndex++;
						incrementLevel(nextBlockLevel);
					}
					else {
						nBlockIndex = -1;
						state = 'waitcardinal';
					}
				}
			}

			if (state == 'waitcardinal') {
				if (f.type == "cardinal") {
					if (f.getValue() > 0) {
						waitingBlocks = EClassMetaData.getBlockIdentifers(f.ftid);
						state = 'waitblock';
						nBlockIndex = -1;						
					}
				}
			}

			if (state == 'waitblock') {
				if (f.type == "block") {
					if (waitingBlocks.indexOf(f.ftid) != -1) {
						nBlockIndex++;
						nextBlockLevel = level;
						blockLevelCount = level.count();
						incrementLevel(nextBlockLevel);
						state = 'waitnextblock';
					}
				}
			}

			if (nBlockIndex >= 0) {
				f.index = nBlockIndex;
			}
*/

			lastFeature = f;
			root.addSubNode(f);
		};

		return root;
	}

	this.findNode = function(node, id) {
		if (node.hasOwnProperty('subnode')) {
			var len = node.subnode.length;
			for (var i=0; i<len; i++) {
				if (node.subnode[i].id == id) {
					return node.subnode[i];
				}
			}
		}
		return undefined;
	}

	return {
		create: create
	}
}


module.exports = eClassFeatureTree();