

var express = require('express');
var http = require('http');
var path = require('path');
var route = require('./routes/route.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var serveStatic = require('serve-static');
var morgan = require('morgan');




var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(serveStatic(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));


route(app);

var port = app.get('port');
http.createServer(app).listen(port, function() {
	console.log("Express server listening on port " + port);
});

console.log('eClass started');
