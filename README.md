# [startline](http://supergiovane.tk/#/startline)

[![NPM version](https://badge.fury.io/js/startline.svg)](http://badge.fury.io/js/startline)
[![Build Status](https://travis-ci.org/hex7c0/startline.svg?branch=master)](https://travis-ci.org/hex7c0/startline)
[![devDependency Status](https://david-dm.org/hex7c0/startline/dev-status.svg)](https://david-dm.org/hex7c0/startline#info=devDependencies)

Stream readline with starting and ending point for [nodejs](http://nodejs.org/).
You can even encode a file with [rc4](https://github.com/hex7c0/arc4) cipher, or [autokey](https://github.com/hex7c0/autokey).

## Installation

Install through NPM

```bash
npm install startline
```
or
```bash
git clone git://github.com/hex7c0/startline.git
```

## API

inside nodejs project
```js
var readline = startline({
    file: 'lorem.txt'
});

readline.on('line',function(line) {

    console.log(line);
    return;
});
```

### Methods

get head of string (bytes red)
```js
readline.head
```

get tail of string
```js
readline.tail
```

restart reading (building a new Class)
```js
readline.read(start,end)
```

### startline(options)

#### options

 - `file` - **String** Path of file *(required)*
 - `arc4` - **String** Password for reading a encrypted file with [rc4](https://github.com/hex7c0/arc4) *(default "disabled")*
 - `autokey` - **String** Password for reading a encrypted file with [autokey](https://github.com/hex7c0/autokey) *(default "disabled")*
 - `encoding` - **utf8 | ascii | base64 | null** File encoding *(default "null")*
 - `mode` - **String** File permission *(default "444")*
 - `start` - **Integer** Starting bytes *(default "starting file")*
 - `end` - **Integer** Ending bytes *(default "entire file")*
 - `autoClose` - **Boolean** If file descriptor will be closed automatically *(default "true")*
 - `lodash` - **Boolean** Use lodash library with encrypted file *(default "disabled")*

related to http://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

## Examples

Take a look at my [examples](https://github.com/hex7c0/startline/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)
