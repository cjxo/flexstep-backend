const pool = require("./pool");

module.exports = {
  getAllUsernames: async () => {
    const { rows } = await pool.query("SELECT * FROM users;");
    return rows;
  },
};
