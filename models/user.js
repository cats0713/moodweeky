const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // 시퀄라이즈는 id 자동 생성 (auto_increament)
        userId: {
          type: DataTypes.STRING(40),
          allowNull: true, // null 허용
          unique: true, // 중복 비허용
        },
        password: {
          type: DataTypes.STRING(100), // 해시암호화를 할때 문자가 길어지니, 여유있게 용량을 잡아준다.
          allowNull: true, // 카카오 같은 api로 로그인할때, 직접 회원가입해서 비밀번호 설정한게 아니니 비번은 null일수도 있다.
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false, // null 비허용
        },
        provider: {
          //? 어디로부터 로그인 했는지 정보
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: 'local', // 로컬 / 카카오 / 네이버 / 구글 로그인 을 구분하기 위한 필드
        },
        snsId: {
          //? sns으로 로그인할경우 sns아이디 저장 필드
          type: DataTypes.STRING(30),
          allowNull: true, // null 허용
          unique: true, // 중복 비허용
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: true, // null 허용
          unique: true, // 중복 비허용
        },
        status: { // USER_STATUS 사용
          type: DataTypes.STRING(30),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true, // createdAt, udaptedAt 자동 생성
        paranoid: true, // deletedAt 자동 생성
        underscored: false,
        modelName: 'User', // server 모델명
        tableName: 'users', // mariadb 테이블명
        charset: 'utf8', // 한글 입력 설정
        collate: 'utf8_general_ci',
      },
    )
  }
  static associate(models) {
    // 모델 간 관계 정의 (예: User와 Post의 1:N 관계)
    // this.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'id' });
  }
}


module.exports = User