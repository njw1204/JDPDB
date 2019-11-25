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
                 (SELECT MAX(r.class_level)
                 FROM animals_user_to_page_info AS l
                 INNER JOIN animals_page_donate_class AS r
                 ON l.page_id = r.page_id
                 WHERE total_donate >= cost AND user_id = ?);

                 UPDATE animals_user
                 SET point = point - ?;

                 COMMIT;
                `,
                [userID, pageId, cost, message, userId, pageId, cost, cost, userId, cost],
                function(err, results, fields) {
                    console.log("\n<donateMoney>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
}

const donateDAO = new DonateDAO();
module.exports = donateDAO;
