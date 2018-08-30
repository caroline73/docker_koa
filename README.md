# 整个技术栈包含下面几部分
- nodejs
    - koa2
- nginx
- mysql
- reactjs
- webpack
其中 nodejs 作为服务端技术栈，代理用nginx来支持http2协议，存储用的是mysql，前端编译工具用的webpack
学习了chenshenhai的koa2_note，十分感谢受益良多。参考里面的project章节 实现了demo中的登录注册部分

# docker搭建整个前端开发环境

## 所有文件夹
- .data:记录数据
- db: mysql的dockerfile
- demo: 项目
- keys: https证书
- logs: 日志
- nginx: nginx的dockerfile
- node： nodejs的dockerfile
- docker-compose.yml: docker文件

