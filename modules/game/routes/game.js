'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('../controller/game');

router.get('/', function(req, res) {
    res.send(controller.get());
});

module.exports = router;
