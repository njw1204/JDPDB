"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class PageDAO {
    createPage(userId, animalName, description, categoryId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `INSERT INTO animals_page(creator_id, animal_name, description, category)
                 VALUES(?,?,?,?)
                `,
                [userId, animalName, description, categoryId],
                function(err, results, fields) {
                    console.log("\n<createPage>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
        });
    }

    getPageIdList() {
        return new Promise((resolve, reject) => {
            sqlHelper.simpleQuery(
                `SELECT id FROM animals_page`,
                function(err, results, fields) {
                    console.log("\n<getPageIdList>");
                    console.log(results);

                    if (err) return reject(err);

                    let ret = [];
                    for (let i of results) {
                        ret.push(i.id);
                    }
                    resolve(ret);
                }
            );
        });
    }

    getPageIdListSubscribedByUser(userId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT page.id
                 FROM animals_page AS page
                 INNER JOIN animals_user_to_page_info AS u2p ON page.id = u2p.page_id
                 WHERE u2p.user_id = ? AND u2p.subscribe = 1
                 ORDER BY page.id ASC
                `,
                [userId],
                function(err, results, fields) {
                    console.log("\n<getPageIdListSubscribedByUser>");
                    console.log(results);

                    if (err) return reject(err);

                    let ret = [];
                    for (let i of results) {
                        ret.push(i.id);
                    }
                    resolve(ret);
                }
            );
        });
    }

    getPageIdOfUser(userId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT id FROM animals_page WHERE creator_id = ?`,
                [userId],
                function(err, results, fields) {
                    console.log("\n<getPageIdOfUser>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0].id);
                }
            );
        });
    }

    getPageBasicInfo(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT page.id, page.creator_id, user.nickname, page.animal_name, page.description, category.name AS category, file.url AS profile_picture
                 FROM animals_page AS page
                 INNER JOIN animals_user AS user ON page.creator_id = user.id
                 INNER JOIN animals_category AS category ON page.category = category.id
                 LEFT OUTER JOIN animals_file AS file ON page.profile_picture = file.id
                 WHERE page.id = ?
                `,
                [id],
                function(err, results, fields) {
                    console.log("\n<getPageBasicInfo>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results[0]);
                }
            );
        });
    }

    getPageRequiredProducts(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT required.product_id, product.name, product.description, product.cost, required.product_count, file.url
                 FROM animals_required_products AS required
                 INNER JOIN animals_product AS product ON required.product_id = product.id
                 LEFT OUTER JOIN animals_file AS file ON product.picture_file_id = file.id
                 WHERE required.page_id = ?
                `,
                [id],
                function(err, results, fields) {
                    console.log("\n<getPageRequiredProducts>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getPageSubscribers(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT user.email, user.nickname
                 FROM animals_user_to_page_info AS user_to_page
                 INNER JOIN animals_user AS user ON user_to_page.user_id = user.id
                 WHERE user_to_page.page_id = ? AND user_to_page.subscribe = 1
                `,
                [id],
                function(err, results, fields) {
                    console.log("\n<getPageSubscribers>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getUserToPageBasicInfo(userId, pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT total_donate, class_level, subscribe FROM animals_user_to_page_info WHERE user_id = ? AND page_id = ?`,
                [userId, pageId],
                function(err, results, fields) {
                    console.log("\n<getUserToPageBasicInfo>");
                    console.log(results);

                    if (err) return reject(err);

                    if (results.length > 0) {
                        resolve(results[0]);
                    }
                    else {
                        resolve({
                            total_donate: 0,
                            class_level: 0,
                            subscribe: 0
                        });
                    }
                }
            );
        });
    }

    updateSubscriber(pageId, userId, subscribe) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `INSERT INTO animals_user_to_page_info(user_id, page_id, total_donate, subscribe, class_level)
                 VALUES(?,?,0,?,0)
                 ON DUPLICATE KEY UPDATE subscribe = ?
                `,
                [userId, pageId, subscribe, subscribe],
                function(err, results, fields) {
                    console.log("\n<updateSubscriber>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
        });
    }

    getPagesOrderBySubscribe(limit) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT animals_page.id, SUM(u2p.subscribe) AS sub FROM animals_page
                 INNER JOIN animals_user_to_page_info AS u2p ON animals_page.id = u2p.page_id
                 GROUP BY animals_page.id
                 ORDER BY sub DESC, id ASC
                 LIMIT ?
                 `,
                [limit],
                function(err, results, fields) {
                    console.log("\n<getPageIdListOrderBySubscribe>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getPagesOrderByNewPost(limit) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT animals_page.id, MAX(post.created_time) AS new_time FROM animals_page
                 INNER JOIN animals_post AS post ON animals_page.id = post.page_id
                 GROUP BY animals_page.id
                 ORDER BY new_time DESC, id ASC
                 LIMIT ?
                 `,
                [limit],
                function(err, results, fields) {
                    console.log("\n<getPagesOrderByNewPost>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
}

const pageDAO = new PageDAO();
module.exports = pageDAO;
