const express = require("express");
const queries = require("../controllers/queries");
const queriesRouter = express.Router();

queriesRouter.get("/", queries.getAllUsernames);

module.exports = queriesRouter;
