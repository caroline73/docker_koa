FROM node:8.11.3
# 安装PM2
RUN npm install pm2 -g

WORKDIR  /src/demo/nodeapp
# COPY . /src

EXPOSE 8080

# 运行pm2
CMD ["pm2-runtime", "process.yml"]
