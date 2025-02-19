const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
// const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSellerAuthenticated, isAuthenticated } = require("../middleware/auth");
const fs = require("fs");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop ID is invalid!", 400));
      }

      const files = req.files;
      const imageUrls = files.map((file) => file.filename || file.location);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all products for a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({ success: true, products });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete a product for a shop
router.delete(
  "/delete-shop-product/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error deleting product images!", err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this ID!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  `/get-all-products`,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(201).json({ success: true, products });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put("/create-new-review", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId } = req.body;
    
    const product = await Product.findById(productId);
    
    const review = {
      user,
      rating,
      comment,
      productId,
    }
    
    const isReviewed = product.reviews.find((rev) => rev.user._id === user._id);
    
    if(isReviewed){
      product.reviews.forEach((rev) => {
        if(rev.user._id === user._id){
          rev.rating = rating;
          rev.comment = comment;
          rev.user = user;
        }
      })
    }else{
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    })

    product.ratings = parseFloat((avg / product.reviews.length).toFixed(1));

    await product.save({ validateBeforeSave: false });

    res.status(200).json({success: true, message: "Review submitted successfully!"});
    
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}));

module.exports = router;
