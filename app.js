'use strict';

var express = require('express'),
    https = require('https'),
    config = require('./config/config'),

    swig = require('./bootstrap/swig'),
    routing = require('./bootstrap/routing'),
    websocket = require('./bootstrap/websocket'),

    app = express(),
    server;

/**
 * Creates a https webserver instance
 * @type {*|http.Server}
 */
server = https.createServer(config.getHttpsCredentials(), app)
    .listen(config.server.port, config.server.ip, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Game server started ...');
        console.log('Lstening at https://%s:%s', host, port);
    });

// init important basic services
routing.init(app);
websocket.init(server);
swig.init(app, 'html', __dirname + '/modules/');

// serve static content
app.use('/public', express.static('./public'));
