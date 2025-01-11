const express = require('express')
const app = express()
const session = require('express-session')

const path = require('path')
const mainRouter = require('./routes/mainRouter')

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models/index')
// db 연결하는 곳
sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log('데이터베이스 연결됨')
  }).catch((err) => {
    console.error(err)
  })

app.set('port', process.env.PORT || 3000)

// app.use(express.static(path.join(__dirname, 'public'))) // 요청시 기본 경로 설정
// app.use(express.json()) // json 파싱
// app.use(express.urlencoded({ extended: false })) // uri 파싱

// router 분기
// app.use('/', (req, res, next) => { // 기본경로나 / api 말고 다른곳 진입했을경우 실행
//     res.status(404).send('/')
//   })

app.use( // 맨먼저 선언해야함..
  session({
    secret: 'your-secret-key', // 세션 암호화 키
    resave: false, // 세션이 변경되지 않아도 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {
      maxAge: 1000 * 60 * 60, // 쿠키 유효 기간 (1시간)
    },
  })
)

app.use('/api', mainRouter)


app.use((req, res, next) => { // 기본경로나 /api 말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found')
})


// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})


