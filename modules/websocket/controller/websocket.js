'use strict';

var WebsocketWrapper = require('websocket-wrapper').WebsocketWrapper,
    WebsocketServer;

WebsocketServer = function(options) {
    this.wsWrapper = new WebsocketWrapper(options);
    return this;
};

WebsocketServer.prototype.addListener = function(name, listener) {
    this.wsWrapper.addListener(name, listener);
};

WebsocketServer.prototype.getListener = function(name, listener) {
    this.wsWrapper.getListener(name, listener);
};

module.exports.WebsocketServer = WebsocketServer;
