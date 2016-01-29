
var EClassFeature = function (id, parentId, ftid, ftname) {
	this.id = id;
	this.parentId = parentId;
	this.ftid = ftid;
	this.ftname = ftname;
	this.fvalues = [];
};

EClassFeature.prototype.addSubNode = function(subnode) {
	if (this.hasOwnProperty('subnode')) {
		this.subnode.push(subnode);
	}
	else {
		this.subnode = [ subnode ];
	}
}

EClassFeature.prototype.getValue = function() {
	if (this.fvalues.length > 0) 
	{
		return this.fvalues[0];
	}
}

EClassFeature.prototype.getFeatureId = function() {
	return this.ftid;	
};

EClassFeature.prototype.getParentId = function() {
	return this.parentId;	
};

EClassFeature.prototype.getId = function() {
	return this.id;	
};

module.exports = EClassFeature;
