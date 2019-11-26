"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class PageDAO {
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
                    console.log("<getPageBasicInfo>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results[0]);
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
                    console.log("<getPageSubscribers>");
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
                    console.log("<getUserToPageBasicInfo>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
}

const pageDAO = new PageDAO();
module.exports = pageDAO;
