'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('../controller/game');

router.get('/', function(req, res) {
    res.render('game\\views\\game', {title: controller.get()});
});

module.exports = router;
