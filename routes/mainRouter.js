const express = require('express')
const router = express.Router()
const { NOT_FOUND } = require('./resReturn')

// body-parser
router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

router.use(async (req, res, next) => {
  // 요청한 api를 처리할 routes가 있는지 확인하고 해당 routes가 있을 경우 라우팅, 없을 경우 error
  // global.lang = req.headers.lang; // 사용자가 설정한 언어를 글로버로 설정함
  const routesName = req.path.split('/')[1] === "main" ? '' : req.path.split('/')[1]
  try {
    const apiRoutes = require(`./${routesName}Router.js`)
    router.use(`/${routesName}`, apiRoutes)
    next()
  } catch (e) {
    console.error(`* <Error: mainRouter.14> ${req.path} 경로에서 라우터를 찾을 수 없습니다: ${e}`)
    NOT_FOUND(res)
  }
})

module.exports = router
