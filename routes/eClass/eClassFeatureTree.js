var EClassNode = require('./eClassNode.js')



var eClassFeatureTree = function() {
	var level = EClassNodeLevel();
	var stackParentId = Stack();

	this.create = function(list) {
		var root = new EClassNode(0,0,"ROOT", "ROOT");
		var lastFeature = root;

		list.forEach( function(f) {
			if (lastFeature.id == f.parentId)

			if (f.parentId == -1) {
				console.dir(f);
				root.addSubNode(f);
			}
			else {
				node = findNode(root, f.parentId);
				if (node) {

					node.addSubNode(f);
				}
			}			
//			delete f.id;
//			delete f.parentId;
		});

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