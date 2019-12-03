"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class CommentDAO {
    getComment(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT user_id, post_id, content, created_time FROM animals_comment WHERE id = ?`,
                [id],
                function(err, results, fields) {
                    console.log("\n<getComment>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0]);
                }
            );
        });
    }

    addComment(userId, postId, content) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `INSERT INTO animals_comment(user_id, post_id, content) VALUES(?,?,?)`,
                [userId, postId, content],
                function(err, results, fields) {
                    console.log("\n<addComment>");
                    console.log(results);

                    if (err) reject(err);
                    resolve(true);
                }
            );
        });
    }

    removeComment(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `DELETE FROM animals_comment WHERE id = ?`,
                [id],
                function(err, results, fields) {
                    console.log("\n<removeComment>");
                    console.log(results);

                    if (err) reject(err);
                    resolve(true);
                }
            );
        });
    }
}

const commentDAO = new CommentDAO();
module.exports = commentDAO;
