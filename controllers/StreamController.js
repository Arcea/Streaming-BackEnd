const mongoose = require('mongoose');
const Streams = require("./../models/Streams");
let errors = require('./../libs/errorcodes');

module.exports = {
	getStreams(req, res, next) {
		Streams.find()
			.populate("User")
			.then((streams, err) => {
				if (err) throw err;
				res.status(200).json(streams)
			})
			.catch((err) => {
				console.log(err);
				res.status(errors[1501].header).json(errors[1501]);
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
