'use strict';
/**
 * @file rc4 example
 * @module startline
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var startline = require('..'); // use require('startline') instead

// print hello
var readline = startline({
  file: 'crypted_rc',
  rc4: 'hex7c0',
  encoding: null,
});

readline.on('line', function(line) {

  console.log(line);
});
