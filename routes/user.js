const express = require("express");
const user = require("../controllers/user");
const userRouter = express.Router();

// https://expressjs.com/en/guide/routing.html
// - Routing refers to determining how an application responds to a client request
// to a particular endpoint, which is a URI and a specific HTTP request method:
//   - router.METHOD(PATH, MIDDLEWARE/HANDLE)
//userRouter.post("/add/:id");
userRouter.get("/", user.getAll);
userRouter.get("/:uid", user.getByUid);
userRouter.post("/", user.insert);

module.exports = userRouter;
