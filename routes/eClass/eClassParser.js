
var eClassFeatureParser = require('./eClassFeatureParser.js')
var eClassFeatureTree = require('./eClassFeatureTree.js')
var EClassFeature = require('./eClassFeature.js')
var EClassMetaData = require('./eClassMetaData.js');

var eClassParser = (function () {
	var fvalues = [];
	var ftid;
	var ftname;
	var id;
	var parentId;
	var valueIdRef;
	var fvalueDetails;
	var funit;
	var groupId;

	var productList = [];
	var productNr = 0;
	var featureList;
	var attribute;


	this.getProductList = function() {
		return productList;
	}

	this.startElement = function(name, attrib) {
		attribute = attrib;
		if (name == "PRODUCT") {
			startProduct();
		}
		else if (name == "FEATURE") {
			startFeature();
		}
		else if (name == "REFERENCE_FEATURE_GROUP_ID") {
			startGroup();
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
//			console.log("finish:" + products.length);
		}
		else if (name == "FUNIT") {
			funit = lastText;
		}
		else if (name == "REFERENCE_FEATURE_GROUP_ID") {
			groupId = eClassFeatureParser.parseId(lastText);
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
		var node = new EClassFeature(id, parentId, ftid, ftname);
		if (fvalues.length > 0) {
			node.fvalues = fvalues;
		}
		if (valueIdRef) {
			node.valueIdRef = valueIdRef;
		}
		if (fvalueDetails) {
			node.fvalues = fvalueDetails;
		}
		if (funit) {
			node.funit = funit;
		}
		if (EClassMetaData.isBlockFeature(ftid)) {
			node.type = "block";
		}
		else if (EClassMetaData.isCardinality(ftid)) {
			node.type = "cardinal";
		}

		featureList.push(node);
	}


	this.startProduct = function() {
		productNr++;
		console.log("--------- startProduct:" + productNr);
		featureList = [];
	}
	this.endProduct = function() {
		var featureTree = eClassFeatureTree.create(featureList);
		console.log( JSON.stringify(featureTree, null, 2) );
		productList.push(featureTree);
		if (callback) {
			//callback(featureTree);
		}
	}

	return {
		startElement: startElement,
		endElement: endElement,
		text: text,
		getProductList: getProductList
		// test: function() {
		// 	callback();
		// }
	};	

})();

module.exports = eClassParser;

