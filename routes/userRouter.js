const express = require('express')
const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, UNEXPECTED_ERROR } = require('./resReturn')
const router = express.Router()
const db = require('../models/index')
const bcrypt =require("bcrypt")
const axios = require('axios')

const hashingPW = async password => {
  const saltRounds = 10

  // salt 생성
  const salt = await bcrypt.genSalt(saltRounds)

  // hash
  const hashedPw = await bcrypt.hash(password, salt)

  return {
    status: 201,
    data: { salt, hashedPw },
  }
}

router.get('/test', async (req, res) => {
  try {
    await db.User.create({
      email: "test@email.com",
      name: "test",
      status: "ACTIVE"
    })
    const data = await db.User.findAll()
    console.log(data)
    OK(res, 'user test API 동작 중!', data)
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    NOT_FOUND(res)
  }
})

router.post('/join', async (req, res) => {
  try {
    const data = req.body
    try {
      const userJoinResult = await db.User.findOne({where: {userId: data.id}})
      console.log(userJoinResult)
      if (userJoinResult === null) {
        console.log(11)
      }
    } catch (error) {
      console.log(`* <Router Error: ${req.path}>: ${error}`)
      OK(res, "null")
    }
    
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})

router.post('/login', async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const userInfo = await db.User.find({userId: data.userID, userPw: data.userPW})
    console.log(userInfo)
    // const resultPW = await bcrypt.compare(password, hashedPw)
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})



router.post('/logout', async (req, res) => {
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
