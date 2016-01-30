
var eClassFeatureParser = require('./routes/eClass/eClassFeatureParser.js');
var EClassFeature = require('./routes/eClass/eClassFeature.js');
var EClassMetaData = require('./routes/eClass/eClassMetaData.js');
var EClassCardinality = require('./routes/eClass/eClassCardinality.js');


function EClassContentParser(option) {
	this.featureList = [];    
    this.initVal();
    if (option) {
        if (option.cbFeature) {
            this.cbFeature = option.cbFeature;
        }
        if (option.cbProduct) {
            this.cbProduct = option.cbProduct;
        }
    }
}

EClassContentParser.prototype.startElement = function(name, attribute) {
  this.attribute = attribute;
	if (name == "FEATURE") {
        this.initVal();
	}
};

EClassContentParser.prototype.initVal = function() {
  this.val = {
      fvalues: []
  };
};

EClassContentParser.prototype.endElement = function(name) {
	"use strict";
	if (name == "FEATURE") {
		this.endFeature();
	}
	else if (name == "FT_ID") {
		this.val.ftid = eClassFeatureParser.parseId(this.lastText);
	}
	else if (name == "FT_NAME") {
		this.val.ftname = this.lastText;
	}
	else if (name == "FID") {
		this.val.id = this.lastText;
	}
	else if (name == "FPARENT_ID") {
		this.val.parentId = this.lastText;
	}
	else if (name == "VALUE_IDREF") {
		this.val.valueIdRef = eClassFeatureParser.parseId(this.lastText);
	}
	else if (name == "FVALUE") {
		this.endFValue();
	}
	else if (name == "FVALUE_DETAILS") {
		this.val.fvalueDetails = this.lastText;
	}
    else if (name == "PRODUCT") {
		this.endProduct();
	}

/*
if (name == "PRODUCT") {
			endProduct();
		}

		else if (name == "T_NEW_CATALOG") {
//			console.log("finish:" + products.length);
		}
		else if (name == "FUNIT") {
			funit = lastText;
		}
		else if (name == "REFERENCE_FEATURE_GROUP_ID") {
			groupId = eClassFeatureParser.parseId(lastText);
		}
*/

};
EClassContentParser.prototype.text = function(text) {
	this.lastText = text;
};
EClassContentParser.prototype.error = function(error) {
	console.log("error:" + error);	
};

EClassContentParser.prototype.endFeature = function() {
	var feature = new EClassFeature(this.val.id, this.val.parentId, this.val.ftid, this.val.ftname);
	if (this.val.fvalueDetails) {
		feature.fvalues = [ this.val.fvalueDetails ];
    }
	else if (this.val.fvalues.length > 0) {
		feature.fvalues = this.val.fvalues;
	}
	if (this.val.valueIdRef) {
		feature.valueIdRef = this.val.valueIdRef;
	}
	if (this.vallfunit) {
		feature.funit = this.val.funit;
	}

	if (EClassMetaData.isBlockFeature(this.val.ftid)) {
		feature.type = "block";
	}
	else if (EClassMetaData.isCardinality(this.val.ftid)) {
		feature.type = "cardinal";
	}

    if (this.cbFeature) {
        this.cbFeature(feature);
    }

	this.featureList.push(feature);
};



EClassContentParser.prototype.endFValue = function() {
	var text = this.lastText;
	// multi-languate text
	if (this.attribute.hasOwnProperty('lang')) {
		text = this.attribute.lang + "@" + text;
	}
	this.val.fvalues.push(text);
};

EClassContentParser.prototype.endProduct = function() {
    if (this.cbProduct) {
        this.cbProduct(this.featureList);
    }
    this.featureList = [];
}

///////////////////////////////


function EClassReadContent()
{
	this.cardinality = new EClassCardinality();
}

EClassReadContent.prototype.finishFeature = function(f) {
	this.cardinality.setFeature(f);
  f.level = this.cardinality.getFullLevel().join('.');
	var path = this.cardinality.getFeaturePath().join('|');
	var blockLevel = this.cardinality.getCurrentIndex();
	console.log(blockLevel + '   ' + f.level + "   " + path  + "   "  + f.getValue());
};

EClassReadContent.prototype.finishProduct = function(p) {
	console.log("----- product finished ----");
};

EClassReadContent.prototype.readFile = function(filename, option) {
	var expat = require('node-expat');
	var fs = require('fs');
	var parser = new expat.Parser('UTF-8');

	var eClassContentParser = new EClassContentParser( {
		cbFeature: this.finishFeature.bind(this),
		cbProduct: this.finishProduct.bind(this)
	});

	parser.on('startElement', function (name, attrs) {
		eClassContentParser.startElement(name, attrs);
	});

	parser.on('endElement', function (name) {
		eClassContentParser.endElement(name);
	});

	parser.on('text', function (text) {
		eClassContentParser.text(text);
	});

	parser.on('error', function (error) {
		eClassContentParser.error(error);
	});

	try {
		var stream = fs.createReadStream(filename);
		stream.on('end', function() {
				console.log("finish");
			stream.close();
		});
		stream.pipe(parser);
	}
	catch (e) {
			console.dir("execption:" + e);
	}

};



module.exports = EClassReadContent;

