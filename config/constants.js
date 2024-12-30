/*
  const { USER, HTTP } = require("../config/constants")
  위와 같이 선언하여 사용하면 됨
*/
const PROVIDER = {
  STATUS: {
    LOCAL: "local",
    KAKAO: "kakao",
    GOOGLE: "google",
  }
}


const USER = {
  STATUS: {
    ACTIVE: "active",           // 활동 중
    DORMANT: "dormant",         // 휴면 상태
    SUSPENDED: "suspended",     // 정지 상태
    DELETED: "deleted",         // 탈퇴 상태
    BANNED: "banned",           // 블랙리스트, 밴
    // PENDING_VERIFICATION: "PENDING_VERIFICATION", // 미인증 상태
  }
}

const HTTP = {
  STATUS: {
    SUCCESS: "success",         // 성공
    FAILED: "failed",           // 실패
    PENDING: "pending",         // 대기 중
    PROCESSING: "processing",   // 처리 중
    CANCELLED: "cancelled",     // 취소됨
  },
  CODES: {
    OK: 200,                    // 성공
    BAD_REQUEST: 400,           // 서버가 클라이언트의 요청을 이해하지 못할 때 발생하는 오류
    UNAUTHORIZED: 401,          // 요청된 리소스에 대한 유효한 인증 자격 증명이 없어 클라이언트 요청이 완료되지 않았음
    FORBIDDEN: 403,             // 서버가 허용하지 않는 웹 페이지나 미디어를 사용자가 요청할 때 웹 서버가 반환하는 HTTP 상태 코드이다
    NOT_FOUND: 404,             // 클라이언트가 요청한 정보가 서버에 없을 때 발생하는 에러 코드
    INTERNAL_SERVER_ERROR: 500, // 서버가 요청을 처리하는 과정에서 예상하지 못한 상황에 놓였을 때 발생하는 서버 에러 응답 코드
  }
} 

module.exports = {
  USER,
  HTTP,
  PROVIDER,
}