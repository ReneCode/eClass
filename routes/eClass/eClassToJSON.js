// eClassToJSON.js
"use strict_"


var eClassToJSON = (function() {


	this.convert = function(filename, callback) {

		var expat = require('node-expat');
		var fs = require('fs');
		var parser = new expat.Parser('UTF-8');

		var eClassParser = require('./eClassParser.js')(callback);

		console.log("file:" + filename);

		parser.on('startElement', function (name, attrs) {
			eClassParser.startElement(name, attrs);
		})

		parser.on('endElement', function (name) {
			eClassParser.endElement(name);
		})

		parser.on('text', function (text) {
			eClassParser.text(text);
		})

		parser.on('error', function (error) {
			console.error(error);
		})

		try {
			var stream = fs.createReadStream(filename);
			stream.on('end', function() {
//				console.log("finish");
				stream.close();
				var productList = eClassParser.getProductList();
				if (callback) {
					callback(productList[0])
				}
			});
			stream.pipe(parser);
		}
		catch (e) {
//			console.dir(e);
		}


		// var x = eClassParser.test();

		// return x;
	};

	return {
		convert: convert
	};
})();


module.exports = eClassToJSON;

