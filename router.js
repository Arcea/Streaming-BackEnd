const express = require("express");
const router = express.Router();
const userModel = require('./models/Users')
//Declare any routes here.

const chatRoutes = require("./routes/chat_routes.js");
const authRoutes = require("./routes/auth_routes.js");
const streamRoutes = require("./routes/stream_routes.js");
const userRoutes = require("./routes/user_routes.js");

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/streams", streamRoutes);
router.use("/users", userRoutes);

router.get("/login", (req, res) => {
          userModel
            .findOne({ Name: req.headers.name })
            .then((foundUser, err) => {
                if (err || foundUser === null || foundUser === undefined || foundUser === "") {
                    if(err) throw err
                    res.json("No users found");
                } else {
                    res.setHeader("Signature", signData(foundUser))
                    res.status(200).json(foundUser);
                }
            })
            .catch(err => {
                console.log(err)
            });
});
router.get('/token', (req, res) => {
          userModel
            .findOne({ Name: req.headers.name })
            .then((foundUser, err) => {
                if (err || foundUser === null || foundUser === undefined || foundUser === "") {
                    if(err) throw err
                    res.json("No users found");
                } else {
                    res.setHeader("Signature", signData(foundUser))
                    res.status(200).json(foundUser);
                }
            })
            .catch(err => {
                console.log(err)
            });
});

router.use((error, req, res, next) => {
  res.status(error.header || 500).send({
    message: error.message,
    code: error.code,
    name: error.name,
    status: error.status
  }).end();
});

//Catching all other requests
router.use("*", (req, res) => {
  res
    .status(404)
    .send({
      message: "404 not found"
    })
    .end();
});

module.exports = router;
