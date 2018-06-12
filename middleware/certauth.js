const crypto = require("crypto");
const verify = crypto.createVerify("RSA-SHA256");
const decipher = crypto.createDecipher('hex', 'test');
let UserModel = require("./../models/Users");
let errors = require('./../libs/errorcodes');
let fs = require('fs');
let path = require('path');

function certauth(req, res, next) {
  if (req.url == "/login") {
    next();
  } else if (req.url == "/") {
    let sign = req.headers.signature;
    let name = req.headers.name;
    let token = req.headers.token;

    //console.log(req.connection.getPeerCertificate());
    //DB get pubkey by name;
    UserModel.Users.findOne({ "Name": name }, function (err, user) {
      if (err)
        console.log(err);
      try {
        verify.write(token);
        fs.readFile(path.join(__dirname, '../keys', user.PublicKey), "utf8", function (err, data) {
          console.log(path.join(__dirname, '../keys', user.PublicKey));
          console.log(data);
          console.log(sign);
          console.log(token);
          console.log(decipher.write(sign, 'hex'));
          verify.end();
          let result = verify.verify(data, sign);
          console.log("The result: " + result);
          if (result) {
            next();
          } else {
            res.status(errors[1402].header).json(errors[1402]);
          }
        });
      } catch (error) {
        return res.status(errors[1402].header).json(errors[1402]);
      }
    });

    // if (result) {
    //   next();
    // } else {
    //   //Some error
    // }
  } else {
    next();
  }
}
module.exports = certauth;
