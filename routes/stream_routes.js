const express = require('express')
const routes = express.Router()

const streamController = require('../controllers/StreamController')

routes.get('/', streamController.getStreams)
routes.get('/:id', streamController.GetOne)
routes.get('/:name', streamController.GetOneByName);
//routes.patch('/:id', streamController.update)
//routes.delete('/:id', streamController.delete)

module.exports = routes;
