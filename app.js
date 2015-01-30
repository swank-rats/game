'use strict';

// TODO structure?

var express = require('express'),
    fs = require('fs'),
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

// TODO into seperate module
// TODO add bower for jquery and materialize
// TODO best practice for this stuff below and app structure as well as module structure with paths
app.get('/public/*', function(req, res) {
    var pathToFile = req.url.substr(1, req.url.length - 1),
        suffix = pathToFile.substr(pathToFile.lastIndexOf('.')+1);
    fs.exists(pathToFile, function(exists) {

        if (!exists) {
            res.writeHead(404);
            throw new Error('File (' + pathToFile + ') not found!');
        }

        fs.readFile(pathToFile, 'utf8', function(err, result) {
            if (!!err) {
                res.writeHead(404);
                throw new Error('File (' + pathToFile + ') not found!');
            }

            switch(suffix){
                case 'js':
                    res.writeHead(200, {'Content-Type': 'application/javascript'});
                    break;
                case 'css':
                    res.writeHead(200, {'Content-Type': 'text/css'});
                    break;
                default:
                    res.writeHead(200, {'Content-Type': 'application/text'});
                    break;
            }
            res.end(result);
        });
    });
});
