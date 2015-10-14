
var EClassNode = function (id, parentId, ftid, ftname) {
	this.id = id;
	this.parentId = parentId;
	this.ftid = ftid;
	this.ftname = ftname;
};

EClassNode.prototype.addSubNode = function(subnode) {
	if (this.hasOwnProperty('subnode')) {
		this.subnode.push(subnode);
	}
	else {
		this.subnode = [ subnode ];
	}
}


module.exports = EClassNode;