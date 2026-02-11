const bcrypt = require("bcryptjs");
const { user } = require("../db/queries");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await user.getAll();
      res.json({ status: "success", users });
    } catch (err) {
      next(err);
    }
  },

  getByUid: async (req, res, next) => {
    try {
      const resultUser = await user.getByUid(req.params.uid);
      res.json({ status: "success", user: resultUser });
    } catch (err) {
      next(err);
    }
  },

  // aka signup
  insert: async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).json({ status: "failure", message: "All fields are required.",  });
      }

      const { first_name, last_name, username, password, email } = req.body;
      if (!first_name || !last_name || !username || !email) {
        return res.status(400).json({ status: "failure", message: "All fields are required.",  });
      }
      
      if (password.length < 8) {
        return res.status(400).json({ status: "failure", message: "Password must be at least 8 characters." });
      }

      const temp0 = await user.getByEmail(email);
      if (temp0) {
        return res.status(400).json({ status: "failure", message: "Email is already being used." });
      }

      const temp1 = await user.getByUsername(username);
      if (temp1) {
        return res.status(400).json({ status: "failure", message: "Username is already being used." });
      }

      const password_hashed = await bcrypt.hash(password, 10);
      const resultUser = await user.insert(first_name, last_name, username, password_hashed, email);
      res.status(201).json({ status: "success", message: "Created user. Please log in.", user: resultUser });
    } catch (err) {
      next(err);
    }
  },
};
