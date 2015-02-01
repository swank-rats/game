'use strict';

var swigPackage = require('swig'),
    swig;

swig = {
    /**
     * Initializes swig integration
     * @param app
     * @param fileExt
     * @param path
     */
    init: function(app, fileExt, path) {
        // swig integration
        app.engine(fileExt, swigPackage.renderFile);
        app.set('view engine', fileExt);
        app.set('views', path);
    }
};

module.exports = swig;
