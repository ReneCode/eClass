
var eClassFeatureParser = require('./eClassFeatureParser.js')
var eClassFeatureTree = require('./eClassFeatureTree.js')
var EClassNode = require('./eClassNode.js')

var eClassParser = (function () {
	var fvalues = [];
	var ftid = undefined;
	var ftname = undefined;
	var id = undefined;
	var parentId = undefined;
	var valueIdRef = undefined;
	var fvalueDetails = undefined;
	var funit = undefined;

	var productNr = 0;
	var featureList = undefined;
	var products = [];
	var attribute = undefined;

	this.startElement = function(name, attrib) {
		attribute = attrib;
		if (name == "PRODUCT") {
			startProduct();
		}
		else if (name == "FEATURE") {
			startFeature();
		}
		else if (name == "FVALUE") {
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
			fvalueDetails = lastText;
		}
		else if (name == "VALUE_IDREF") {
			valueIdRef = eClassFeatureParser.parseId(lastText);
		}
		else if (name == "T_NEW_CATALOG") {
			console.log("finish:" + products.length);
		}
		else if (name == "FUNIT") {
			funit = lastText;
		}
	}

	this.text = function(text) {
		lastText = text;
	}



	this.endFValue = function() {
		var text = lastText;
		// multi-languate text
		if (attribute.hasOwnProperty('lang')) {
			text = attribute.lang + "@" + text;
		}
		fvalues.push(text);
	}

	this.startFeature = function() {
		fvalues = [];
		ftid = undefined;
		ftname = undefined;
		id = undefined;
		parentId = undefined;
		valueIdRef = undefined;
		fvalueDetails = undefined;
		attribute = undefined;
		funit = undefined;
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


		var node = new EClassNode(id, parentId, ftid, ftname);
		if (fvalues.length > 0) {
			node.fvalues = fvalues;
		}
		if (valueIdRef) {
			node.valueIdRef = valueIdRef;
		}
		if (fvalueDetails) {
			node.fvalueDetails = fvalueDetails;
		}
		if (funit) {
			node.funit = funit;
		}
		featureList.push(node);

	}


	this.startProduct = function() {
		productNr++;
		console.log("--------- startProduct:" + productNr);
		featureList = [];
	}
	this.endProduct = function() {
		console.log("endProduct");
		var featureTree = eClassFeatureTree.create(featureList);
		console.log( JSON.stringify(featureTree, null, 2) );
		products.push(featureTree);
	}

	return {
		startElement: startElement,
		endElement: endElement,
		text: text
	};	

})();

module.exports = eClassParser;

