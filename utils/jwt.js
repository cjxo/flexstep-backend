const jwt = require("jsonwebtoken");
const env = require("./config");

module.exports = {
  verify: async (req, res, next) => {
    try {
      const token = req.cookies.remember_me_token;
      if (!token) {
        return res.status(401).json({ status: "failure", message: "No token provided!" });
      }

      jwt.verify(token, env.JWT_TOKEN_ACCESS, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .json({ status: "failure", message: "Invalid Token" });
        } else {
          req.userId = decoded.userId;
          req.timeRemaining = decoded.exp - Math.floor(Date.now() / 1000);
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  },
};
