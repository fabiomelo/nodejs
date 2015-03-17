'use strict';

var PORT = 80;

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
//  Request body parsing middleware supporting JSON and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// module dependencies
var fs = require('fs');


if ('production' == app.get('env')){
	// handling 404 errors
	app.use(function(err, req, res, next) {
		if(err.status !== httpStatusCode.HTTP_NOT_FOUND) {
			return next();
		}
		console.log(err.message);
		res.send(messages.NOT_FOUND_404).status(httpStatusCode.HTTP_NOT_FOUND);
	});
}

if ('development' == app.get('env')) {
	// show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
}


load('dao')
	.then('controllers')
	.then('routes')
	.into(app);

// start express server
app.listen(PORT, function() {
    console.log( 'Server is running...', PORT, app.settings.env )});


