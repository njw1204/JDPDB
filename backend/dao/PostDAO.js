"use strict";
const util = require("util");
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class PostDAO {
    getPostsFromPage(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);

                conn.query(
                    `START TRANSACTION;

                     SELECT id, page_id, title, content, created_time, min_class_level
                     FROM animals_post
                     WHERE page_id = ?
                     ORDER BY id DESC
                    `,
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            conn.release();
                            return reject(err);
                        }
                        let calls = [];

                        for (let post of results[1]) {
                            calls.push(new Promise((resolve, reject) => {
                                conn.query(
                                    `SELECT tag.id, tag.name
                                     FROM animals_post_tags AS post_tags
                                     INNER JOIN animals_tag AS tag ON post_tags.tag_id = tag.id
                                     WHERE post_tags.post_id = ?;

                                     SELECT file.url
                                     FROM animals_post_files AS post_files
                                     INNER JOIN animals_file AS file ON post_files.file_id = file.id
                                     WHERE post_files.post_id = ?;

                                     SELECT comment.id, user_id, nickname, content, created_time
                                     FROM animals_comment AS comment
                                     INNER JOIN animals_user AS user ON user.id = comment.user_id
                                     WHERE comment.post_id = ?
                                     ORDER BY comment.id DESC
                                    `,
                                    [post.id, post.id, post.id],
                                    (err, results, fields) => {
                                        if (err) return reject(err);

                                        post.tags = results[0];
                                        post.files = results[1];
                                        post.comments = results[2];
                                        resolve(post);
                                    }
                                );
                            }));
                        }

                        Promise.all(calls).then((values) => {
                            console.log("\n<getPostsFromPage>");
                            console.log(util.inspect(values, {depth: null, colors: true}));
                            resolve(values);
                            sqlHelper.commit(conn);
                        }).catch((err) => {
                            reject(err);
                            sqlHelper.rollback(conn);
                        });
                    }
                );
            });
        });
    }

    getPostsByTagName(tagName) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);

                conn.query(
                    `START TRANSACTION;

                     SELECT post.id, page_id, title, content, created_time, min_class_level
                     FROM animals_post AS post
                     INNER JOIN animals_post_tags AS post_tags ON post.id = post_tags.post_id
                     INNER JOIN animals_tag AS tag ON tag.id = post_tags.tag_id
                     WHERE tag.name = ?
                     ORDER BY id DESC
                    `,
                    [tagName],
                    (err, results, fields) => {
                        if (err) {
                            conn.release();
                            return reject(err);
                        }
                        let calls = [];

                        for (let post of results[1]) {
                            calls.push(new Promise((resolve, reject) => {
                                conn.query(
                                    `SELECT tag.id, tag.name
                                     FROM animals_post_tags AS post_tags
                                     INNER JOIN animals_tag AS tag ON post_tags.tag_id = tag.id
                                     WHERE post_tags.post_id = ?;

                                     SELECT file.url
                                     FROM animals_post_files AS post_files
                                     INNER JOIN animals_file AS file ON post_files.file_id = file.id
                                     WHERE post_files.post_id = ?;

                                     SELECT comment.id, user_id, nickname, content, created_time
                                     FROM animals_comment AS comment
                                     INNER JOIN animals_user AS user ON user.id = comment.user_id
                                     WHERE comment.post_id = ?
                                     ORDER BY comment.id DESC
                                    `,
                                    [post.id, post.id, post.id],
                                    (err, results, fields) => {
                                        if (err) return reject(err);

                                        post.tags = results[0];
                                        post.files = results[1];
                                        post.comments = results[2];
                                        resolve(post);
                                    }
                                );
                            }));
                        }

                        Promise.all(calls).then((values) => {
                            console.log("\n<getPostsByTagName>");
                            console.log(util.inspect(values, {depth: null, colors: true}));
                            resolve(values);
                            sqlHelper.commit(conn);
                        }).catch((err) => {
                            reject(err);
                            sqlHelper.rollback(conn);
                        });
                    }
                );
            });
        });
    }
}

const postDAO = new PostDAO();
module.exports = postDAO;
