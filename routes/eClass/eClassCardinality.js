var assert = require('assert');
var EClassLevel = require('./eClassLevel.js');
var eClassMetaData = require('./eClassMetaData.js');

/*
var BlockIndexItem = function(names) {
    this.names = names;
    this.index = -1;
};

BlockIndexItem.prototype.incIndex = function() {
    this.index++;
};

BlockIndexItem.prototype.getIndex = function() {
    return this.index;
};

BlockIndexItem.prototype.sameBlock = function(other) {
    for (var i=0; i<this.names.length; i++) {
        if (this.names[i] == other) {
            // ja, dabei
            return true;
        }
    }
    // nicht dabei
    return false;
};

var EClassCardinality = function() {
    this.blockList = [ new BlockIndexItem([]) ];
    this.featureLevel = new EClassLevel();
    this.currentFullLevel = [];
};

EClassCardinality.prototype.isCardinalFeature = function(featureId) {
    return eClassMetaData.isCardinality(featureId);
};

EClassCardinality.prototype.getCorrospondingBlocks = function(featureId) {
    return eClassMetaData.getBlockIdentifers(featureId);
};

EClassCardinality.prototype.addWaitingBlock = function(waitingBlocks) {
    this.blockList.push( new BlockIndexItem(waitingBlocks) );
};

EClassCardinality.prototype.waitingForThatBlock = function(featureId) {
    var countPop = 0;
    for (var idx=this.blockList.length-1; idx >= 0; idx--, countPop++) {
        if (this.blockList[idx].sameBlock(featureId)) {
            return [true, countPop];
        }
    }
    return [false, countPop];
};

EClassCardinality.prototype.popWaitingBlock = function(countPop) {
    for (var i=0; i<countPop; i++) {
        this.blockList.pop();
    }
};

EClassCardinality.prototype.incCurrentBlockIndex = function() {
    this.blockList[this.blockList.length-1].incIndex();
};


EClassCardinality.prototype.getCurrentIndex = function() {
    return this.blockList[this.blockList.length-1].getIndex();
};

EClassCardinality.prototype.getCurrentIndex = function() {
    var index = [];
    for (var i=0; i<this.blockList.length; i++) {
        index.push(this.blockList[i].getIndex());
    }
    return index;
};

EClassCardinality.prototype.getFeaturePath = function() {
    return this.featureLevel.getFeaturePath();
};

EClassCardinality.prototype.getFullLevel = function() {
    return this.featureLevel.getFullLevel();
};

EClassCardinality.prototype.belowFullLevel(featureFullLevel) {
    var countFullLevelPop = 0;
    for (var i=this.currentFullLevel.length-1; i>=0; i--, countFullLevelPop++) {
        if (featureFullLevel.indexOf(this.currentFullLevel[i]) >= 0) {
            return countFullLevelPop;            
        }
    }
    return -1;
}

EClassCardinality.prototype.popFullLevel(countPopFullLevel) {
    for (var i=0; i<countFullLevelPop; i++) {
        this.currentFullLevel.pop();
    }
}

EClassCardinality.prototype.setFeature = function(f) {
    this.featureLevel.setFeature(f);
    
    var featureId = f.getFeatureId();
    if (featureId == "AAN546") {
        var i = 45;
    }

    var featureFullLevel = this.featureLevel.getFullLevel().join('.');
    
    
    var aRet = this.waitingForThatBlock(featureId);
    var countPop = aRet[1];
    var foundWaitingBlock = aRet[0]
    if (foundWaitingBlock) {
        this.popWaitingBlock(countPop);
        assert(this.blockList[this.blockList.length-1].sameBlock(featureId));
        this.incCurrentBlockIndex()
        this.currentFullLevel.push(featureFullLevel);
    }
    else {
        
        
        var countPopFullLevel = this.belowFullLevel(featureFullLevel);
        if (countPopFullLevel >= 0) {
            // unterhalb des aktuellen Blocks
            this.popFullLevel(countPopFullLevel);
        } 
        else {
            this.popWaitingBlock(countPop);        
        }
    }
    if (this.isCardinalFeature(featureId)) {
        if (f.getValue() > 0) {
            var waitingBlock = this.getCorrospondingBlocks(featureId);
            this.addWaitingBlock(waitingBlock);
        }
    }
};
*/

///////////////////////////////////////////////



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
            // only count on Blocks that will be repeated more than once !
    		if (f.getValue() > 1) {
    			this.getCorrospondingBlocks(f.getFeatureId());
    			this.state = STATE_WAIT_BLOCK;
    			this.blockIndex = -1;
    		}
    	}
    }
}


module.exports = EClassCardinality;
 