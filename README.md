#startline [![Build Status](https://travis-ci.org/hex7c0/startline.svg?branch=master)](https://travis-ci.org/hex7c0/startline) [![NPM version](https://badge.fury.io/js/startline.svg)](http://badge.fury.io/js/startline)

stream readline with starting point for [nodejs](http://nodejs.org/).

## Installation

Install through NPM

```
npm install startline
```
or
```
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

get head of string (bytes readed)
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

 - `file` - **String** Path of file *(required)*
 - `arc4` - **String** Read a encrypted file *(default "disabled")*
 
 - `encoding` - **utf8 | ascii | base64** File encoding *(default "utf8")*
 - `mode` - **String** File permission *(default "444")*
 - `start` - **Integer** Starting bytes *(default "entire file")*
 - `end` - **Integer** Ending bytes *(default "entire file")*
 - `autoClose` - **Boolean** If file descriptor will be closed automatically *(default "true")*

releated to http://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options


#### Examples

Take a look at my [examples](https://github.com/hex7c0/startline/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license

