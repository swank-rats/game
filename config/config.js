'use strict';

var fs = require('fs'),
    config = {

        // configure server settings
        server: {
            ip: '127.0.0.1',
            port: '3001',

            https: {
                keyFile: './key.pem',
                certificateFile: './server.crt'
            }
        },

        game: {
            imageServer: '',
            websocketServer: '',

            forms: ['circle', 'square']
        },

        /**
         * Returns credential object for https server
         * @return {{keyFile: *, cert: *}}
         */
        getHttpsCredentials: function() {
            if (!!fs.existsSync(this.server.https.keyFile) &&
                !!fs.existsSync(this.server.https.certificateFile)) {
                return {
                    key: fs.readFileSync(this.server.https.keyFile, 'utf8'),
                    cert: fs.readFileSync(this.server.https.certificateFile, 'utf8')
                };
            } else {
                throw new Error('Credentialfiles (' +
                this.server.https.keyFile + ',' +
                this.server.https.certificateFile +
                ') are missing!');
            }
        }
    };

module.exports = config;
