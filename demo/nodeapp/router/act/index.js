const Router = require('koa-router');
const router = new Router();

// 首页
router.get('/', async(ctx, next) => {
  ctx.body = await ctx.render('index');
});

router.get('/admin', async(ctx, next) => {
  ctx.body = await ctx.render('admin');
});

router.get('/error', async(ctx, next) => {
  ctx.body = await ctx.render('error');
});

// 登陆和注册
router.get('/work', async(ctx, next) => {
  if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
    ctx.body = await ctx.render('work');
  } else {
   // 没有登录状态跳转到错误页面
    ctx.redirect('/error');
  }
  await next();
});


module.exports = router;
