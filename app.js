'use strict';

var express = require('express'),
    https = require('https'),
    config = require('./config/config'),
    app = express(),
    WebsocketServer = require('./modules/websocket/controller/websocket').WebsocketServer,
    server, ws,

    gameRoutes = require('./modules/game/routes/game.js'),
    highscoreRoutes = require('./modules/highscore/routes/highscore.js');

server = https.createServer(config.getHttpsCredentials(), app)
    .listen(config.server.port, config.server.ip, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Game server started ...');
        console.log('Lstening at https://%s:%s', host, port);
    });

ws = new WebsocketServer({server: server});

// test websocket listener
ws.addListener('test', {
    echo: function(socket, params, data) {
        if (!!params.toUpper) {
            data = data.toUpperCase();
        }
        socket.send(data);
    }
});

// register routes
// add routing with default route prefix
app.use('/', gameRoutes);
app.use('/highscore', highscoreRoutes);
