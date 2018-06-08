let errors = require("./../libs/errorcodes");
let tokenHelper = require("./../helpers/tokenHelper");
let tokenModel = require("./../models/Tokens");

function tokenauth(req, res, next) {
  if (req.url == "/login") {
    let newToken = tokenHelper.genToken();
    newToken.save(function(err, newToken) {
      if (err) return console.log(err);
    });
    res.setHeader("token", newToken.Token);
    res.status(200).send();
  } else if (req.headers.token == "" || req.headers.token == undefined) {
    res.status(errors[1401].header).json(errors[1401]);
  } else {
    let token = req.headers.token;
    // check if token is valid according to signed public key.

    // Delete token from db

    // generate new token and add to db.
    let newToken = tokenHelper.genToken();
    newToken.save(function(err, newToken) {
      if (err) return console.log(err);
    });

    res.setHeader("token", newToken);
    next();
  }
}

module.exports = tokenauth;
