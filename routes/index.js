const express = require('express')
const routes = express.Router()

const chatboxcontroller = require('../controllers/ctrl_auth')

routes.get('/', chatboxcontroller.getAll)

module.exports = routes;