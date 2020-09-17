const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const registrationRoutes = require("./routes/UserRoutes");
const postAddicRoutes = require("./routes/AddicRoutes");
const threadRoutes = require("./routes/ThreadRoutes");

const db = require("./keys").mongoURI;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: "test",
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

////MiddleWare/////
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", registrationRoutes);
app.use("/post", postAddicRoutes);
app.use("/thread", threadRoutes);

module.exports = app;
