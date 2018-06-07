const express = require('express');
const router = express.Router();

router.options(/\/api*/, (req,res) => {
    res.status(204).send().end();
});

router.use((error,req,res,next) => {
	res.status(error.status || 500).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

router.get('*', (req, res) => {
    res.status(404).send({
        message: '404 not founds'
    }).end();
});

module.exports = router; 