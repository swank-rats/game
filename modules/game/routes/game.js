'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('../controller/game'),

    modulePathPrefix = 'game\\views\\'; // TODO better way?

router.get('/', function(req, res) {
    res.render(modulePathPrefix + 'game', {title: controller.get(req.query.name)});
});

module.exports = router;
