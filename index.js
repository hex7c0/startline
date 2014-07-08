"use strict";
/**
 * @file startline main
 * @module startline
 * @package startline
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var fs = require('fs');
var readline = require('readline');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/*
 * functions
 */
/**
 * export class
 * 
 * @exports startline
 * @function startline
 * @param {Object} options - various options. Check README.md
 * @return {STARTLINE}
 */
module.exports = function startline(options) {

    var options = options || Object.create(null);
    var my = Object.create(null);
    var file;

    // file
    if (file = String(options.file)) {
        if (!fs.existsSync(file)) {
            throw new Error(file + ' not exists');
        }
        my.file = require('path').resolve(file);
    } else {
        throw new Error('"file" is required');
    }

    // clean
    my.flag = String(options.flag || 'r');
    my.encoding = String(options.encoding || 'utf-8');
    my.mode = parseInt(options.mode) || 444;
    my.start = parseInt(options.start) || 0;
    my.end = parseInt(options.end) || 0;

    return new STARTLINE(my);
};
/**
 * build stream interface
 * 
 * @function interfac
 * @param {Object} options - various options. Check README.md
 * @param {Integer} start - starting byte
 * @param {Integer} [end] - ending byte
 * @return {Objetc}
 */
function interfac(options,start,end) {

    var start = parseInt(start) || 0;
    var go;
    if (parseInt(end)) {
        go = readline.createInterface({
            input: fs.createReadStream(options.file,{
                flags: options.flag,
                mode: options.mode,
                encoding: options.encoding,
                start: start,
                end: end,
                fd: null,
            }),
            output: null,
            terminal: false,
        });
    } else {
        go = readline.createInterface({
            input: fs.createReadStream(options.file,{
                flags: options.flag,
                mode: options.mode,
                encoding: options.encoding,
                start: start,
                fd: null,
            }),
            output: null,
            terminal: false,
        });
    }
    return go;
}

/*
 * class
 */
/**
 * STARTLINE class
 * 
 * @class STARTLINE
 * @param {Object} options - various options. Check README.md
 * @return
 */
function STARTLINE(options) {

    EventEmitter.call(this)

    this.options = options;
    this.stream = interfac(this.options,options.start);
    var self = this;

    this.stream.on('line',function(callback) {

        self.emit('line',callback);
        return;
    });
    this.stream.on('pause',function() {

        self.emit('pause');
        return;
    });
    this.stream.on('resume',function() {

        self.emit('resume');
        return;
    });
    this.stream.on('close',function() {

        self.emit('close');
        return;
    });
    this.stream.on('error',function() {

        self.emit('error');
        return;
    });
};
inherits(STARTLINE,EventEmitter);
/**
 * stream pause
 * 
 * @function pause
 * @return
 */
STARTLINE.prototype.pause = function() {

    this.stream.pause();
    return;
};
/**
 * stream resume
 * 
 * @function resume
 * @return
 */
STARTLINE.prototype.resume = function() {

    this.stream.resume();
    return;
};
/**
 * read file with different limit
 * 
 * @function read
 * @param {Integer} start - starting byte
 * @param {Integer} [end] - ending byte
 * @return
 */
STARTLINE.prototype.read = function(start,end) {

    this.stream = interfac(this.options,start,end);
    return;
};
