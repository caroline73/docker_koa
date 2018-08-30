const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});
const user = require('./user.js');
router.use('/user', user.routes());

module.exports = router;
