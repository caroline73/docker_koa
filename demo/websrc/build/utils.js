const fs = require('fs');
const chalk = require('chalk');
const Path = require('path');
const retval = {};

function getTime(date) {
  return '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ']';
}

function print(...args) {
  args.unshift(getTime(new Date));
  args.forEach((item, idx) => {
    if (typeof item === 'function') {
      args[idx] = item(chalk);
    }
  });
  console.log(...args);
}

function checkFileInclusion(path, filename, options) {
  return (
    // verify file has valid extension
    (new RegExp('\\.(' + options.extensions.join('|') + ')$', 'i').test(filename)) &&

    // if options.include is a RegExp, evaluate it and make sure the path passes
    !(options.include && options.include instanceof RegExp && !options.include.test(path)) &&

    // if options.include is a function, evaluate it and make sure the path passes
    !(options.include && typeof options.include === 'function' && !options.include(path, filename)) &&

    // if options.exclude is a RegExp, evaluate it and make sure the path doesn't pass
    !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) &&

    // if options.exclude is a function, evaluate it and make sure the path doesn't pass
    !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename))
  );
}
function getPages(path, options) {
  const defaultOptions = {
    extensions: ['js', 'json', 'coffee'],
    recurse: true,
    rename: function (name) {
      return name;
    }
  };
  options = options || {};
  for (var prop in defaultOptions) {
    if (typeof options[prop] === 'undefined') {
      options[prop] = defaultOptions[prop];
    }
  }
  fs.readdirSync(path).forEach(function (filename) {
    let joined = Path.join(path, filename);
    if (fs.statSync(joined).isDirectory()) {
      getPages(joined, options);
    } else {
      if (checkFileInclusion(joined, filename, options)) {
        let key = filename.substring(0, filename.lastIndexOf('.'));
        retval[options.rename(key, joined, filename)] =  joined;//`./${key}/static/${filename}`;
      }
    }
  });
  return retval;
}

module.exports = {
  print,
  getPages
}
