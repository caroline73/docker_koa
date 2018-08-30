const requireDirectory = require('require-directory');
// console.log(requireDirectory(module, './auth'));

// function rename(name) {
//   return name.charAt(0).toUpperCase() + name.slice(1);
// }
// console.log(requireDirectory(module,{ rename }));
module.exports = requireDirectory(module);
