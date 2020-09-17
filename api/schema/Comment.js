const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    body: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  },
  {
    collection: "Comment",
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
