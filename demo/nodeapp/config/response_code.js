module.exports = {
  'ERROR_USER_NAME': {
    errno: -1,
    errmsg: '用户名格式为6-16位的小写字母，包括-、_'
  },
  'ERROR_EMAIL': {
    errno: -1,
    errmsg: '请输入正确的邮箱地址'
  },
  'ERROR_PASSWORD': {
    errno: -1,
    errmsg: '密码长度应该为6-16'
  },
  'ERROR_PASSWORD_CONFORM': {
    errno: -1,
    errmsg: '两次密码不一致'
  },
  'ERROR_SYS': {
    errno: -2,
    errmsg: '系统错误！'
  },
  'FAIL_EMAIL_IS_EXIST': {
    errmo: -3,
    errmsg: '邮箱已被注册'
  },
  'FAIL_NAME_IS_EXIST': {
    errno: -3,
    errmsg: '用户名已被注册'
  },
  'FAIL_USER_NAME_OR_PASSWORD_ERROR': {
    errno: -4,
    errmsg: '用户名或登录密码错误'
  },
  'FAIL_USER_NO_LOGIN': {
    errno: -4,
    errmsg: '用户未登录'
  },
  'FAIL_USER_NO_EXIST': {
    errno: -4,
    errmsg: '用户不存在'
  }
}
