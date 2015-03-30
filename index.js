'use strict';
/**
 * @file startline main
 * @module startline
 * @subpackage main
 * @version 1.4.0
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
function interfac(options, start, end) {

  var go;
  if (end >= 0) {
    go = fs.createReadStream(options.file, {
      flags: options.flag,
      mode: options.mode,
      encoding: options.encoding,
      autoClose: options.autoClose,
      start: start,
      end: end,
      fd: null,
    });
  } else {
    go = fs.createReadStream(options.file, {
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
function readlin(options, start, end) {

  return readline.createInterface({
    input: interfac(options, start, end),
    output: null,
    terminal: false,
  });
}

/**
 * export class
 * 
 * @exports startline
 * @function startline
 * @param {Object} opt - various options. Check README.md
 * @return {Startline}
 */
function startline(opt) {

  var options = opt || Object.create(null);

  // file
  var file;
  if (Boolean(options.file)) {
    file = require('path').resolve(String(options.file));
    if (!fs.existsSync(file)) {
      throw new Error('file does not exist');
    }
    if (!fs.statSync(file).isFile()) {
      throw new Error('path is not a file');
    }
  } else {
    throw new Error('"file" is required');
  }

  // clean
  var my = {
    file: file,
    encoding: options.encoding,
    flag: String(options.flag || 'r'),
    mode: Number(options.mode) || 444,
    autoClose: options.autoClose === false ? false : true,
    start: Number(options.start) || 0,
    end: Number(options.end),
    rc4: options.rc4,
    autokey: options.autokey,
    lodash: Boolean(options.autokey),
  };

  return new Startline(my);
}
module.exports = startline;

/*
 * class
 */
/**
 * Startline class
 * 
 * @class Startline
 * @param {Object} options - various options. Check README.md
 */
function Startline(options) {

  event.call(this);
  var self = this; // closure
  var temp = '';
  this.options = options;
  this.head = 0;
  this.tail = 0;
  this.line = 0;
  this._stream = null;

  if (options.rc4 || options.autokey) { // cipher
    var cipher;
    this._stream = interfac(this.options, options.start, options.end);
    if (options.rc4) {
      cipher = require('arc4')('arc4', String(options.rc4), options.lodash);
      this._stream.on('data', function(callbacks) {

        var callback = cipher.decodeBuffer(callbacks).toString();
        for (var i = 0, ii = callback.length; i < ii; i++) {
          if (callback[i] === eol) {
            self.tail = self.head + self.line;
            self.head = self.tail + temp.length;
            self.emit('line', temp);
            self.line = 1;
            temp = '';
          } else {
            temp += callback[i];
          }
        }
        if (temp.length > 0) {
          self.tail = self.head + self.line;
          self.head = self.tail + temp.length;
          self.emit('line', temp);
          self.line = 1;
        }
        return;
      });

    } else {
      cipher = require('autokey')(String(options.autokey), options.lodash);
      this._stream.on('data', function(callbacks) {

        var callback = cipher.decodeBuffer(callbacks).toString();
        for (var i = 0, ii = callback.length; i < ii; i++) {
          if (callback[i] === eol) {
            self.tail = self.head + self.line;
            self.head = self.tail + temp.length;
            self.emit('line', temp);
            self.line = 1;
            temp = '';
          } else {
            temp += callback[i];
          }
        }
        if (temp.length > 0) {
          self.tail = self.head + self.line;
          self.head = self.tail + temp.length;
          self.emit('line', temp);
          self.line = 1;
        }
        return;
      });
    }

  } else if (options.end >= 0) { // no cipher, EOF
    this._stream = interfac(this.options, options.start, options.end);
    this._stream.on('data', function(callbacks) {

      var callback = callbacks.toString();
      for (var i = 0, ii = callback.length; i < ii; i++) {
        if (callback[i] === eol) {
          self.tail = self.head + self.line;
          self.head = self.tail + temp.length;
          self.emit('line', temp);
          self.line = 1;
          temp = '';
        } else {
          temp += callback[i];
        }
      }
      if (temp.length > 0) {
        self.tail = self.head + self.line;
        self.head = self.tail + temp.length;
        self.emit('line', temp);
        self.line = 1;
      }
      return;
    });

  } else { // file
    this._stream = readlin(this.options, options.start, options.end);
    this._stream.on('line', function(callback) {

      self.tail = self.head + self.line;
      self.head = self.tail + callback.length;
      self.emit('line', callback);
      self.line = 1;
      return;
    });
  }

  // standard events
  this._stream.on('pause', function() {

    return self.emit('pause');
  }).on('resume', function() {

    return self.emit('resume');
  }).on('open', function(fd) {

    return self.emit('open', fd);
  }).on('close', function() {

    return self.emit('close');
  }).on('end', function() {

    return self.emit('end');
  }).on('error', function(err) {

    return self.emit('error', err);
  });
}
inherits(Startline, event);

/**
 * _stream pause
 * 
 * @function pause
 */
Startline.prototype.pause = function() {

  return this._stream.pause();
};

/**
 * _stream resume
 * 
 * @function resume
 */
Startline.prototype.resume = function() {

  return this._stream.resume();
};

/**
 * read file with different limit
 * 
 * @function read
 * @param {Integer} start - starting bytes
 * @param {Integer} [end] - ending bytes
 * @return {Startline}
 */
Startline.prototype.read = function(start, end) {

  var my = this.options;
  my.start = Number(start) || 0;
  my.end = Number(end);
  return new Startline(my);
};
