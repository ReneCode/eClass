var EClassFeature = require('./eClassFeature.js')
var Stack = require('./Stack.js');
var EClassMetaData = require('./eClassMetaData.js');
var EClassLevel = require('./EClassLevel.js');
var clone = require('clone');

var eClassFeatureTree = function() {

	this.create = function(list) {
		var root = new EClassFeature(-1,0,"ROOT", "ROOT");
		var eClassLevel = new EClassLevel();

		var waitingBlocks = [];
		var nBlockIndex = -1;
		var state = 'waitcardinal';
		var blockLevel = undefined;

		var nextBlockLevel = undefined;
		var blockLevelCount = 0;

		for (var i=0; i<list.length; i++) {
			var f = list[i];


			eClassLevel.setFeature(f);

			f.level = eClassLevel.asArray().join('.');

			if (f.level == "37"	) {
				var x = "hallo";
			}



			if (state == 'waitnextblock') {
				if (eClassLevel.contains(blockLevel)) {
					// inside the block, continue with the block-content
				}
				else {
					// this would be the next block (second, third, ...)
					blockLevel.incTop();
					if (eClassLevel.sameLevel(blockLevel)  &&  waitingBlocks.indexOf(f.ftid) != -1) {
						// next block found
						nBlockIndex++;
					}
					else {
						nBlockIndex = -1;
						blockLevel = undefined;
						state = 'waitcardinal';
					}
				}
			}

			if (state == 'waitcardinal') {
				if (f.type == "cardinal") {
					if (f.getValue() > 0) {
						// only wait for the block, if there will be more than 0
						waitingBlocks = EClassMetaData.getBlockIdentifers(f.ftid);
						state = 'waitblock';
						nBlockIndex = -1;	
						f.ftid += state;					
					}
				}
			}
			else if (state == 'waitblock') {
				if (waitingBlocks.indexOf(f.ftid) != -1) {
					// block found
					nBlockIndex++;
					blockLevel = clone(eClassLevel);
					state = 'waitnextblock';
				}
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

*/

			if (nBlockIndex >= 0) {
				f.index = nBlockIndex;
			}


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