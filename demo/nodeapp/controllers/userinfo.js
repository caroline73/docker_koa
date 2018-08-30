const userSvc = require('../service/user.js');
const debug = require('debug')('docker-demo:api-user');

/*
 * 注册操作
 * @param {object} ctx  上下文对象
 * */
async function signUp (ctx, next) {
  const data = ctx.request.body;
  const userResult = userSvc.validatorSignUp(data);
  // 验证失败
  if (!userResult.success) {
    ctx.body = ctx.fail(userResult.message);
    return;
  }
  // 用户是否注册过
  let existOne = await userSvc.getExistOne(data).catch(err => {
    debug(`getExistOne fail--${err}`);
  });
  if (existOne.length) {
    if (existOne[0].userName === data.userName) {
      ctx.body = ctx.fail('FAIL_NAME_IS_EXIST');
      return;
    }
    if (existOne[0].email === data.email) {
      ctx.body = ctx.fail('FAIL_EMAIL_IS_EXIST');
      return; 
    }
  }
  const user = await userSvc.createUser(data).catch(err => {
    debug(`createUser fail--${err}`);
  });
  ctx.body = ctx.success(user);
  await next();
}

/*
 * 登录操作
 * @param {object} ctx  上下文对象
 * */
async function signIn (ctx, next) {
  let data = ctx.request.body;
  // 获取用户名
  let userResult = await userSvc.getUserInfoByUserName(data.userName).catch(err => {
    debug(`signin fail---${err}`);
    ctx.body = ctx.fail('ERROR_SYS');
    return;
  });

  if (userResult) {
    if (userResult.password !== data.password) {
      ctx.body = ctx.fail('FAIL_USER_NAME_OR_PASSWORD_ERROR');
      return;
    }
  } else {
    ctx.body = ctx.fail('FAIL_USER_NO_EXIST');
    return;
  }
  if (data.source == 'form') {
    let session = ctx.session;
    session.isLogin = true;
    session.userName = userResult.userName;
    session.uid = userResult.uid;
    ctx.redirect('/work');
  } else {
    ctx.body = ctx.success(null);
  }
  await next();
}

/*
 * 获取用户信息
 * @param {object} ctx  上下文对象
 * */
async function getLoginUserInfo(ctx, next) {
  let session = ctx.session;
  let isLogin = session.isLogin;
  let userName = session.userName;
  console.log('session=', session);

  if (isLogin && userName) {
    let userInfo = await userSvc.getUserInfoByUserName(userName);
    if (userInfo) {
      ctx.body = ctx.success(userInfo);
    } else {
      ctx.body = ctx.fail('FAIL_USER_NO_EXIST');
      return;
    }
  }
  await next();
}

/**
 * 检查用户是否登录
 * @param {object} ctx  上下文对象
 * **/
function validateLogin(ctx, next) {
  let session = ctx.session;
  let result = {
    success: false,
    message: 'FAIL_USER_NO_LOGIN'
  }
  if (session && session.isLogin === true) {
    result.success = true;
    result.message = '';
  }
  return result;
}

module.exports = {
  signUp,
  signIn,
  getLoginUserInfo,
  validateLogin
}
