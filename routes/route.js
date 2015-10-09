

var eClassToJSON = require('./eClass/eClassToJSON.js');

var showHomePage = function(req, res, next) {
	res.render('index');
}

var showContent = function(req, res, next) {
	var obj = eClassToJSON.convert("hallo Rene");
	res.render('content', obj);
}

function route(app) {
	app.get('/', showHomePage);
	app.get('/content', showContent);
}

module.exports = route;