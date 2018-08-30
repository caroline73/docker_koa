const config = require('../config/response_code.js');

function success(data) {
  return {
    errno: 0,
    errmsg: '',
    data: data
  }
}

function fail(errno, errmsg, data) {
  const type = typeof errno;
  errmsg = errmsg || '';
  if (type === 'object') {
    return errno;
  }
  if (type === 'undefined') {
    data = '';
  }
  if (type === 'string') {
    const errData = config[errno];
    return {
      errno: errData.errno,
      errmsg: errData.errmsg,
      data: null
    }
  }
  return {
    errno,
    errmsg,
    data
  }
}

module.exports = async(ctx, next) => {
  ctx.success = (...args) => {
    return success(...args);
  },
  ctx.fail = (...args) => {
    return fail(...args);
  }
  await next();
};
