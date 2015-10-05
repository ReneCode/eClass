"use strict";

var expat = require('node-expat');
var eClassParser = require('./eClassParser.js');

var parser = new expat.Parser('UTF-8');

var fs = require('fs');

var filename = "./data/ESPRIT-reformat.xml";
var filename = "./data/data.xml";

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


fs.createReadStream(filename).pipe(parser);

