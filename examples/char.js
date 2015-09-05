'use strict';
/**
 * @file read first char example
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

// print L
var readline = startline({
  file: 'lorem.txt',
  end: 0, // stop after 1° char
});

readline.on('line', function(line) {

  console.log(line); // print only one char
}).on('close', function(line) {

  console.log('read ' + readline.head); // print "1"
});
