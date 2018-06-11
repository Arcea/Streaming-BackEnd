const mongoose = require('mongoose');
const Streams = require("../models/streams");

module.exports = {
    getStreams(req, res, next){
        console.log("GOTTEM");
        Streams.Streams.find({}, function(err, streams) {
		  if (err) throw err;
		  // object of all the streams
		  console.log(streams);
		  console.log(JSON.stringify(streams));
		  //res.write(JSON.stringify(streams));
		  res.status(200).json(streams)
		});
    }
}
/*
 ID: 0,
 viewers: 0,
 slogan: "This is an example slogan because I say so",
 title: "Wouter Jansen",
 imagesource:"/assets/img/otter1.jpg",
 imagealt:"Alttext that I don't want to write",
 messages: ["This is a message!",
 			"I am a message too!",
 			"Hello all!", "Kappa",
 			"lmao",
 			"1337 0773r"]},
*/