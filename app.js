

var express = require('express');
var http = require('http');
var path = require('path');
var route = require('./routes/route.js');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

/*
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
*/

route(app);

var port = app.get('port');
http.createServer(app).listen(port, function() {
	console.log("Express server listening on port " + port);
});

console.log('eClass started');
