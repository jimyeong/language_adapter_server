// const dotenv  = require("dotenv");
// const path = require("path");
const keys = require("./keys");

// timezone을 사용해주지 않으면 UTC 시간 바뀌어서 저장이 된다.
// UTC =  coordinated universal time 협정 세계시
// GMT = 그리니치 평균시 -> 런던을 기점으로 함 
// KST = 한국 표준 시 GMT로 부터 9시간을 더하면 된다.

// GMT와 UTC 는 소수점 단위정도의 차이가 난다.

module.exports = {
  development: {
    username: keys.DB_USER,
    password: keys.DB_PWD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    dialect: keys.DB_SYSTEM,
    port: keys.DB_PORT,
    timezone: "+09:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: keys.DB_USER,
    password: keys.DB_PWD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    dialect: keys.DB_SYSTEM,
    port: keys.DB_PORT,
    timezone: "+09:00",
  }

}