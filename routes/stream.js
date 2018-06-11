const express = require('express')
const routes = express.Router()

const streamController = require('../controllers/StreamController')

routes.get('/', streamController.getStreams)
//routes.post('/', streamController.add)
//routes.patch('/:id', streamController.update)
//routes.delete('/:id', streamController.delete)

module.exports = routes;