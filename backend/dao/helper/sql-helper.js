const pool = require("./pool");

let sqlHelper = {
    simpleQuery: function(sql, callback) {
        pool.getConnection(function(err, conn) {
            if (err) callback(err);
            conn.query(sql, function(err, results, fields) {
                conn.release();
                callback(err, results, fields);
            });
        });
    },
    query: function(sql, args, callback) {
        pool.getConnection(function(err, conn) {
            if (err) callback(err);
            conn.query(sql, args, function(err, results, fields) {
                conn.release();
                callback(err, results, fields);
            });
        });
    }
};

module.exports = sqlHelper;
