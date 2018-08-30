const mysql = require('mysql2');
const Sequelize = require ('sequelize');
const models = require('../models/index.js');

const config = {
  database: 'docker_mysql',
  username: 'root',
  password: '123456',
  options: {
    host: 'docker_mysql_1',
    dialect: 'mysql'
  }
}


const db = {};
const sequelize = db.sequelize || new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options);



Object.keys(models).forEach((modelName) => {
  db[modelName] = models[modelName](sequelize, Sequelize.DataTypes);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.user.create({
//     name: 'zhangsan',
//     age: 20
// }).then((user) => {
//   console.log(user.toJSON());
// });

// db.user.findAll().then((users) => {
// console.log(users);
// });

module.exports = db;

// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'docker_mysql',
//   password: '123456',
// });

// // simple query
// connection.query(
//   'SELECT * FROM `user`',
//   function(err, results, fields) {
//     console.log(err, results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );




