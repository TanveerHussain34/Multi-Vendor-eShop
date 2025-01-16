const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// user authentication check
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

// seller/shop authentication check
exports.isSellerAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
      return next(
        new ErrorHandler("Seller not found. Please login again!", 404)
      );
    }

    next();
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired token. Please login again!", 401)
    );
  }
});
