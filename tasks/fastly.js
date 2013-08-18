/*
 * grunt-fastly
 * https://github.com/coen-hyde/grunt-fastly
 *
 * Copyright (c) 2013 Coen Hyde
 * Licensed under the MIT license.
 */

'use strict';

var fastly = require('fastly')
  , async = require('async');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fastly', 'A Grunt plugin to purge cache from Fastly', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      purgeAll: false,
      concurrentPurges: 10
    });

    fastly.authenticate(options.key);

    // Purge all cache from a service
    if (options.purgeAll) {
      if (typeof options.serviceId === 'undefined') {
        grunt.log.error('A serviceId must be provided when purging all cache.');
        return false
      }

      fastly.purgeAll(options.serviceId, done);
      return
    }

    // Purge only specific urls
    if (typeof options.host === 'undefined') {
      grunt.log.error('If purging specific urls, a host must be provided.');
      return false
    }

    if (typeof this.data.urls === 'undefined') {
      this.data.urls = [];
    }

    async.eachLimit(this.data.urls, options.concurrentPurges, function(url, next) {
      fastly.purge(options.host, url, next);
    }, done);
  });
};
