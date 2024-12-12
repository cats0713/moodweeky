'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // 테이블 및 컬럼 정의
    static init(sequelize) {
      return super.init(
        {
          userId: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
          },
          password: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          name: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
          provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
          },
          snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
          },
          email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
          },
          status: {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
        },
        {
          sequelize,
          timestamps: true, // createdAt, updatedAt 자동 생성
          paranoid: true, // deletedAt 자동 생성
          underscored: false,
          modelName: 'User',
          tableName: 'users',
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
      )
    }

    // 관계 정의
    static associate(models) {
      // 예: User와 Post의 1:N 관계
      // this.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  return User
}