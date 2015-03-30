'use strict';
/**
 * @file error test
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
var assert = require('assert');

/*
 * test module
 */
describe('error', function() {

  it('should Error exception without file', function(done) {

    try {
      var readline = startline();
    } catch (e) {
      assert.equal(e.message, '"file" is required');
      done();
    }
  });
  it('should Error exception wrong file', function(done) {

    try {
      var readline = startline({
        file: __dirname + '/foo',
      });
    } catch (e) {
      assert.equal(e.message, 'file does not exist');
      done();
    }
  });
  it('should Error exception wrong file', function(done) {

    try {
      var readline = startline({
        file: __dirname,
      });
    } catch (e) {
      assert.equal(e.message, 'path is not a file');
      done();
    }
  });
});
