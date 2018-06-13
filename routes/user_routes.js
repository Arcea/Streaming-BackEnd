var express = require('express');
var routes = express.Router();
var userController = require('../controllers/UserController');

module.exports = {}

routes.post('/update', userController.Update);
routes.get('/:id', userController.Get);

module.exports = routes;