let actionModel = require("./../models/Actions");
let userModel = require("./../models/Users");

function Logger(req, res, next) {

  // find user based on name in the header.
  userModel.Users.findOne({ Name: req.headers.name }, function(err, foundUser) {
    if (err || foundUser == null || foundUser == undefined || foundUser == "") {
      // handle error properly when user is not found.
      console.log("Couldnt log this user: " + err);
    }
    else{
      let action = new actionModel.Actions({
        Method: req.method,
        Url: req.url,
        Date: Date.now(),
        User: foundUser
      });

      action.save(function(err, newAction) {
        if (err){
          return console.log("Error saving the action: " + err);
        }
      });
    }
  });

  next();
}

module.exports = Logger;