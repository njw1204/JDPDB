"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class TagDAO {
    getTag(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT id, name FROM animals_tag WHERE id = ?`,
                [id],
                function(err, results, fields) {
                    console.log("\n<getTag>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0]);
                }
            );
        });
    }

    getTagList() {
        return new Promise((resolve, reject) => {
            sqlHelper.simpleQuery(
                `SELECT id, name FROM animals_tag ORDER BY id ASC`,
                function(err, results, fields) {
                    console.log("\n<getTagList>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
}

const tagDAO = new TagDAO();
module.exports = tagDAO;
