const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
const user = require("./controller/user");

// It's for error handling
app.use(ErrorHandler);
module.exports = app;
