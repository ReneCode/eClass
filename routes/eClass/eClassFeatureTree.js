var EClassNode = require('./eClassNode.js')
var Stack = require('./Stack.js');


var eClassFeatureTree = function() {
	var level 

	this.incrementCurrentLevel = function() {
		var tmp = level.top();
		tmp++;
		level.pop();
		level.push(tmp);
	}

	this.create = function(list) {
		var root = new EClassNode(-1,0,"ROOT", "ROOT");
		var lastFeature = root;
		var stackParentId = new Stack();
		level = new Stack();

		for (var i=0; i<list.length; i++) {
			var f = list[i];


			console.log(level.asList().join());
			if (lastFeature.id == f.parentId) {
				// one level below
				level.push(1);
				stackParentId.push(f.parentId);
			}
			else if (lastFeature.parentId == f.parentId) {
				// same level
				// increment current level
				incrementCurrentLevel();
			}
			else {
				// higher level
				var cnt = 0;
				while (!stackParentId.isEmpty()  &&  stackParentId.top() != f.parentId) {
					stackParentId.pop();

					console.log(f.parentId, stackParentId.top(), cnt);

					cnt++;
				}
				console.log(f.ftname);
				console.log(cnt);
				while (cnt > 0) {
					level.pop();
					cnt--;
				}
				incrementCurrentLevel();
			}
			f.level = level.asList().join('.');
//			console.log(level.asList());

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