let uuid = require("uuid/v4");
let Tokens = require("./../models/Tokens");
let moment = require("moment");

module.exports = {
  genToken: function() {
    return new Tokens.Tokens({
      Token: uuid(),
      ExpirationDate: moment(Date.now()).add(15, 'm').toDate()
    });
  }
};
