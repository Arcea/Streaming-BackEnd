const express = require('express');
const router = express.Router();

//Declare any routes here.
const authRoutes = require('./routes/index');
router.use('/auth', authRoutes);

//Catching all other requests
router.get('*', (req, res) => {
    res.status(404).send({
        message: '404 not founds'
    }).end();
});

module.exports = router; 