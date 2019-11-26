"use strict";
const pool = require("./pool");

let sqlHelper = {
    simpleQuery: function(sql, callback) {
        pool.getConnection(function(err, conn) {
            if (err) {
                callback(err);
                return;
            }
            conn.query(sql, function(err, results, fields) {
                conn.release();
                callback(err, results, fields);
            });
        });
    },
    query: function(sql, args, callback) {
        pool.getConnection(function(err, conn) {
            if (err) {
                callback(err);
                return;
            }
            conn.query(sql, args, function(err, results, fields) {
                conn.release();
                callback(err, results, fields);
            });
        });
    },
    commit: function(conn, callback, notRelease) {
        conn.query("COMMIT", (err, results, fields) => {
            if (!notRelease) conn.release();
            if (callback) callback(err, results, fields);
        });
    },
    rollback: function(conn, callback, notRelease) {
        conn.query("ROLLBACK", (err, results, fields) => {
            if (!notRelease) conn.release();
            if (callback) callback(err, results, fields);
        });
    }
};

module.exports = sqlHelper;
