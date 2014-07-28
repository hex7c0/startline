"use strict";
/**
 * @file startline main
 * @module startline
 * @package startline
 * @subpackage main
 * @version 1.3.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var fs = require('fs');
var readline = require('readline');
var event = require('events').EventEmitter;
var inherits = require('util').inherits;
var eol = require('os').EOL;

/*
 * functions
 */
/**
 * build stream interface
 * 
 * @function interfac
 * @param {Object} options - various options. Check README.md
 * @param {Integer} start - starting bytes
 * @param {Integer} [end] - ending bytes
 * @return {Objetc}
 */
function interfac(options,start,end) {

    var go;
    if (end >= 0) {
        go = fs.createReadStream(options.file,{
            flags: options.flag,
            mode: options.mode,
            encoding: options.encoding,
            autoClose: options.autoClose,
            start: start,
            end: end,
            fd: null,
        });
    } else {
        go = fs.createReadStream(options.file,{
            flags: options.flag,
            mode: options.mode,
            encoding: options.encoding,
            autoClose: options.autoClose,
            start: start,
            fd: null,
        });
    }
    return go;
}

/**
 * build readline interface
 * 
 * @function readlin
 * @param {Object} options - various options. Check README.md
 * @param {Integer} start - starting bytes
 * @param {Integer} [end] - ending bytes
 * @return {Objetc}
 */
function readlin(options,start,end) {

    var go;
    go = readline.createInterface({
        input: interfac(options,start,end),
        output: null,
        terminal: false,
    });
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

    // file
    if (Boolean(options.file)) {
        my.file = require('path').resolve(String(options.file));
        if (!fs.existsSync(my.file)) {
            var err = my.file + ' not exists';
            throw new Error(err);
        }
    } else {
        var err = '"file" is required';
        throw new Error(err);
    }

    // clean
    my.encoding = options.encoding;
    my.flag = String(options.flag || 'r');
    my.mode = Number(options.mode) || 444;
    my.autoClose = options.autoClose == false ? false : true;
    my.start = Number(options.start) || 0;
    my.end = Number(options.end);
    my.rc4 = options.rc4;
    my.autokey = options.autokey;

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
 */
function STARTLINE(options) {

    event.call(this);
    var self = this; // closure
    var temp = '';
    this.options = options;
    this.head = 0;
    this.tail = 0;
    this.line = 0;
    this._stream;

    if (options.rc4 || options.autokey) {
        var cipher;
        this._stream = interfac(this.options,options.start,options.end);
        if (options.rc4) {
            cipher = require('arc4')(String(options.rc4));
            this._stream.on('data',function(callback) {

                var callback = cipher.codeBuffer(callback).toString();
                for (var i = 0, ii = callback.length; i < ii; i++) {
                    if (callback[i] == eol) {
                        self.tail = self.head + self.line;
                        self.head = self.tail + temp.length;
                        self.emit('line',temp);
                        self.line = 1;
                        temp = '';
                    } else {
                        temp += callback[i];
                    }
                }
                if (temp.length > 0) {
                    self.tail = self.head + self.line;
                    self.head = self.tail + temp.length;
                    self.emit('line',temp);
                    self.line = 1;
                }
                return;
            });
        } else {
            cipher = require('autokey')(String(options.autokey));
            this._stream.on('data',function(callback) {

                var callback = cipher.decodeBuffer(callback).toString();
                for (var i = 0, ii = callback.length; i < ii; i++) {
                    if (callback[i] == eol) {
                        self.tail = self.head + self.line;
                        self.head = self.tail + temp.length;
                        self.emit('line',temp);
                        self.line = 1;
                        temp = '';
                    } else {
                        temp += callback[i];
                    }
                }
                if (temp.length > 0) {
                    self.tail = self.head + self.line;
                    self.head = self.tail + temp.length;
                    self.emit('line',temp);
                    self.line = 1;
                }
                return;
            });
        }
    } else if (options.end >= 0) {
        this._stream = interfac(this.options,options.start,options.end);
        this._stream.on('data',function(callback) {

            var callback = callback.toString();
            for (var i = 0, ii = callback.length; i < ii; i++) {
                if (callback[i] == eol) {
                    self.tail = self.head + self.line;
                    self.head = self.tail + temp.length;
                    self.emit('line',temp);
                    self.line = 1;
                    temp = '';
                } else {
                    temp += callback[i];
                }
            }
            if (temp.length > 0) {
                self.tail = self.head + self.line;
                self.head = self.tail + temp.length;
                self.emit('line',temp);
                self.line = 1;
            }
            return;
        });
    } else {
        this._stream = readlin(this.options,options.start,options.end);
        this._stream.on('line',function(callback) {

            self.tail = self.head + self.line;
            self.head = self.tail + callback.length;
            self.emit('line',callback);
            self.line = 1;
            return;
        });
    }
    this._stream.on('pause',function() {

        self.emit('pause');
        return;
    });
    this._stream.on('resume',function() {

        self.emit('resume');
        return;
    });
    this._stream.on('open',function(fd) {

        self.emit('open',fd);
        return;
    });
    this._stream.on('close',function() {

        self.emit('close');
        return;
    });
    this._stream.on('end',function() {

        self.emit('end');
        return;
    });
    this._stream.on('error',function(err) {

        self.emit('error',err);
        return;
    });
}
inherits(STARTLINE,event);
/**
 * _stream pause
 * 
 * @function pause
 */
STARTLINE.prototype.pause = function() {

    this._stream.pause();
    return;
};
/**
 * _stream resume
 * 
 * @function resume
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
    my.start = Number(start) || 0;
    my.end = Number(end);
    return new STARTLINE(my);
};
