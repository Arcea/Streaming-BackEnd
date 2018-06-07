var express = require('express')
var app = express()

//Adding this just so 'npm start' works.
app.get('/', function (req, res) {
  res.send('hello world')
})