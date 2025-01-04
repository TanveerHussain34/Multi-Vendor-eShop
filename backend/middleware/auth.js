// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const User = require("../model/user");

// exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies.token;

//   if (!token) {
//     return next(new ErrorHandler("Please login to continue!", 401));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   req.user = await User.findById(decoded.id);

//   next();
// });
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found. Please login again!", 404));
    }

    next();
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired token. Please login again!", 401)
    );
  }
});
