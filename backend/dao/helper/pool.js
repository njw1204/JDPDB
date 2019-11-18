"use strict";
const mysql = require("mysql");
const dbConfig = require("../../config").db;
const pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
});

module.exports = pool;
