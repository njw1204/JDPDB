"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class DonateDAO {
    getProduct(productId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT product.id, product.name, product.description, product.cost, file.url
                 FROM animals_product AS product
                 LEFT OUTER JOIN animals_file AS file ON file.id = product.picture_file_id
                 WHERE product.id = ?
                `,
                [productId],
                function(err, results, fields) {
                    console.log("\n<getProduct>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0]);
                }
            );
        });
    }

    getAllProducts() {
        return new Promise((resolve, reject) => {
            sqlHelper.simpleQuery(
                `SELECT * FROM animals_product`,
                function (err, results, fields) {
                    console.log("\n<getAllProducts>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getDonateMoneysOfPage(pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT money.id, nickname, from_user_id AS user_id, to_page_id AS page_id, cost, message
                 FROM animals_donate_money AS money
                 INNER JOIN animals_user AS user ON user.id = money.from_user_id
                 WHERE to_page_id = ?
                 ORDER BY id DESC`,
                [pageId],
                function(err, results, fields) {
                    console.log("\n<getDonateMoneysOfPage>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getDonateProductsOfPage(pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT donate.id, nickname, from_user_id AS user_id, to_page_id AS page_id, product_id, product.name, product.description, product_count, (product_count * product.cost) AS cost, message, file.url
                 FROM animals_donate_product AS donate
                 INNER JOIN animals_user AS user ON user.id = donate.from_user_id
                 INNER JOIN animals_product AS product ON product.id = donate.product_id
                 LEFT OUTER JOIN animals_file AS file ON file.id = product.picture_file_id
                 WHERE donate.to_page_id = ?
                 ORDER BY donate.id DESC`,
                [pageId],
                function(err, results, fields) {
                    console.log("\n<getDonateProductsOfPage>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    getDonateClassesOfPage(pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT id, class_name, cost, reward_description
                 FROM animals_page_donate_class
                 WHERE page_id = ?
                 ORDER BY cost
                `,
                [pageId],
                function(err, results, fields) {
                    console.log("\n<getDonateClassesOfPage>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    checkDonateClassOfPageByCost(pageId, cost) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT COUNT(*) AS cnt FROM animals_page_donate_class
                 WHERE page_id = ? AND cost = ?
                `,
                [pageId, cost],
                function(err, results, fields) {
                    console.log("\n<checkDonateClassOfPageByCost>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results[0].cnt);
                }
            );
        });
    }

    addDonateClass(name, cost, reward, pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `INSERT INTO animals_page_donate_class(class_name, cost, reward_description, page_id)
                 VALUES(?, ?, ?, ?)
                `,
                [name, cost, reward, pageId],
                function(err, results, fields) {
                    console.log("\n<addDonateClass>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
        });
    }

    deleteDonateClass(classId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `DELETE FROM animals_page_donate_class WHERE id = ?`,
                [classId],
                function(err, results, fields) {
                    console.log("\n<deleteDonateClass>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
        });
    }

    revalidateDonateClass(pageId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);
                conn.query(
                    `START TRANSACTION;

                     SELECT user_id FROM animals_user_to_page_info WHERE page_id = ?
                    `,
                    [pageId],
                    function(err, results, fields) {
                        if (err) {
                            reject(err);
                            return sqlHelper.rollback(conn);
                        }

                        let calls = [];
                        for (let user of results[1]) {
                            let userId = user.user_id;
                            calls.push(new Promise((resolve, reject) => {
                                conn.query(
                                    `UPDATE animals_user_to_page_info
                                     SET class_level =
                                     COALESCE((SELECT * FROM (SELECT COUNT(*)
                                     FROM animals_user_to_page_info AS l
                                     INNER JOIN animals_page_donate_class AS r
                                     ON l.page_id = r.page_id
                                     WHERE user_id = ? AND r.page_id = ? AND total_donate >= cost) AS t), 0)
                                     WHERE user_id = ? AND page_id = ?
                                    `,
                                    [userId, pageId, userId, pageId],
                                    function(err, results, fields) {
                                        if (err) return reject(err);
                                        resolve(true);
                                    }
                                );
                            }));
                        }

                        Promise.all(calls).then((values) => {
                            console.log("\n<revalidateDonateClass>");
                            console.log(values);
                            resolve(true);
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

    donateMoney(userId, pageId, cost, message) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);
                conn.query(
                    `START TRANSACTION;

                     INSERT INTO animals_donate_money(from_user_id, to_page_id, cost, message)
                     VALUES(?,?,?,?);

                     INSERT INTO animals_user_to_page_info(user_id, page_id, total_donate, subscribe, class_level)
                     VALUES(?,?,?,0,0)
                     ON DUPLICATE KEY UPDATE total_donate = total_donate + ?;

                     UPDATE animals_user_to_page_info
                     SET class_level =
                     COALESCE((SELECT * FROM (SELECT COUNT(*)
                     FROM animals_user_to_page_info AS l
                     INNER JOIN animals_page_donate_class AS r
                     ON l.page_id = r.page_id
                     WHERE user_id = ? AND r.page_id = ? AND total_donate >= cost) AS t), 0)
                     WHERE user_id = ? AND page_id = ?;

                     UPDATE animals_user
                     SET point = point - ?
                     WHERE id = ?
                    `,
                    [userId, pageId, cost, message,
                     userId, pageId, cost, cost,
                     userId, pageId, userId, pageId,
                     cost, userId],
                    function(err, results, fields) {
                        console.log("\n<donateMoney>");
                        console.log(results);

                        if (err) {
                            reject(err);
                            return sqlHelper.rollback(conn);
                        }

                        resolve(true);
                        sqlHelper.commit(conn);
                    }
                );
            });
        });
    }

    donateProduct(userId, pageId, productId, productCount, message) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);
                conn.query(
                    `START TRANSACTION;
                     SELECT COUNT(*) AS cnt FROM animals_required_products WHERE page_id = ? AND product_id = ?
                    `,
                    [pageId, productId],
                    (err, results, fields) => {
                        if (err) {
                            reject(err);
                            return sqlHelper.rollback(conn);
                        }

                        if (results[1][0].cnt === 0) {
                            reject(new Error("donateProduct: Not required product"));
                            return sqlHelper.rollback(conn);
                        }

                        conn.query(
                            `INSERT INTO animals_donate_product(from_user_id, to_page_id, product_id, product_count, message)
                             VALUES(?,?,?,?,?);

                             UPDATE animals_required_products
                             SET product_count = product_count - ?
                             WHERE page_id = ? AND product_id = ?;

                             UPDATE animals_user
                             SET point = (point - ? * (SELECT cost FROM animals_product WHERE id = ?))
                             WHERE id = ?;

                             INSERT INTO animals_user_to_page_info(user_id, page_id, total_donate, subscribe, class_level)
                             VALUES(?, ?, ? * (SELECT cost FROM animals_product WHERE id = ?), 0, 0)
                             ON DUPLICATE KEY UPDATE total_donate = total_donate + ? * (SELECT cost FROM animals_product WHERE id = ?);

                             UPDATE animals_user_to_page_info
                             SET class_level =
                             COALESCE((SELECT * FROM (SELECT COUNT(*)
                             FROM animals_user_to_page_info AS l
                             INNER JOIN animals_page_donate_class AS r
                             ON l.page_id = r.page_id
                             WHERE user_id = ? AND r.page_id = ? AND total_donate >= cost) AS t), 0)
                             WHERE user_id = ? AND page_id = ?
                            `,
                            [userId, pageId, productId, productCount, message,
                             productCount, pageId, productId,
                             productCount, productId, userId,
                             userId, pageId, productCount, productId, productCount, productId,
                             userId, pageId, userId, pageId],
                            (err, results, fields) => {
                                console.log("\n<donateProduct>");
                                console.log(results);

                                if (err) {
                                    reject(err);
                                    return sqlHelper.rollback(conn);
                                }

                                resolve(true);
                                sqlHelper.commit(conn);
                            }
                        );
                    }
                );
            });
        });
    }
}

const donateDAO = new DonateDAO();
module.exports = donateDAO;
