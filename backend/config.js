"use strict";

let config = {
    db: {
        host: "localhost",
        user: "PLEASE SET MySQL USER IN config.js",
        password: "PLEASE SET MySQL PASSWORD IN config.js",
        database: "PLEASE SET MySQL DATABASE IN config.js",
        port: 3306,
    },
    api: {
        host: "127.0.0.1:3000",
        kakaoAdminKey: "PLEASE SET KAKAO API ADMIN KEY",
    }
}

module.exports = config;
