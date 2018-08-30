'use strict';
const Koa = require('koa');
const app = new Koa();
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

/**
 * 如果session数据量很小，可以直接存在内存中;
 * 如果session数据量很大，则需要存储介质存放session数据
 * **/
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const koaStatic = require('koa-static');
const routers = require('./router/index.js');

// 配置控制台日志中间件
app.use(koaLogger());
// ctx.response
app.use(require('./middleware/response.js'));
// 配置ctx.body解析中间件
app.use(bodyParser());
// 应用处理session的中间件
let store = new MysqlStore({
  user: 'root',
  password: '123456',
  database: 'docker_mysql',
  host: 'docker_mysql_1',
});
app.use(session({
  key: 'session-id',
  store: store,
  cookie: {
    domain: 'zsh.demo.docker.com',
    path: '/',
    maxAge: 1000 * 300,
    httpOnly: false,
    overwrite: false,
  }
}));
// 配置静态资源加载中间件
app.use(koaStatic('../websrc/dist', {
  // index: false
}));
// 返回时间
app.use(require('./middleware/response_time.js'));
// ctx.render
app.use(require('./middleware/render.js'));
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());


module.exports = app;
