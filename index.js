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
 * build _stream interface
 * 
 * @function interfac
 * @param {Object} options - various options. Check README.md
 * @param {Integer} start - starting bytes
 * @param {Integer} [end] - ending bytes
 * @return {Objetc}
 */
function interfac(options,start,end) {

    var start = parseInt(start) || 0;
    var end = parseInt(end);
    var go;
    if (end >= 0) {
        go = readline.createInterface({
            input: fs.createReadStream(options.file,{
                flags: options.flag,
                mode: options.mode,
                encoding: options.encoding,
                autoClose: options.autoClose,
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
                autoClose: options.autoClose,
                start: start,
                fd: null,
            }),
            output: null,
            terminal: false,
        });
    }
    return go;
}
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
    my.start = parseInt(options.start);
    my.end = parseInt(options.end);
    my.autoClose = options.autoClose == false ? false : true;
    my.arc4 = options.arc4 == true ? true : false;

    return new STARTLINE(my);
};

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
    this.head = 0;
    this.tail = 0;
    this._stream = interfac(this.options,options.start,options.end);
    var self = this; // closure

    this._stream.on('line',function(callback) {

        self.tail = self.head + 2; // .\n
        self.head += callback.length;

        self.emit('line',callback);
        return;
    });
    this._stream.on('pause',function() {

        self.emit('pause');
        return;
    });
    this._stream.on('resume',function() {

        self.emit('resume');
        return;
    });
    this._stream.on('close',function() {

        self.emit('close');
        return;
    });
    this._stream.on('error',function() {

        self.emit('error');
        return;
    });
};
inherits(STARTLINE,EventEmitter);
/**
 * _stream pause
 * 
 * @function pause
 * @return
 */
STARTLINE.prototype.pause = function() {

    this._stream.pause();
    return;
};
/**
 * _stream resume
 * 
 * @function resume
 * @return
 */
STARTLINE.prototype.resume = function() {

    this._stream.resume();
    return;
};
/**
 * read file with different limit
 * 
 * @function read
 * @param {Integer} start - starting bytes
 * @param {Integer} [end] - ending bytes
 * @return {STARTLINE}
 */
STARTLINE.prototype.read = function(start,end) {

    var my = this.options;
    my.start = parseInt(start);
    my.end = parseInt(end);
    return new STARTLINE(my);
};
