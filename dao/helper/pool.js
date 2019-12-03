"use strict";
const mysql = require("mysql");
const dbConfig = require("../../config").db;
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dateStrings: "date",
    multipleStatements: true,
    charset: "utf8mb4",
});

module.exports = pool;
