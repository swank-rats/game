'use strict';

module.exports = function(grunt) {

    // load all modules starting with "grunt-"
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['bower_components/*/dist/**.js'], dest: 'public/js/'},
                ]
            }
        }
    });

    grunt.registerTask('copy', [copy]);

};
