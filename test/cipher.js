'use strict';
/**
 * @file cipher test
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
describe('cipher', function() {

  var ak = __dirname + '/../examples/crypted_ak';
  var rc = __dirname + '/../examples/crypted_rc';

  describe('autokey', function() {

    it('should return decrypt autokey file', function(done) {

      var c = 0;
      var readline = startline({
        file: ak,
        autokey: 'hex7c0',
        encoding: null,
      });

      readline.on('line', function(line) {

        if (c === 0) {
          assert.equal(line, 'ciao I\'m hex7c0');
        } else if (c === 1) {
          assert.equal(line, 'How are you?');
        } else if (c === 1) {
          assert.equal(line, ':D');
        } else {
          done();
        }
        c++;
      });
    });
  });

  describe('rc4', function() {

    it('should return decrypt arc4 file', function(done) {

      var c = 0;
      var readline = startline({
        file: rc,
        rc4: 'hex7c0',
        encoding: null,
      });

      readline.on('line', function(line) {

        if (c === 0) {
          assert.equal(line, 'ciao I\'m hex7c0');
        } else if (c === 1) {
          assert.equal(line, 'How are you?');
        } else if (c === 1) {
          assert.equal(line, ':D');
        } else {
          done();
        }
        c++;
      });
    });
  });
});
