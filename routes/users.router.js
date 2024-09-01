const express = require("express");
const { getUsers, getUsersByID } = require("../controllers/news.controllers");

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUsersByID);
module.exports = usersRouter;
