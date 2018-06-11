var db = require('../config/dbConnection');
let chatModel = require("./../models/Chats");

module.exports = {
    Chat(req, res, next) {
        let chatMessage = new chatModel.Chats({
            Content: req.body.content,
            Date: Date.now(),
            Stream: req.body.streamid
        });

        chatMessage.save(function(err, newChat) {
            if (err) return console.log(err);
        });
    },
    GetStreamChat(req, res, next) {
        chatModel.Chats.find({ Stream: req.headers.streamid }, function(err, foundChat) {
            if (err || foundChat == null || foundChat == undefined || foundChat == "") {
                // handle error properly.
                return res.json("No chats found");
            }
            else{
                res.json(foundChat);
            }
        });
    }
}