const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const user = require("../model/user");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await User.fineOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.fieldname;
  const fileUrl = path.join("uploads", filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: __filename,
      url,
      fileUrl,
    },
  };
});

// router.post("/create-user", async (req, res, next) => {
//   console.log(req.body);
//   try {
//     const { name, email, password, avatar } = req.body;
//     const userEmail = await User.findOne({ email });

//     if (userEmail) {
//       return next(new ErrorHandler("User already exists", 400));
//     }

//     const filename = req.file.filename;
//     const fileUrl = path.join("uploads", filename);
//     const user = {
//       name: name,
//       email: email,
//       password: password,
//       avatar: {
//         public_id: filename,
//         url: fileUrl,
//       },
//     };

// console.log("User:", user);

// const activationToken = createActivationToken(user);

// const activationUrl = `http://localhost:5173/activation/${activationToken}`;

// try {
//   await sendMail({
//     email: user.email,
//     subject: "Activate your account",
//     message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
//   });
//   res.status(201).json({
//     success: true,
//     message: `Please check your email:- ${user.email} to activate your account`,
//   });
// } catch (error) {
//   return next(new ErrorHandler(error.message, 500));
// }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

// create activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
// };

// activate user
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }

//       const { name, email, password, avatar } = newUser;

//       let user = await User.findOne({ email });

//       if (user) {
//         return next(new ErrorHandler("User already exists", 400));
//       }

//       user = await User.create({
//         name,
//         email,
//         avatar: {
//           public_id,
//           url,
//         },
//         password,
//       });

//       sendToken(user, 201, res);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
