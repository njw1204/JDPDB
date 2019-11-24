"use strict";
const pool = require("./helper/pool");
const sqlHelper = require("./helper/sql-helper");

class FileDAO {
    addFileAndGetId(url) {
        return new Promise((resolve, reject) => {
            sqlHelper.query(
                `START TRANSACTION;
                 INSERT INTO animals_file(url) VALUES(?);
                 SELECT LAST_INSERT_ID() AS id;
                 COMMIT
                `,
                [url],
                function(err, results, fields) {
                    console.log("\n<addFile>");
                    console.log(results);

                    if (err) return reject(err);
                    resolve(results[2][0].id);
                }
            );
        });
    }
}

const fileDAO = new FileDAO();
module.exports = fileDAO;
