const express = require('express')
const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, UNEXPECTED_ERROR } = require('./resReturn')
const router = express.Router()
const { USER, PROVIDER } = require('../config/constants')
const db = require('../models/index')
const bcrypt = require("bcrypt")
const axios = require('axios')

const hashingPW = async password => {
  try {
    const saltRounds = 10
    // salt 생성
    const salt = await bcrypt.genSalt(saltRounds)
    // hash
    const hashedPw = await bcrypt.hash(password, salt)
    return hashedPw
  } catch (error) {
    console.error(`* <Bcrypt Error: hashingPW() >: ${error}`)
  }
}

router.get('/test', async (req, res) => {
  try {
    await db.User.create({
      email: "test@email.com",
      name: "test",
    })
    const data = await db.User.findAll()
    console.log(data)
    OK(res, 'user test API 동작 중!', data)
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    NOT_FOUND(res)
  }
})

router.post('/checkId', async (req, res) => {
  try {
    const data = req.body
    const userJoinResult = await db.User.findOne({where: {userId: data.userId}})
    if (userJoinResult === null) {
      OK(res, '사용가능한 ID 입니다', data)
    } else {
      OK(res, '사용불가능한 ID 입니다', data, false)
    }
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})


router.post('/join', async (req, res) => {
  try {
    const data = req.body
    const userJoinResult = await db.User.findOne({where: {userId: data.userId}})
    if (userJoinResult === null) {
      // if (false) {
      //   // sns 아이디로 로그인한 흔적이 있으면?
      // }
      // 새롭게 아이디를 만들어줘야한다
      await db.User.create({
        userId: data.userId,
        userPw: await hashingPW(data.userPw),
        email: data.email || null,
        name: data.name || null ,
        status: USER.STATUS.ACTIVE
      })
      OK(res, '회원가입이 완료되었습니다')
    } else {
      OK(res, '사용불가능한 ID 입니다', null, false)
    }
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})

router.post('/login', async (req, res) => {
  try {
    const data = req.body
    const userInfo = await db.User.findOne({where: {userId: data.userId}})
    const userIsMatch = await bcrypt.compare(data.userPw, userInfo.userPw)
    if (userIsMatch) {
      // 회원정보 있음, 세션만들어 주기
      req.session.user = { id: userInfo.userId, username: userInfo.name }
      OK(res, '로그인 성공')
    } else {
      // 회원정보 없음
      OK(res, '로그인 실패', null, false)
    }
    // 세션 만들어 주기
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})



router.post('/logout', async (req, res) => {
  console.log(req)
  console.log(req.session)
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(`* <Logout Error: ${req.path}>: ${error}`)
        OK(res, '로그아웃 실패', null, false)
      } else {
        OK(res, '로그인 성공')
      }
    })
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})


router.post('/kakaologin', async (req, res) => {
  console.log("kakaologin")
  axios.get("https://kauth.kakao.com/oauth/authorize", // 요청 주소 front -> kakkao -> 사용자 허락 -> kakao ok -> http://localhost:3000/api/user/kakaologinTest
    {
      client_id: "e51821c7813998b8f30d574a5607dbd1",
      redirect_uri: "http://localhost:3000/api/user/kakaologinTest",
      response_type: "code"
    }).then(() => {
      OK(res, "null")
    })
})


router.get('/kakaoLoginTest', async (req, res) => {
  console.log(req)
})

module.exports = router
