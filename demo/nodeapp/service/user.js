const debug = require('debug')('docker-demo');
const db = require('../db/mysql.js');
const validator = require('validator');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class User {
  constructor() {
    
  }

  /*
  *检验用户注册数据
  * @param {object} userInfo 用户注册数据
  * @return {object}         检验结果
  */
  validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: '',
    }
    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = 'ERROR_USER_NAME';
      return result;
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = 'ERROR_EMAIL';
      return result;
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = 'ERROR_PASSWORD';
      return result;
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = 'ERROR_PASSWORD_CONFORM'
      return result
    }
    result.success = true
    return result 
  }

  async createUser(options) {
    return await db.user.create(options);
  }

  /*
  * 查找存在的用户信息
  * @param {object} data  查找的表单信息
  * @return {object|null} 查找结果
  */
  async getExistOne(data) {
    if (Object.keys(data).length === 0) {
      return await db.user.findAll({ raw: true });
    }
    return await db.user.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            'email': data.email
          },
          {
            'userName': data.userName 
          }
        ]
      }
    });
  }

  /*
  * 根据用户名查找用户业务操作
  * @param {string} userName 用户名
  * @return {object||null}
  * */
 async getUserInfoByUserName(userName) {
  let result = await db.user.findAll({
    raw: true,
    where: {
      userName: userName
    }
  });
  if (Array.isArray(result) && result.length > 0) {
    result = result[0];
  } else {
    result = null;
  }
  return result;
 }
}

module.exports = new User();

