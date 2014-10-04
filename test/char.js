'use strict';
/**
 * @file char test
 * @module startline
 * @package startline
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var startline = require('../index.min.js'); // use require('startline') instead
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('char',function() {

    it('should return one char',function(done) {

        var readline = startline({
            file: __dirname + '/../examples/lorem.txt',
            end: 0,
        });
        readline.on('line',function(line) {

            assert.deepEqual(line,'L','clear');
            done();
            return;
        });
    });
});
