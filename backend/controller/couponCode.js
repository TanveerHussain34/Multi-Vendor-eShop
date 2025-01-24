const express = require("express");
const router = express.Router();
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSellerAuthenticated } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");

// create coupon code
router.post(
  "/create-coupon-code",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExist = await CouponCode.find({ name: req.body.name });

      if (isCouponCodeExist.length > 0) {
        return next(new ErrorHandler("Coupon code already exist!", 400));
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        message: "Coupon code created successfully!",
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-all-coupons-shop/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponCode.find({
        shopId: req.seller.id,
      });

      res.status(201).json({ success: true, coupons });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete a coupon code
router.delete(
  "/delete-coupon-code/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponCode.findByIdAndDelete(req.params.id);

      if (!coupons) {
        return next(new ErrorHandler("Coupon code dosen't exist!", 404));
      }

      res
        .status(201)
        .json({ success: true, message: "Coupon deleted successfully!" });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value/discount %age by its name
router.get(
  "/get-coupon-value/:name",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponCode.findOne({
        name: req.params.name,
      });

      res.status(200).json({ success: true, coupons });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
