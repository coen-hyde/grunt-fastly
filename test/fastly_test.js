'use strict';

var grunt = require('grunt')
  , fastly = require('fastly')
  , _ = grunt.util._;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

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

    test.equal(calls.length, 1, 'Number of calls to purgeAll');
    test.equal(calls[0].arguments['0'], 'example.com', 'The host purge');
    test.equal(calls[0].arguments['1'], 'folder/picture.jpg', 'The url purge');
    test.done();
  }
};
