module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    uid: {
      type:DataTypes.UUID, 
      primaryKey: true,
      autoIncrement: true,
      defaultValue:DataTypes.UUIDV1,
      comment: '用户id'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名称',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户密码'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '邮箱地址'
    }
  },{
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 'user',       
    timestamps: false     
  })
};
