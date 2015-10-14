var path = require('path');
var eClassToJSON = require('./eClass/eClassToJSON.js');


var showHomePage = function(req, res, next) {
	res.render('index');
}

var showContent = function(req, res, next) {


	var file = 'PxC_Export_eCl@ss-80-2013-12-19_deu.xml';
	file = 'data.xml';
	var fn = path.join(__dirname, '..', 'data', file);

//	console.dir(eClassToJSON);
	eClassToJSON.convert(fn, function(obj) {
		res.render('content', obj );
	});
}

function route(app) {
	app.get('/', showHomePage);
	app.get('/content', showContent);
//	app.get('/', showContent);
}

module.exports = route;