'use strict';

var express = require('express'),
    https = require('https'),
    config = require('./config/config'),
    app = express(),

    server, ws,

// websocket
    WebsocketServer = require('websocket-wrapper').WebsocketWrapper,

// swig
    swig = require('swig'),

// routing
    gameRoutes = require('./modules/game/routes/game.js'),
    highscoreRoutes = require('./modules/highscore/routes/highscore.js');

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

// init websocket server
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

// swig integration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '\\modules\\');

// serve static content
app.use('/public', express.static('./public'));
// TODO best practice for this  app structure as well as module structure with paths

