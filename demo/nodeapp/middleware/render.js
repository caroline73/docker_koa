const template = require('art-template');
const path = require('path');
const fs = require('fs');
const dir = path.resolve(__dirname, '../../websrc/dist');

function render(source, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, 'utf-8', (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(template.render(str, data, {
        extname: '.html'
      }));
    })
  });
}
module.exports = async (ctx, next) => {
  ctx.render = (filename, data) => {
    file = path.resolve(dir, `${filename}.html`);
    return render(file, data || {}, {});
  }
  await next();
}
