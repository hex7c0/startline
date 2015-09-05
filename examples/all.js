'use strict';
/**
 * @file read all file example
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

var readline = startline({
  file: 'lorem.txt', // print lorem ipsum
});

readline.on('line', function(line) {

  console.log(line); // print every line
}).on('close', function(line) {

  console.log('read ' + readline.head); // print read lines
});
