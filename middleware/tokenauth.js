const crypto = require("crypto");
let errors = require("./../libs/errorcodes");
let tokenHelper = require("./../helpers/tokenHelper");

function tokenauth(req, res, next) {
  if (req.url == "/login") {
    let token = tokenHelper.genToken();
    //Write token to db
    res.status(200).json({
      token: token
    });
  } else if (req.body.token == "" || req.body.token == undefined) {
    res.status(errors[1401].header).json(errors[1401]);
  } else {
    let token = req.body.token;
    //Delete token from db
    let token = tokenHelper.genToken();
    //Write new token to db
    next();
  }
}

module.exports = tokenauth;
