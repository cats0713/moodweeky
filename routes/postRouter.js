const express = require('express');
const axios = require('axios')
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNEXPECTED_ERROR,
} = require('./resReturn');
const { getEmotion } = require('../function/getEmotion')
const router = express.Router();
const db = require('../models/index');
const { where } = require('sequelize');

router.get('/getAll', async (req,res) => {
  let { offset, pageNum } = req.body
  if (pageNum > 1) offset = 5 * (pageNum - 1)
  const getAllPosts = await db.Post.findAll({
    offset: offset,
    limit: 5
  })
  
}) 

router.get('/getId', async (req, res) => {
  const { id } = req.body
  try {
    const checkPostId = await db.Post.findOne({
      where: {
        id
      }
    })
  
    if(!checkPostId) return NOT_FOUND(res, 'post not found')
    OK(res, checkPostId);
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`);
    BAD_REQUEST(res);
  }

  
})

router.post('/insert', async (req, res) => {
  const { title, content, id } = req.body;
  try {
    const checkUserId = await db.User.findOne({
      where: {
        id
      }
    })
      
    if (!checkUserId) return UNAUTHORIZED(res, '로그인 후 이용 바랍니다.');
    if (!title || !content) return NOT_FOUND(res, '제목이나 내용 미입력');
    
    const { data: { emotion } } = await getEmotion(content) // '분노'
    const createPost = await db.Post.create({ 
      title,
      content,
      userId: id,
      emotion 
    });
    OK(res, '작성이 완료되었습니다.');
    // const resultPW = await bcrypt.compare(password, hashedPw)
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`);
    BAD_REQUEST(res);
  }
});

router.delete('/delete', async(req, res) => {
  try {
    const { id } = req.body
    const checkPostData = await db.Post.findOne({
      where: {
        id
      }
    })
    if(checkPostData) {
      await db.Post.destroy({
        where: {
          id
        }
      })
      OK(res, '삭제가 완료되었습니다.')
    } else { 
      BAD_REQUEST(res, `requestId: ${id}, but not found this post`)
    }
  } catch (error) {
    console.error(`* <Router Error: ${req.path}>: ${error}`);
    BAD_REQUEST(res);
  }
})

module.exports = router;