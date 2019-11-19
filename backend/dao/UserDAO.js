"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class UserDAO {
    authUser(user, callback) {
        sqlHelper.query(
            "SELECT id FROM animals_user WHERE email=? AND password=PASSWORD(?)",
            [user.email, user.password],
            function(err, results, fields) {
                if (err || results.length < 1) {
                    callback(false);
                    return;
                }

                console.log("login success (id) : " + results[0].id);
                callback(true);
            }
        );
    }

    createUser(user, callback) {
        sqlHelper.query(
            "INSERT INTO animals_user(email,password,nickname,point) VALUES(?,PASSWORD(?),?,0)",
            [user.email, user.password, user.nickname],
            function(err, results, fields) {
                if (err || results.affectedRows < 1) {
                    callback(false);
                    return;
                }

                callback(true);
            }
        );
    }

    checkExistedEmail(email, callback) {
        sqlHelper.query(
            "SELECT id FROM animals_user WHERE email=?",
            [email],
            function(err, results, fields) {
                if (err || results.length < 1) {
                    callback(false);
                    return;
                }

                callback(true);
            }
        );
    }

    checkExistedNickname(nickname, callback) {
        sqlHelper.query(
            "SELECT id FROM animals_user WHERE nickname=?",
            [nickname],
            function(err, results, fields) {
                if (err || results.length < 1) {
                    callback(false);
                    return;
                }

                callback(true);
            }
        );
    }
}

module.exports = UserDAO;
