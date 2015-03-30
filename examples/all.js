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

// print lorem ipsum
var readline = startline({
  file: 'lorem.txt',
});

readline.on('line', function(line) {

  console.log(line);
}).on('close', function(line) {

  console.log('read ' + readline.head);
});
