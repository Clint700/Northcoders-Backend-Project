const express = require("express");
const { patchComment, deleteComment } = require("../controllers/news.controllers");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id")
.patch(patchComment)
.delete(deleteComment);

module.exports = commentsRouter;
