const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SECTION  collection and schema for Registration
let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    passwordConfirm: {
      type: String,
      required: true,
    },

    userimg: {
      data: Buffer,
      contentType: String,
    },
    adds: {
      type: [String],
    },
    createdAt: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "User",
  }
);

module.exports = mongoose.model("User", UserSchema);
