const express = require("express");
const router = express.Router();

//Declare any routes here.
const authRoutes = require("./routes/auth");
router.use("/auth", authRoutes);

//const streamRoutes = require("./routes/stream");
//router.use("/streams", streamRoutes);

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
