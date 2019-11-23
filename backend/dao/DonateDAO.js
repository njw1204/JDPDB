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
}

const donateDAO = new DonateDAO();
module.exports = donateDAO;
