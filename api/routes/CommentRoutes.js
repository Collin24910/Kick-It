const express = require("express");
const commentroutes = express.Router();
let Comment = require("../schema/Comment");

commentroutes.route("/comment").post(function(req, res) {
  let comment = new Comment();
  comment.commenter = req.User;
  comment.body = req.body.body;
  comment.date = new Date();
  comment.stock = req.stock;
  comment
    .save()
    .then((reg) => {
      res.sendStatus(200);
      console.log("Comment was stored");
    })
    .catch((err) => {
      res.status(400).send("Failed to store comment");
    });
});
