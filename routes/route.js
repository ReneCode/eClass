var path = require('path');
var eClassToJSON = require('./eClass/eClassToJSON.js');
var fs = require('fs');


var showHomePage = function(req, res, next) {
	res.render('index');
}

var showContent = function(req, res, next) {
	var fn = "";
	var readName = "";

	fn = 'PxC_Export_eCl@ss-80-2013-12-19_deu.xml';
	fn = 'data.xml';


	if (req.file != undefined) {
		fn = path.join(__dirname, "..", req.file.destination, req.file.filename);
		readName = req.file.originalname;
	}

	eClassToJSON.convert(fn, function(obj) {
		obj.fn = readName;
		res.render('content', obj );
	});
}




function route(app) {
	app.get('/', showHomePage);
	app.get('/content', showContent);


	app.post('/upload', showContent);

//	app.post('/upload', upload);
//	app.get('/', showContent);
}

module.exports = route;