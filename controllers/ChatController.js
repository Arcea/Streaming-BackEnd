var db = require('../config/db');
let chatModel = require("./../models/Chats");
let userModel = require("./../models/Users");
let io = require("./../app").io;
let errors = require('./../libs/errorcodes');

module.exports = {
    Chat(req, res, next) {
        userModel.findOne({ Name: req.headers.name }, function(err, foundUser) {
            if (err || foundUser == null || foundUser == undefined || foundUser == "") {
              // handle error properly.
              return res.json(errors[1403]);
            }
            else{
                console.log(foundUser);
                console.log("============================================");
                console.log(req.body);
                console.log("============================================");
                try {
                    let chatMessage = new chatModel({
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
     
                    io.to(req.params.id).emit(chatMessage);
                    console.log("Emitted message: " + chatMessage.content);
                    console.log("Room: " + req.params.id);    
                } catch (err) { 
                    res.status(errors[1601].header).json(errors[1601]); 
                } 

            }
        });
    },
    GetStreamChat(req, res, next) {
        chatModel
            .find({ Stream: req.params.id })
            .then((foundChat, err) => {
                if (err || foundChat === null || foundChat === undefined || foundChat === "") {
                    if(err) throw err
                    return res.json("No chats found");
                } else {
                    res.status(200).json(foundChat);
                }
            })
            .catch(err => {
                console.log(err)
            });
            
            io.on('connection', function(socket){
                console.log("Joined room: " + req.params.id);
                socket.join(req.params.id);
            });
    }
}