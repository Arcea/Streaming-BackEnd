var db = require('../config/db');
let userModel = require("./../models/Users");
let streamModel = require("./../models/Streams");
let errors = require("./../libs/errorcodes");

module.exports = {
    Get(req, res, next) {
        userModel
            .findOne({ _id: req.params.id })
            .populate("Streams")
            .then((foundUser, err) => {
                if (err || foundUser === null || foundUser === undefined || foundUser === "") {
                    if(err) throw err
                    res.json("No users found");
                } else {
                    res.status(200).json(foundUser);
                }
            })
            .catch(err => {
                console.log(err)
            });
    },
    Update(req, res, next) {
        userModel
            .findOne({ Name: req.headers.name })
            .then((foundUser, err) => {
                if (err || foundUser === null || foundUser === undefined || foundUser === "") {
                    if(err) throw err
                    res.json("No users found");
                } else {
                    updateData = {
                        Avatar: req.body.avatar,
                        Slogan: req.body.slogan
                    }
                    foundUser.update(updateData, function(err, affected){
                        if(err){ 
                            res.status(errors[1402].header).json(errors[1402])
                        } else{
                            res.status(200).json("Succesfully updated");
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
}