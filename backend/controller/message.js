const express = require('express');
const Message = require('../model/message');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const { upload } = require("../multer");

// create new message
router.post('/create-new-message', upload.array("images"), catchAsyncErrors(async (req, res, next) => {
  try {
    const messageData = req.body;
    
    if(req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => file.fileName);
        messageData.images = imageUrls;
    }

    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.seller;

    const message = await Message.create({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : [],

    });

    await message.save();

    res.status(201).json({ success: true, message });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;