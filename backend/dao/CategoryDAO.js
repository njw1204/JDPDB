"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class CategoryDAO {
    getCategory(id) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `SELECT id, name FROM animals_category WHERE id = ?`,
                [id],
                function(err, results, fields) {
                    console.log("\n<getCategory>");
                    console.log(results);

                    if (err || results.length < 1)
                        return resolve(null);

                    resolve(results[0]);
                }
            );
        });
    }

    getCategoryList() {
        return new Promise((resolve, reject) => {
            sqlHelper.simpleQuery(
                `SELECT id, name FROM animals_category ORDER BY id ASC`,
                function(err, results, fields) {
                    console.log("\n<getCategoryList>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    addCategory(name) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `INSERT INTO animals_category(name) VALUES(name)`,
                [name],
                function(err, results, fields) {
                    console.log("\n<addCategory>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(true);
                }
            );
        });
    }
}

const categoryDAO = new CategoryDAO();
module.exports = categoryDAO;
