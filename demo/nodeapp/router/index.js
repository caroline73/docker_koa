/*
* 整合所有路由
*/
const Router = require('koa-router');
const router = new Router();
const api = require('./api/index.js');
const act = require('./act/index.js');

router.use(act.routes(), act.allowedMethods());
router.use(api.routes(), api.allowedMethods());

module.exports = router;


