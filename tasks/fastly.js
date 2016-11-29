const async = require('async');
const url = require('url');

module.exports = function (grunt) {

  grunt.registerMultiTask('fastly', 'A Grunt plugin to purge cache from Fastly', function () {

    let fastly = require('fastly');
    let done = this.async();

    const options = this.options({
      purgeAll: false,
      concurrentPurges: 10
    });

    if (!options.key) {
      grunt.fail.fatal('Fastly API key is required.');
    }

    fastly = fastly(options.key);

    // Purge all cache from a service
    if (options.purgeAll) {
      if (!options.serviceId) {
        grunt.fail.fatal('A serviceId must be provided when purging all cache.');
      }

      grunt.log.write(`PurgeAll from ${options.serviceId}…`);

      fastly.purgeAll(options.serviceId, (err) => {
        if (err) {
          grunt.log.error();
        } else {
          grunt.log.ok();
        }

        done();
      });

      return;
    }

    // Purge content matching key
    if (options.purgeKey) {
      if (!options.serviceId) {
        grunt.fail.fatal('A serviceId must be provided when purging surrogate keys.');
      }

      grunt.log.write(`Purging Key ${options.purgeKey} from ${options.serviceId}…`);

      fastly.purgeKey(options.serviceId, options.purgeKey, (err) => {
        if (err) {
          grunt.log.error();
        } else {
          grunt.log.ok();
        }

        done();
      });

      return;
    }

    // Purge only specific urls
    if (!options.host) {
      grunt.fail.fatal('If purging specific urls, a host must be provided.');
    }

    if (!options.urls) {
      options.urls = [];
    }

    async.eachLimit(options.urls, options.concurrentPurges, (path, callback) => {

      const uri = url.format({
        host: options.host,
        pathname: path
      });

      fastly.purge(options.host, path, (err) => {
        if (err) {
          grunt.log.error();
        } else {
          grunt.log.writeln(`Purged: ${uri}`);
        }

        callback();
      });

    }, done);

  });
};
