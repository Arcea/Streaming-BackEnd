let errors = require("./../libs/errorcodes");
let tokenHelper = require("./../helpers/tokenHelper");
let tokenModel = require("./../models/Tokens");

function tokenauth(req, res, next) {
  if (req.url == "/login") {
    let newToken = tokenHelper.genToken();
    newToken.save(function (err, newToken){
      if(err) return console.log(err);
      console.log("Succesfully saved Token");
    });

    res.status(200).json({
      token: newToken
    });

  } else if (req.headers.token == "" || req.headers.token == undefined) {
    res.status(errors[1401].header).json(errors[1401]);
  } else {
    let token = req.headers.token;
    // check if token is valid according to signed public key.

    // Delete token from db
    tokenModel.Tokens.findOne({ 'Token': token }, function (err, foundToken) {
      if (err) {
        return handleError(err);
      }
      else{
        foundToken.delete();
        console.log(foundToken);
      }
    });

    // generate new token and add to db.
    let newToken = tokenHelper.genToken();
    newToken.save(function (err, newToken){
      if(err) return console.log(err);
      console.log(newToken);
    });

    res.setHeader("token", newToken.Token);
    next();
  }
}

module.exports = tokenauth;
