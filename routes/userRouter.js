const express = require('express')
const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, UNEXPECTED_ERROR } = require('./resReturn')
const router = express.Router()
const db = require('../models/index')
const bcrypt =require("bcrypt")

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
      nick: "test",
      status: "ACTIVE"
    })
    const data =  db.User.findAll()
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
    const userInfo = await db.User.find({userId: data.id, password: data.pass})
    console.log(userInfo)
    // const resultPW = await bcrypt.compare(password, hashedPw)
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`)
    BAD_REQUEST(res)
  }
})

module.exports = router
