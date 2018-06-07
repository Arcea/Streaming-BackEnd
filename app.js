var express = require('express');
var path = require('path');
//var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

let tokenauth = require('./middleware/tokenauth.js');
//let loggor = require('./middleware/logger');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

app.use(tokenauth.myLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(tokenauth.myLogger);
//app.use(logger);

const router = require('./router');
app.use(router);

app.listen(process.env.PORT || 5000, () => { 
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT); 
	} else {
		console.log('Server gestart op poort 5000'); 
	}
});

module.exports = app;