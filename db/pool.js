const { Pool } = require("pg");
const {
  PG_CONNECTION_STRING,
} = require("../utils/config.js");

const pool = new Pool({
  connectionString: PG_CONNECTION_STRING,
//  host: "192.168.44.2",
//  port: 5432,
//  user: "sysadmin",
//  database: "censored",
//  password: "censored",
});

pool.on("error", (err, client) => {
  console.error(err.stack);
});

module.exports = pool;
