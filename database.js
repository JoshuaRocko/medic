const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "medic",
  timezone: "utc",
};

const pool = mysql.createPool(config);
module.exports = pool;
