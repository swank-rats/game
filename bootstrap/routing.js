'use strict';

// routing
var gameRoutes = require('./../modules/game/routes/game.js'),
    highscoreRoutes = require('./../modules/highscore/routes/highscore.js'),
    routing;

routing = {

    /**
     * Registers rounting of modules
     * @param {Object} app
     */
    init: function(app) {
        // add routing with default route prefix
        app.use('/', gameRoutes);
        app.use('/highscore', highscoreRoutes);
    }
};

module.exports = routing;
