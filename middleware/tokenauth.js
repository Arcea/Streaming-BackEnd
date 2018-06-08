const crypto = require("crypto");
let errors = require("./../libs/errorcodes");

function tokenauth(req, res, next) {
  if (req.url == "/login") {
    next();
  } else if (req.body.token == "" || req.body.token == undefined) {
    console.log(errors[1401]);
  } else {
    let token = req.body.token;
    //More stuff
  }
}

module.exports = tokenauth;
