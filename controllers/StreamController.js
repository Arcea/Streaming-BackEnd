const mongoose = require('mongoose');
const Streams = require("./../models/streams");

module.exports = {
	getStreams(req, res, next) {
		Streams.find()
			.then((streams, err) => {
				if (err) throw err;
				res.status(200).json(streams)
			})
			.catch((err) => {
				next(err)
			})
	}
}
