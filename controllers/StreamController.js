/*
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
*/