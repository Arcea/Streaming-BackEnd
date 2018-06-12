var express = require('express');
var routes = express.Router();
var chatController = require('../controllers/ChatController');

module.exports = {}

routes.post('/chat', chatController.Chat);
routes.get('/chat/:id', chatController.GetStreamChat);

module.exports = routes;