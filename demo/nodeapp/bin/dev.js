const port = process.env.PORT || 8080;

// 添加环境变量debug 输出日志
if (process.env.NODE_ENV === 'production') {
  process.env.DEBUG = '';
} else {
  process.env.DEBUG = 'docker-demo:*';
}
const app = require('../app.js');
app.listen(port);
