require("dotenv").config();

module.exports = {
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
  NODE_ENV: process.env.NODE_ENV,
  JWT_TOKEN_ACCESS: process.env.JWT_TOKEN_ACCESS,
};
