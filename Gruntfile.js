'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

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
      purgeKey: {
        options: {
          purgeKey: 'surrogate-key',
          serviceId: 'service id'
        }
      },
      purgeFiles: {
        options: {
          host: 'example.com',
          urls: [
            'folder/picture1.jpg',
            'folder/picture2.jpg',
            'folder/picture3.jpg'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: {
      options: {
        configFile: '.eslint.json'
      },
      target: [
        'tasks/*.js'
      ]
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'eslint'
  ]);

};
