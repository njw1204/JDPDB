"use strict";
const util = require("util");
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class PostDAO {
    addPost(pageId, title, content, minClassLevel, tagNameList, fileUrlList) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);

                conn.query(
                    `START TRANSACTION;

                     INSERT INTO animals_post(page_id, title, content, min_class_level)
                     VALUES(?, ?, ?, ?);

                     SELECT LAST_INSERT_ID() AS id
                    `,
                    [pageId, title, content, minClassLevel],
                    (err, results, fields) => {
                        if (err) {
                            reject(err);
                            return sqlHelper.rollback(conn);
                        }

                        let postId = results[2][0].id;
                        let calls = [];

                        for (let tag of tagNameList) {
                            calls.push(new Promise((resolve, reject) => {
                                conn.query(
                                    `INSERT IGNORE INTO animals_tag(name) VALUES(?);
                                     SELECT id FROM animals_tag WHERE name = ?
                                    `,
                                    [tag, tag],
                                    (err, results, fields) => {
                                        if (err) return reject(err);
                                        let tagId = results[1][0].id;

                                        conn.query(
                                            `INSERT INTO animals_post_tags(post_id, tag_id) VALUES(?, ?)`,
                                            [postId, tagId],
                                            (err, results, fields) => {
                                                if (err) return reject(err);
                                                resolve(tagId);
                                            }
                                        );
                                    }
                                );
                            }));
                        }

                        for (let url of fileUrlList) {
                            calls.push(new Promise((resolve, reject) => {
                                conn.query(
                                    `INSERT INTO animals_file(url) VALUES(?);
                                     SELECT id FROM animals_file WHERE url = ?
                                    `,
                                    [url, url],
                                    (err, results, fields) => {
                                        if (err) return reject(err);
                                        let fileId = results[1][0].id;

                                        conn.query(
                                            `INSERT INTO animals_post_files(post_id, file_id) VALUES(?, ?)`,
                                            [postId, fileId],
                                            (err, results, fields) => {
                                                if (err) return reject(err);
                                                resolve(fileId);
                                            }
                                        );
                                    }
                                );
                            }));
                        }

                        Promise.all(calls).then((values) => {
                            console.log("\n<addPost>");
                            resolve(true);
                            return sqlHelper.commit(conn);
                        }).catch((err) => {
                            reject(err);
                            return sqlHelper.rollback(conn);
                        });
                    }
                );
            });
        });
    }

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
                                     WHERE post_files.post_id = ?
                                     ORDER BY file.id ASC;

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
                                     WHERE post_files.post_id = ?
                                     ORDER BY file.id ASC;

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

    removePost(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `DELETE FROM animals_post WHERE id = ?`,
                [id],
                function(err, results, fields) {
                    console.log("\n<removePost>");
                    console.log(results);

                    if (err) reject(err);
                    resolve(true);
                }
            );
        });
    }
}

const postDAO = new PostDAO();
module.exports = postDAO;
