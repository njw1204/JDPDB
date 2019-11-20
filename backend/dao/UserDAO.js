"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class UserDAO {
    authUser(user) {
        return new Promise(function(resolve, reject) {
            sqlHelper.query(
                "SELECT id,nickname,email FROM animals_user WHERE email=? AND password=SHA2(?, 256)",
                [user.email, user.password],
                function(err, results, fields) {
                    console.log("<authUser>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0]);
                }
            );
        });
    }

    createUser(user) {
        return new Promise(function(resolve, reject) {
            sqlHelper.query(
                "INSERT INTO animals_user(email,password,nickname,point) VALUES(?,SHA2(?, 256),?,0)",
                [user.email, user.password, user.nickname],
                function(err, results, fields) {
                    console.log("<createUser>");
                    console.log(results);

                    if (err || results.affectedRows < 1)
                        return resolve(false);

                    resolve(true);
                }
            );
        });
    }

    checkExistedEmail(email) {
        return new Promise(function(resolve, reject) {
            sqlHelper.query(
                "SELECT id FROM animals_user WHERE email=?",
                [email],
                function(err, results, fields) {
                    console.log("<checkExistedEmail>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(false);

                    resolve(true);
                }
            );
        });
    }

    checkExistedNickname(nickname) {
        return new Promise(function(resolve, reject) {
            sqlHelper.query(
                "SELECT id FROM animals_user WHERE nickname=?",
                [nickname],
                function(err, results, fields) {
                    console.log("<checkExistedNickname>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(false);

                    resolve(true);
                }
            );
        });
    }
}

const userDAO = new UserDAO();
module.exports = userDAO;
