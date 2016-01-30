
var EClassLevel = require('./eClassLevel.js')
var eClassMetaData = require('./eClassMetaData.js');

var STATE_UNDEFINED = 0;
var STATE_WAIT_CARDINAL = 1;
var STATE_WAIT_BLOCK = 2;
var STATE_WAIT_NEXT_BLOCK = 3;



var EClassCardinality = function() {
	this.featureLevel = new EClassLevel();
	this.state = STATE_WAIT_CARDINAL;
	this.blockIndex = -1;
	this.lastBlockLevel = [];
	this.waitingBlock = [];
};


EClassCardinality.prototype.getFullLevel = function() {
    return this.featureLevel.getFullLevel();
}


EClassCardinality.prototype.getFeaturePath = function() {
    return this.featureLevel.getFeaturePath();
}


EClassCardinality.prototype.isCorrectWaitingBlock = function(featureId) {
	for (var i=0; i<this.waitingBlock.length; i++) {
		if (this.waitingBlock[i] == featureId) {
			return true;
		}
	}
	return false;
};


EClassCardinality.prototype.getCorrospondingBlocks = function(featureId) {
	this.waitingBlock = eClassMetaData.getBlockIdentifers(featureId);
};


EClassCardinality.prototype.isCardinalFeature = function(featureId) {
	return eClassMetaData.isCardinality(featureId);
};

EClassCardinality.prototype.getCurrentIndex = function() {
	return this.blockIndex;
};

EClassCardinality.prototype.setFeature = function(f) {
    this.featureLevel.setFeature(f);

    if (this.state == STATE_WAIT_NEXT_BLOCK) {
    	if (this.featureLevel.contains(this.lastBlockLevel)) {
    		// inside the block, continue with the block content
    	}
    	else {
    		// next block ( 2th, 3th)
    		this.lastBlockLevel[this.lastBlockLevel.length -1]++;
    		if (this.featureLevel.equal(this.lastBlockLevel)  && 	
    				this.isCorrectWaitingBlock(f.getFeatureId()) ) {
    			// next block found
    			this.blockIndex++;
    		}
    		else {
    			// reset
    			this.blockIndex = -1;
    			this.lastBlockLevel = [];
    			this.waitingBlock = [];
    			this.state = STATE_WAIT_CARDINAL;
    		}
    	}
    }
    if (this.state == STATE_WAIT_BLOCK) {
    	if (this.isCorrectWaitingBlock(f.getFeatureId())) {
    		// block found
    		this.blockIndex++;
    		this.lastBlockLevel = this.featureLevel.getFullLevel().slice(0);
    		this.state = STATE_WAIT_NEXT_BLOCK;
    	}
    	else {
    		// nicht der richtige block angekommen
    		// continue 'normaly'
    		this.state = STATE_WAIT_CARDINAL;
    	}
    }
    if (this.state == STATE_WAIT_CARDINAL) {
    	if (this.isCardinalFeature(f.getFeatureId())) {
    		if (f.getValue() > 0) {
    			this.getCorrospondingBlocks(f.getFeatureId());
    			this.state = STATE_WAIT_BLOCK;
    			this.blockIndex = -1;
    		}
    	}
    }
}


module.exports = EClassCardinality;
 