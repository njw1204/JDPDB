"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class UserDAO {
    authUser(user, callback) {
        sqlHelper.query(
            "SELECT id FROM animals_user WHERE email=? AND password=?",
            [user.email, user.password],
            function(err, results, fields) {
                if (err) callback(false);

                if (results.length) {
                    console.log("login success (id) : " + results[0].id);
                    callback(true);
                    return;
                }
                else {
                    callback(false);
                    return;
                }
            }
        );
    }
}

module.exports = UserDAO;
