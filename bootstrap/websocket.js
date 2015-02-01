'use strict';

var WebsocketServer = require('websocket-wrapper').WebsocketWrapper,
    _ws, websocket;

websocket = {
    init: function(server) {
        _ws = new WebsocketServer({server: server});

        // test websocket listener
        _ws.addListener('test', {
            echo: function(socket, params, data) {
                if (!!params.toUpper) {
                    data = data.toUpperCase();
                }
                socket.send(data);
            }
        });
    },
    addListener: function(name, listener) {
        _ws.addListener(name, listener);
    },
    getListener: function(name) {
        return _ws.getListener(name);
    }
};

module.exports = websocket;
