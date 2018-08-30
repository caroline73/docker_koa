import Request from './request.js';

async function signInApi(userInfo) {
    let result = await Request.post({
      url: '/api/user/signin',
      data: userInfo
    });
    return result;
  }
  
  function signInForm(userInfo) {
    userInfo.source = 'form';
    console.log(userInfo);
    Request.form({
      url: '/api/user/signin',
      data: userInfo,
    });
  }

export {
    signInApi,
    signInForm
}