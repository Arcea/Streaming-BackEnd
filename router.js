const express = require("express");
const router = express.Router();

//Declare any routes here.
const authRoutes = require("./routes/index");
const chatRoutes = require("./routes/chat_routes.js");

router.use("/auth", authRoutes);
router.use(chatRoutes);

//Catching all other requests
router.get("*", (req, res) => {
  res
    .status(404)
    .send({
      message: "404 not found"
    })
    .end();
});

module.exports = router;
