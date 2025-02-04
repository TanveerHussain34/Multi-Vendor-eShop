const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const couponCode = require("./controller/couponCode");
const payment = require("./controller/payment");
const order = require("./controller/order");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/couponCode", couponCode);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);

// It's for error handling
app.use(ErrorHandler);
module.exports = app;
