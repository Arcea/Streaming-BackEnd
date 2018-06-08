let uuid = require("uuid/v4");

module.exports = {
  genToken: function() {
    let token = uuid();
    return token;
  }
};
