"use strict";
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
describe('paragraph',function() {

    var path = __dirname + '/../examples/lorem.txt';

    it('1° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 1) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'1');
                done();
                return;
            });
        }
    });

    it('2° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 2) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'2');
                done();
                return;
            });
        }
    });

    it('3° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 3) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'3');
                done();
                return;
            });
        }
    });

    it('4° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 4) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'4');
                done();
                return;
            });
        }
    });

    it('5° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 5) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'5');
                done();
                return;
            });
        }
    });

    it('6° - should return paragraph',function(done) {

        var readline = startline({
            file: path
        });
        var c = 0;
        readline.on('line',function(line) {

            c++;
            var p;
            if (c == 6) {
                p = line;
                neww(readline.read(readline.tail - 0,readline.head),p);
            }
            return;
        });

        function neww(l,p) {

            l.on('line',function(line) {

                assert.deepEqual(line,p,'6');
                done();
                return;
            });
        }
    });
});
