const express = require('express')
const routes = express.Router()

const streamController = require('../controllers/StreamController')

routes.get('/', streamController.getStreams)
routes.get('/:id', streamController.GetOne)
routes.get('/ByName/:name', streamController.GetOneByName);
routes.post('/:streamid/toggle', streamController.Activate);
routes.delete('/:streamid/toggle', streamController.Deactivate);
//routes.patch('/:id', streamController.update)
//routes.delete('/:id', streamController.delete)

module.exports = routes;
