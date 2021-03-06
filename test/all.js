'use strict';
/**
 * @file all test
 * @module startline
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var startline = require('..');
var fs = require('fs');
var assert = require('assert');

/*
 * test module
 */
describe('all', function() {

  var path = __dirname + '/../examples/lorem.txt';

  it('should return all file', function(done) {

    var ALL = fs.readFileSync(path, {
      encoding: 'utf8'
    });
    var readline = startline({
      file: path,
    });
    var all = '';
    var c = 0;
    readline.on('line', function(line) {

      c++;
      all += line + '\n';
      if (c == 6) {
        var size = fs.statSync(path);
        assert.deepEqual(readline.head, size.size - 1, 'size');
        assert.deepEqual(all, ALL, 'all');
        done();
      }
    });
  });
  it('should return same size -1', function(done) {

    var readline = startline({
      file: path,
    });
    readline.on('close', function(line) {

      var size = fs.statSync(path);
      assert.deepEqual(readline.head, size.size - 1, 'size');
      done();
    });
  });
});
