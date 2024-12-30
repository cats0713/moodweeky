const { USER, HTTP } = require('../config/constants');

const OK = (res, message = "Ok", data, result = true) => {
  // 200
  res.status(HTTP.CODES.OK).json({
    result: result,
    data: data ? data : null,
    msg: message,
  })
}

const BAD_REQUEST = (res, message = 'Bad Request Error') => {
  // 400
  console.log(`* BAD_REQUEST : ${message}`)
  res.status(HTTP.CODES.BAD_REQUEST).json({
    result: false,
    msg: message,
  })
}

const UNAUTHORIZED = (res, message = 'Unauthorized Error') => {
  // 401
  console.log(`* UNAUTHORIZED : ${message}`)
  res.status(HTTP.CODES.UNAUTHORIZED).json({
    result: false,
    msg: message,
  })
}

const FORBIDDEN = (res, message = 'Forbidden Error') => {
  // 403
  console.log(`* FORBIDDEN : ${message}`)
  res.status(HTTP.CODES.FORBIDDEN).json({
    result: false,
    msg: message,
  })
}

const NOT_FOUND = (res, message = 'Not Found Error') => {
  // 404
  console.log(`* NOT_FOUND : ${message}`)
  res.status(HTTP.CODES.NOT_FOUND).json({
    result: false,
    msg: message,
  })
}

const INTERNAL_SERVER_ERROR = (res, message = 'Internal Server Error') => {
  // 500
  console.log(`* INTERNAL_SERVER_ERROR : ${message}`)
  res.status(HTTP.CODES.INTERNAL_SERVER_ERROR).json({
    result: false,
    msg: message,
  })
}

const UNEXPECTED_ERROR = (res, err = '없음') => {
  // ?? try catch error
  // UNEXPECTED_ERROR / 11 [ try catch error ]
  console.log(`* UNEXPECTED_ERROR : ${err} [ try catch error ]`)
  BAD_REQUEST()
}

module.exports = {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNEXPECTED_ERROR,
}