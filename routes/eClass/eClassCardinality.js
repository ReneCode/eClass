
var EClassLevel = require('./eClassLevel.js')


var EClassCardinality = function() {
	this.level = new EClassLevel();
};

EClassCardinality.prototype.setFeature = function(f) {
    this.level.setFeature(f);
//    f.level = this.level.asArray().join('.');
}

EClassCardinality.prototype.getFullLevel = function() {
    return this.level.getFullLevel();
}


EClassCardinality.prototype.getFeaturePath = function() {
    return this.level.getFeaturePath();
}

module.exports = EClassCardinality;
