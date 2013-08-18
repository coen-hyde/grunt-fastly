/*
 * grunt-fastly
 * https://github.com/coen-hyde/grunt-fastly
 *
 * Copyright (c) 2013 Coen Hyde
 * Licensed under the MIT license.
 */

'use strict';

var fastly = require('fastly');

module.exports = function(grunt) {
  var _ = grunt.util._;

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Configuration to be run (and then tested).
    fastly: {
      options: {
        key: 'abc'
      },
      purgeAll: {
        options: {
          purgeAll: true,
          serviceId: 'service id'
        }
      },
      purgeFiles: {
        options: {
          host: 'example.com'
        },
        urls: [
          'folder/picture1.jpg',
          'folder/picture2.jpg',
          'folder/picture3.jpg'
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('mock-fastly', function() {
    var mocker = function(fnName) {
      return function() {
        if (typeof this.calls === 'undefined') {
          this.calls = [];
        }

        this.calls.push({method: fnName, arguments: arguments});

        // Call the call back
        _.last(arguments)();
      }
    }

    fastly.purgeAll = mocker('purgeAll');
    fastly.purge = mocker('purge');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['mock-fastly', 'fastly', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
