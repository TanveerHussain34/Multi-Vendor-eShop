const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const { isSellerAuthenticated } = require("../middleware/auth");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const shopEmail = await Shop.findOne({ email });

    if (shopEmail) {
      const filename = req.file.filename;
      const filePath = path.join("uploads", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(`Error deleting file`, err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: filename,
        url: fileUrl,
      },
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your account",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please verify your email address. We have sent an email to ${seller.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token for seller/shop
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// activate seller/shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, address, zipCode, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        address,
        zipCode,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.error("Error creating seller:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login seller/shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide your email and password!", 400)
        );
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load seller/shop
router.get(
  "/get-seller",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist!", 400));
      }

      res.status(200).json({ success: true, seller });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
