const express = require('express')
const router = express.Router()
const { NOT_FOUND } = require('./resReturn')

// body-parser
router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

router.use(async (req, res, next) => {
  try {
    const routesName = req.path.split('/')[1] === "main" ? '' : req.path.split('/')[1]
    const apiRoutes = require(`./${routesName}Router.js`)
    // if (req.path === "/user/login" || req.path === "/user/join") {
    if (req.path === config[routesName]) {
      // 세션 제외
      router.use(`/${routesName}`, apiRoutes)
      next()
    } else if (req.session.user) {
      // 요청한 api를 처리할 routes가 있는지 확인하고 해당 routes가 있을 경우 라우팅, 없을 경우 error
      // global.lang = req.headers.lang; // 사용자가 설정한 언어를 글로버로 설정함
      router.use(`/${routesName}`, apiRoutes)
      next()
    } else {
      
    }
    } catch (e) {
      console.error(`* <Error: mainRouter.14> ${req.path} 경로에서 라우터를 찾을 수 없습니다: ${e}`)
      NOT_FOUND(res)
    }
})

module.exports = router
