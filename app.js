const express = require('express')
const app = express()

const path = require('path')
const mainRouter = require('./routes/mainRouter')

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models/index')
// db 연결하는 곳
sequelize.sync({ force: false, alter: true })
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
// app.use('/', (req, res, next) => { // 기본경로나 /api 말고 다른곳 진입했을경우 실행
//     res.status(404).send('/')
//   })

app.use('/api', mainRouter)

// app.use((req, res, next) => { // 기본경로나 /api 말고 다른곳 진입했을경우 실행
//   res.status(404).send('Not Found')
// })


// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})


