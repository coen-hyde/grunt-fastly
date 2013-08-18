'use strict';

var grunt = require('grunt')
  , fastly = require('fastly')
  , _ = grunt.util._;

exports.fastly = {
  purgeAll: function(test) {
    test.expect(2);

    var calls = _.filter(fastly.calls, function(call) {
      return (call['method'] == 'purgeAll');
    });

    test.equal(calls.length, 1, 'Number of calls to purgeAll');
    test.equal(calls[0].arguments['0'], 'service id', 'The service id to purge');
    test.done();
  },

  purgeUrls: function(test) {
    test.expect(3);

    var calls = _.filter(fastly.calls, function(call) {
      return (call['method'] == 'purge');
    });

    test.equal(calls.length, 3, 'Number of calls to purgeAll');
    test.equal(calls[0].arguments['0'], 'example.com', 'The host purge');
    test.equal(calls[0].arguments['1'], 'folder/picture1.jpg', 'The url purge');
    test.done();
  }
};
