const pool = require("./pool");

module.exports = {
  getAllUsernames: async () => {
    const { rows } = await pool.query("SELECT * FROM users;");
    return rows;
  },

  user: {
    getAll: async () => {
      const sql = `
        SELECT
          id, first_name, last_name,
          username, email, joined_date,
          update_date
        FROM
          users;
      `;
      const { rows } = await pool.query(sql);
      return(rows);
    },

    getByUid: async (uid) => {
      const sql = `
        SELECT * FROM users
        WHERE id = $1;
      `;

      const { rows } = await pool.query(sql, [uid]);
      return(rows[0]);
    },

    getByEmail: async (email) => {
      const sql = `
        SELECT * FROM users
        WHERE email = $1;
      `;

      const { rows } = await pool.query(sql, [email]);
      return(rows[0]);
    },

    getByUsername: async (username) => {
      const sql = `
        SELECT * FROM users
        WHERE username = $1;
      `;

      const { rows } = await pool.query(sql, [username]);
      return(rows[0]);
    },

    insert: async (first_name, last_name, username, password_hashed, email) => {
      const sql = `
        INSERT INTO users
          (first_name, last_name, username, password_hashed, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, username, email, joined_date, update_date;
      `;

      const { rows } = await pool.query(sql, [first_name, last_name, username, password_hashed, email]);
      return(rows[0]);
    },

    update: async (uid, newUser) => {
      const sql = `
        UPDATE users
        SET
          first_name = $2,
          last_name = $3,
          username = $4,
          email = $5
        WHERE id = $1
        RETURNING id, first_name, last_name, username, email, joined_date, update_date;
      `;

      const { rows } = await pool.query(sql, [uid, newUser.first_name, newUser.last_name, newUser.username, newUser.email]);
      return(rows[0]);
    },
  },
};
