const Router = require('koa-router');
const router = new Router();
const userInfoController = require('../../controllers/userinfo.js');

// singin
router.post('/signin', userInfoController.signIn);
// signup
router.post('/signup', userInfoController.signUp);
// getUserInfo
router.get('/getuserinfo', userInfoController.getLoginUserInfo);

module.exports = router;
