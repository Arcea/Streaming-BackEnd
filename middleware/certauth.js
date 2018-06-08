const crypto = require("crypto");
const verify = crypto.createVerify("SHA256");

function certauth(req, res, next) {
  let name = req.body.name;
  let signature = req.body.signature;

  //DB get pubkey by name;

  let result = verify.verify(pubkey, signature);

  if (result) {
    next();
  } else {
    //Some error
  }
}
module.exports = certauth;
