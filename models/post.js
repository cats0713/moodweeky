'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    // 테이블 및 컬럼 정의
    static init(sequelize) {
      return super.init(
        {
          postId: {
            type: DataTypes.STRING(40),
            allowNull: true, // null 허용
            unique: true, // 중복 비허용
          },
          title: {
            type: DataTypes.STRING(100),
            allowNull: false, // null 비허용
          },
          content: {
              type: DataTypes.STRING(500),
          },
          emotion: {
            type: DataTypes.STRING(20),
            allowNull: true
          },
          snsId: {
            //? sns으로 로그인할경우 sns아이디 저장 필드
            type: DataTypes.STRING(30),
            allowNull: true, // null 허용
          },
          status: { // USER_STATUS 사용
            type: DataTypes.STRING(30),
            defaultValue: "Using"
          }
        },
        {
          sequelize,
          timestamps: true, // createdAt, udaptedAt 자동 생성
          paranoid: true, // deletedAt 자동 생성
          underscored: false,
          modelName: 'Post', // server 모델명
          tableName: 'posts', // mariadb 테이블명
          charset: 'utf8', // 한글 입력 설정
          collate: 'utf8_general_ci',
        },
      )
    }

    // 관계 정의
    static associate(models) {
      // 모델 간 관계 정의 (예: User와 Post의 1:N 관계)
      this.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  return Post
}



// const { Model, DataTypes } = require('sequelize')

// class Post extends Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         // 시퀄라이즈는 id 자동 생성 (auto_increament)
//         postId: {
//           type: DataTypes.STRING(40),
//           allowNull: true, // null 허용
//           unique: true, // 중복 비허용
//         },
//         title: {
//           type: DataTypes.STRING(100),
//           allowNull: false, // null 비허용
//         },
//         content: {
//             type: DataTypes.STRING(500),
//         },
//         snsId: {
//           //? sns으로 로그인할경우 sns아이디 저장 필드
//           type: DataTypes.STRING(30),
//           allowNull: true, // null 허용
//           unique: true, // 중복 비허용
//         },
//         status: { // USER_STATUS 사용
//           type: DataTypes.STRING(30),
//           allowNull: false,
//         }
//       },
//       {
//         sequelize,
//         timestamps: true, // createdAt, udaptedAt 자동 생성
//         paranoid: true, // deletedAt 자동 생성
//         underscored: false,
//         modelName: 'User', // server 모델명
//         tableName: 'users', // mariadb 테이블명
//         charset: 'utf8', // 한글 입력 설정
//         collate: 'utf8_general_ci',
//       },
//     )
//   }
//   static associate(models) {
//     // 모델 간 관계 정의 (예: User와 Post의 1:N 관계)
//     this.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
//   }
// }


// module.exports = Post