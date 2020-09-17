const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Thread = new Schema({
  authorId: {
    type: String,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  text: {
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
});

module.exports = mongoose.model("Thread", Thread);
