const dbQueries = require("../db/queries");

module.exports = {
  getAllUsernames: async (req, res, next) => {
    try {
      const usernames = await dbQueries.getAllUsernames();
      res.json({ message: "Success", usernames });
    } catch (err) {
      next(err);
    }
  },
};
