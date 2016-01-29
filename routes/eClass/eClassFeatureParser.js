

var eClassFeatureParser = function () {

	/*
		0173-1#02-AAM552#001		=>  AAM552
	*/
	this.parseId = function(text) {
		if (!text) {
			return undefined;
		}
		var tok = text.split('-');
		if (tok.length == 3) {
			var ids = tok[2].split('#');
			if (ids.length == 2) {
				return ids[0];
			}
		}
		console.log("!!:" + text);
		return undefined;
	}

	return {
		parseId: parseId
	};	

};

module.exports = eClassFeatureParser();