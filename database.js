const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "n0m3l0s3",
  database: "medic",
};

const pool = mysql.createPool(config);

module.exports = pool;
