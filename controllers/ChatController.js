var db = require('../config/db');
let chatModel = require("./../models/Chats");
let userModel = require("./../models/Users");

module.exports = {
    Chat(req, res, next) {

        userModel.Users.findOne({ Name: req.headers.name }, function(err, foundUser) {
            if (err || foundUser == null || foundUser == undefined || foundUser == "") {
              // handle error properly.
              return res.json(errors[1403]);
            }
            else{
                console.log(foundUser);

                let chatMessage = new chatModel.Chats({
                    Content: req.body.content,
                    Date: Date.now(),
                    Stream: req.params.id,
                    User: foundUser._id
                });
        
                chatMessage.save(function(err, newChat) {
                    if (err){ 
                        return console.log(err);
                    } else{
                        res.status(200).json("Message sent");
                    }
                });
            }
        });
    },
    GetStreamChat(req, res, next) {
        chatModel.Chats.find({ Stream: req.params.id }, function(err, foundChat) {
            if (err || foundChat == null || foundChat == undefined || foundChat == "") {
                if(err){ console.log(err) }
                // handle error properly.
                return res.json("No chats found");
            }
            else{
                res.json(foundChat);
            }
        });
    }
}