const express = require("express");
const user = require("../controllers/user");
const jwtutils = require("../utils/jwt");
const userRouter = express.Router();

// https://expressjs.com/en/guide/routing.html
// - Routing refers to determining how an application responds to a client request
// to a particular endpoint, which is a URI and a specific HTTP request method:
//   - router.METHOD(PATH, MIDDLEWARE/HANDLE)
//userRouter.post("/add/:id");
userRouter.get("/", user.getAll);
userRouter.get("/is-auth", jwtutils.verify, user.isAuth);
userRouter.get("/:uid", user.getByUid);
userRouter.post("/", user.insert);
userRouter.post("/log-in", user.login);
userRouter.post("/sign-out", user.signOut);
userRouter.put("/:uid", jwtutils.verify, user.update);
userRouter.delete("/:uid", jwtutils.verify, user.deleteUser);

module.exports = userRouter;
