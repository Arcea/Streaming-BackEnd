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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Calling logger and authentication
//app.use(certauth);
//app.use(tokenauth);
//app.use(logger.myLogger);

app.use(cors())

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
