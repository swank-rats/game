'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: './bower_components/jquery/dist',
                    src: '*',
                    dest: 'public/js',
                    flatten: false,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: './bower_components/materialize/dist',
                    src: '**',
                    dest: 'public/',
                    flatten: false,
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('publish', ['copy']);

};
