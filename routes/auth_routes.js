const express = require('express')
const routes = express.Router()

//TODO: Clean this up
const chatboxcontroller = require('../controllers/AuthController')
routes.get('/', chatboxcontroller.checkAuthentication)

module.exports = routes