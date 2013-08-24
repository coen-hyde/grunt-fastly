/*
 * grunt-fastly
 * https://github.com/coen-hyde/grunt-fastly
 *
 * Copyright (c) 2013 Coen Hyde
 * Licensed under the MIT license.
 */

'use strict';

var fastly = require('fastly')
  , async = require('async')
  , url = require('url');

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

    if (typeof options.key === 'undefined') {
      grunt.fail.fatal('Fastly api key is required.');
    }

    fastly.authenticate(options.key);

    // Purge all cache from a service
    if (options.purgeAll) {
      if (typeof options.serviceId === 'undefined') {
        grunt.fail.fatal('A serviceId must be provided when purging all cache.');
      }

      grunt.log.write('PurgeAll from "'+options.serviceId+'"...');
      fastly.purgeAll(options.serviceId, function(err) {
        if (err) grunt.log.error();
        else grunt.log.ok();

        done();
      });
      return
    }

    // Purge only specific urls
    if (typeof options.host === 'undefined') {
      grunt.fail.fatal('If purging specific urls, a host must be provided.');
    }

    if (typeof this.data.urls === 'undefined') {
      this.data.urls = [];
    }

    async.eachLimit(this.data.urls, options.concurrentPurges, function(uriPath, next) {
      var uri = url.format({host: options.host, pathname: uriPath}).substr(2);

      fastly.purge(options.host, uriPath, function(err) {
        if (err) grunt.log.error();
        else grunt.log.writeln('Purged: '+uri);

        next();
      });
    }, done);
  });
};
