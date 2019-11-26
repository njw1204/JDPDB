"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class DonateDAO {
    getDonateClassesOfPage(pageId) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT class_level, class_name, cost, reward_description
                 FROM animals_page_donate_class
                 WHERE page_id = ?
                 ORDER BY class_level
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

    donateMoney(userId, pageId, cost, message) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `START TRANSACTION;

                 INSERT INTO animals_donate_money(from_user_id, to_page_id, cost, message)
                 VALUES(?,?,?,?);

                 INSERT INTO animals_user_to_page_info(user_id, page_id, total_donate, subscribe, class_level)
                 VALUES(?,?,?,0,0)
                 ON DUPLICATE KEY UPDATE total_donate = total_donate + ?;

                 UPDATE animals_user_to_page_info
                 SET class_level =
                 (SELECT * FROM (SELECT MAX(r.class_level)
                 FROM animals_user_to_page_info AS l
                 INNER JOIN animals_page_donate_class AS r
                 ON l.page_id = r.page_id
                 WHERE user_id = ? AND total_donate >= cost) AS t)
                 WHERE user_id = ? AND page_id = ?;

                 UPDATE animals_user
                 SET point = point - ?
                 WHERE id = ?;

                 COMMIT;
                `,
                [userId, pageId, cost, message,
                 userId, pageId, cost, cost,
                 userId, userId, pageId,
                 cost, userId
                ],
                function(err, results, fields) {
                    console.log("\n<donateMoney>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
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
                        console.log(results);

                        if (err) {
                            conn.release();
                            return reject(err);
                        }

                        if (results[1][0].cnt === 0) {
                            conn.release();
                            return reject(new Error("donateProduct: Not required product"));
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
                             (SELECT * FROM (SELECT MAX(r.class_level)
                             FROM animals_user_to_page_info AS l
                             INNER JOIN animals_page_donate_class AS r
                             ON l.page_id = r.page_id
                             WHERE user_id = ? AND total_donate >= cost) AS t)
                             WHERE user_id = ? AND page_id = ?;

                             COMMIT
                            `,
                            [userId, pageId, productId, productCount, message,
                             productCount, pageId, productId,
                             productCount, productId, userId,
                             userId, pageId, productCount, productId, productCount, productId,
                             userId, userId, pageId
                            ],
                            (err, results, fields) => {
                                console.log("\n<donateProduct>");
                                console.log(results);
                                conn.release();

                                if (err) return reject(err);
                                resolve(true);
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
