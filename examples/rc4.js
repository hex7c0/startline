"use strict";
/**
 * @file rc4 example
 * @module startline
 * @package startline
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var startline = require('../index.js'); // use require('startline') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

// print lorem ipsum
var readline = startline({
    file: 'crypted',
    rc4: 'hex7c0',
    encoding: null,
});

readline.on('line',function(line) {

    console.log(line);
    return;
});
// readline.on('close',function(line) {
//
// console.log('read ' + readline.head);
// return;
// });
// var fs = require('fs');
// fs.readFileSync(
// '/Users/francescocarnielli/Workspace/startline/examples/crypted',
// 'utf8',function(err,callback) {
//
// if (err) {
// return console.log(err);
// }
// console.log(data);
// })
