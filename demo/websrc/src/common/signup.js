import Request from './request.js';
import validator from 'validator';

function validatorSignUp(userInfo) {
  let result = {
    errmsg: '',
    success: false
  }
  if (!(/[a-z0-9\_\-]{6,16}/.test(userInfo.userName))) {
    result.errmsg = '用户名格式为6-16位的小写字母，包括-、_';
    return result;
  }
  if (!validator.isEmail( userInfo.email ) ) {
    result.errmsg = '请输入正确的邮箱地址';
    return result;
  }
  if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
    result.errmsg = '密码长度应该为6-16'
    return result
  }
  if ( userInfo.password !== userInfo.confirmPassword ) {
    result.errmsg = '两次密码不一致'
    return result
  }
  result.success = true;
  return result;
}
  
const signUpApi = async (userInfo) => {
  let validateResult = validatorSignUp(userInfo);
  if (!validateResult.success) {
    return validateResult;
  }
  let result = await Request.post({
      url: '/api/user/signup',
      data: userInfo
  });
  return result;
}

export {
  signUpApi
}