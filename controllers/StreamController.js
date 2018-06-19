const mongoose = require('mongoose');
const Streams = require("./../models/Streams");
const Users = require('./../models/Users');
let errors = require('./../libs/errorcodes');
const signData = require('../libs/signature').signData

module.exports = {
	getStreams(req, res, next) {
		Streams.find()
			.populate("User")
			.then((streams, err) => {
				if (err) throw err;
				res.setHeader("Signature", signData(streams))
				res.status(200).json(streams)
			})
			.catch((err) => {
				console.log(err);
				res.status(errors[1501]).json(errors[1501]);
			})
	},
	GetOne(req, res, next){
		Streams.findOne({ _id: req.params.id }).select("-__v")
			.populate("User", "-Streams")
			.then((stream, err) => {
				if(err) throw err;
				res.setHeader("Signature", signData(stream))
				res.status(200).json(stream)
			})
			.catch((err) => {
				next(err)
			})
	},
	GetOneByName(req, res, next){
		console.log(req.params.name)
		Users.findOne({ Name: req.params.name }).select()
			.then((user, err) => {
				Streams.findOne({ User: user._id }).select("-__v")
				.populate("User", "-Streams")
				.then((stream, err) => {
					console.log(name)
					console.log(user._id)
					console.log("Shit going wrong here?")
					if(err) throw err;
					res.setHeader("Signature", signData(stream))
					res.status(200).json(stream)
				})
				.catch((err) => {
					console.log("Sor here?")
					next(err)
				})
			})
			.catch((err) => {
				console.log("Hear")
				next(err)
			})
	},
	addStream(req, res, next) {
		Stream = new Streams(req.body)
		Stream
			.save()
			.then((stream, err) => {
				if(err) throw err;
				res.setHeader("Signature", signData(stream))
				res.status(200).json(stream)
			})
			.catch((err) => {
				next(err)
			})
	}
}
