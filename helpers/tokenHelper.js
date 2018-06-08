let uuid = require("uuid/v4");
let tokenModel = require("./../models/Tokens");

module.exports = {
  genToken: function() {
    return new tokenModel({
      Token: uuid(),
      ExpirationDate: Date.now() // TODO: change this.
    })
  }
};
