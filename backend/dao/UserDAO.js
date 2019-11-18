"use strict";
const pool = require("./helper/pool");


class UserDAO {
    authUser(user, cb) {
        pool.getConnection(function(err, conn) {
            if (err) cb(false);

            let sql = "SELECT id FROM animals_user WHERE email=? AND password=?";
            conn.query(sql, [user.email, user.password], function(err, results, fields) {
                conn.release(); // 잊지 말자
                if (err) cb(false);

                if (results.length) {
                    console.log("login success id : " + results[0].id);
                    cb(true);
                    return;
                }
                else {
                    cb(false);
                    return;
                }
            });
        });
    }
}

module.exports = UserDAO;
