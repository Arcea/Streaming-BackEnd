var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

//Our personal middleware functions
let tokenauth = require("./middleware/tokenauth.js");
let certauth = require("./middleware/certauth");
let logger = require("./middleware/logger");

const mongoose = require("mongoose");

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Calling logger and authentication
app.use(cors())
app.use(certauth);
app.use(tokenauth);
app.use(logger);

//Allow Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Token');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json, Token');
    next();
});

const router = require("./router");
app.use(router);

app.listen(process.env.PORT || 5000, () => {
  if (process.env.PORT !== undefined) {
    console.log("Server gestart op poort " + process.env.PORT);
  } else {
    console.log("Server gestart op poort 5000");
  }
});

module.exports = app;
