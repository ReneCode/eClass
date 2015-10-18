var EClassFeature = require('./eClassFeature.js')
var Stack = require('./Stack.js');
var EClassMetaData = require('./eClassMetaData.js');
var EClassLevel = require('./eClassLevel.js');
var clone = require('clone');

var eClassFeatureTree = function() {

	this.create = function(list) {
		var root = new EClassFeature(-1,0,"ROOT", "ROOT");
		var eClassLevel = new EClassLevel();

		var waitingBlocks = [];
		var nBlockIndex = -1;
		var state = 'waitcardinal';
		var blockLevel = undefined;

		for (var i=0; i<list.length; i++) {
			var f = list[i];
			// create level (7.2.5.3)
			eClassLevel.setFeature(f);
			f.level = eClassLevel.asArray().join('.');

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
					}
				}
			}
			else if (state == 'waitblock') {
				if (waitingBlocks.indexOf(f.ftid) != -1) {
					// block found
					nBlockIndex++;
					blockLevel = clone(eClassLevel);
					// !!! hack, because clone() did not work propetly
					// copy the Stack() data
					blockLevel.level = clone(eClassLevel.level);

// console.log("eClassLevel", eClassLevel.asArray());
// console.log("blockLevel", blockLevel.asArray());

					state = 'waitnextblock';
				}
			}


			if (nBlockIndex >= 0) {
				f.index = "[" + nBlockIndex + "]";
			}


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