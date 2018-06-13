const mongoose = require('mongoose');
const Streams = require("./../models/Streams");

module.exports = {
	getStreams(req, res, next) {
		Streams.find()
			.populate("User")
			.then((streams, err) => {
				if (err) throw err;
				res.status(200).json(streams)
			})
			.catch((err) => {
				next(err)
			})
	},
	GetOne(req, res, next){
		Streams.findOne({ _id: req.params.id }).select("-__v")
			.populate("User", "-Streams")
			.then((stream, err) => {
				if(err) throw err;
				res.status(200).json(stream)
			})
			.catch((err) => {
				next(err)
			})
	}
}
