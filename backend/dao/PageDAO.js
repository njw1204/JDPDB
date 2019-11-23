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
                `SELECT page.id, user.nickname, page.animal_name, page.description, category.name AS category, file.url AS profile_picture
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
}

const pageDAO = new PageDAO();
module.exports = pageDAO;
