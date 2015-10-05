
var eClassFeatureParser = require('./eClassFeatureParser.js')
var eClassFeatureTree = require('./eClassFeatureTree.js')

var eClassParser = function () {
	var productNr = 0;
	var currentElement;
	var fvalues = [];
	var ftid = undefined;
	var ftname = undefined;
	var id = undefined;
	var parentId = undefined;
	var featureList = undefined;

	this.startElement = function(name, attrib) {
		currentElement = name;
		if (name == "PRODUCT") {
			startProduct();
		}
		else if (name == "FEATURE") {
			startFeature();
		}

//		console.log("startElement:" + name);

	}

	this.endElement = function(name) {
		if (name == "PRODUCT") {
			endProduct();
		}
		else if (name == "FEATURE") {
			endFeature();
		}
		else if (name == "FVALUE") {
			endFValue();
		}
		else if (name == "FID") {
			id = lastText;
		}
		else if (name == "FPARENT_ID") {
			parentId = lastText;
		}
		else if (name == "FT_ID") {
			ftid = eClassFeatureParser.parseId(lastText);
		}
		else if (name == "FT_NAME") {
			ftname = lastText;
		}
		else if (name == "FVALUE_DETAILS") {

		}
	}

	this.text = function(text) {
		lastText = text;
	}



	this.endFValue = function() {
//		console.log("endFValue");
		fvalues.push(lastText);
	}

	this.startFeature = function() {
		fvalues = [];
		ftid = undefined;
		ftname = undefined;
		id = undefined;
		parentId = undefined;
	}

	this.endFeature = function() {
		/*
		console.log("endFeature -------");
		console.log("id:", id);
		console.log("parentId:", parentId);
		console.log("ftid:", ftid);
		console.log("ftname:", ftname);
		console.dir(fvalues);
*/
		featureList.push(
			{
				id: id,
				parentId: parentId,
				ftid: ftid,
				ftname: ftname,
				fvalues: fvalues
			}
		);
	}


	this.startProduct = function() {
		productNr++;
		console.log("--------- startProduct:" + productNr);
		featureList = [];
	}
	this.endProduct = function() {
		console.log("endProduct");
		var featureTree = eClassFeatureTree.create(featureList);
		console.dir(featureTree);
	}

	return {
		startElement: startElement,
		endElement: endElement,
		text: text
	};	

};

module.exports = eClassParser();