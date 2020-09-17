const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let addics = new Schema({
  authorId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Number,
    required: true,
  },

  comments: {
    type: [
      {
        commenterId: String,
        text: String,
        timestamp: Number,
      },
    ],
  },

  cardColor: {
    type: String,
  },

  likers: {
    type: [String],
    required: true,
  },

  likesCount: {
    type: Number,
    required: true,
  },

  goal: {
    type: String,
  },
});

module.exports = mongoose.model("addic", addics);
