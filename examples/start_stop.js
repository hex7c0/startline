"use strict";
/**
 * @file start & stop read example
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

// print third paragraph
var readline = startline({
    file: 'lorem.txt',
});

var c = 0;
var self = readline
readline.on('line',function(line) {

    c++;
    if (c == 3) {
        console.log(line);
        neww(readline.read(readline.tail,readline.head));
    }
    return;
});

function neww(p) {

    p.on('line',function(line) {

        console.log(line);
        return;
    });
}
