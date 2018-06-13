var db = require('../config/db');
let userModel = require("./../models/Users");
let errors = require("./../libs/errorcodes");

module.exports = {
    Get(req, res, next) {
        userModel
            .find({ _id: req.params.id })
            .then((foundUser, err) => {
                if (err || foundUser === null || foundUser === undefined || foundUser === "") {
                    if(err) throw err
                    return res.json("No users found");
                } else {
                    res.status(200).json(foundUser);
                }
            })
            .catch(err => {
                console.log(err)
            })
        ;
    },
    Change(req, res, next) {
        res.status(200).json("Find the programmer named Thijmen and ask him to make this");
    },

}