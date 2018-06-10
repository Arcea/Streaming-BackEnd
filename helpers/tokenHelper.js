let uuid = require("uuid/v4");
let Tokens = require("./../models/Tokens");

module.exports = {
  genToken: function() {
    return new Tokens.Tokens({
      Token: uuid(),
      ExpirationDate: Date.now() // TODO: change this.
    });
  }
};
