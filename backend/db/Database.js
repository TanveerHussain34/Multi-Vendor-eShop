const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = connectDatabase;
