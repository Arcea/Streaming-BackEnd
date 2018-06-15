const crypto = require("crypto");
let UserModel = require("./../models/Users");
let errors = require('./../libs/errorcodes');
let fs = require('fs');
let path = require('path');

function certauth(req, res, next) {
  if (req.url == "/login" && req.method == "GET") {
    if (req.headers.token != null && req.headers.token != "" && req.headers.token != undefined) {
      console.log(req.headers.token);
      //console.log("0");
      if ((req.headers.name != null || req.headers.name != undefined) && (req.headers.signature != null || req.headers.signature != undefined || req.headers.signature != "")) {
        auth(req, res, function (bool) {
          //console.log("1");
          if (bool) {
            next();
          } else {
            res.status(errors[1402].header).json(errors[1402]);
          }
        });
      } else {
        res.status(errors[1402].header).json(errors[1402]);
      }
    } else {
      //console.log("2");
      next();
    }
  } else {
    //console.log("3");
    //console.log(req.headers.name, req.headers.token, req.headers.signature);
    //console.log(res);
    if ((req.headers.name != null || req.headers.name != undefined) && (req.headers.signature != null || req.headers.signature != undefined || req.headers.signature != "")) {
      //console.log("Got in if");
      auth(req, res, function (bool) {
        if (bool) {
          next()
        } else {
          res.status(errors[1402].header).json(errors[1402]);
        }
      });
    } else {
      console.log("got in else");
      res.status(errors[1402].header).json(errors[1402]);
    }
  }
}

function auth(req, res, cb) {
  let sign = req.headers.signature;
  let name = req.headers.name;
  //let token = req.headers.token;
  let data = req.body

  //console.log(req.connection.getPeerCertificate());
  //DB get pubkey by name;
  UserModel.findOne({ "Name": name }, function (err, user) {
    if (err)
      console.log(err);
    try {
      let verify = crypto.createVerify("RSA-SHA256");
      let cert = fs.readFileSync(path.join(__dirname, '../keys', user.PublicKey)).toString();
      try {
        //console.log(path.join(__dirname, '../keys', user.PublicKey));
        verify.update(JSON.stringify(data));
        cert = cert.toString();
        sign = sign.toString();
        let result = verify.verify(cert, sign, 'hex');
        cb(result);
        console.log("yay");
      } catch (error) {
        console.log(error);
        return res.status(errors[1402].header).json(errors[1402]);
      }

    } catch (error) {
      console.log(error);
      return res.status(errors[1402].header).json(errors[1402]);
    }
  });
}

module.exports = certauth;
