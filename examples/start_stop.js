'use strict';
/**
 * @file start & stop read example
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

// print third paragraph
var readline = startline({
  file: 'lorem.txt'
});

var c = 0;
readline.on('line', function(line) {

  c++;
  if (c == 3) {
    console.log(line);
    neww(readline.read(readline.tail, readline.head + 1));
  }
});

function neww(p) {

  p.on('line', function(line) {

    console.log(line);
  });
}
