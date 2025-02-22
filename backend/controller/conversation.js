const express = require('express');
const Conversation = require('../model/conversation');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const { isSellerAuthenticated } = require('../middleware/auth');

// Create a new conversation
router.post('/create-new-conversation', catchAsyncErrors(async (req, res, next) => {
  try {
    const {groupTitle, userId, sellerId} = req.body;
    
    const isConversationExist = await Conversation.findOne({groupTitle});
    
    if (isConversationExist) {
        const conversation = isConversationExist;
        return res.status(201).json({ success: true, conversation });
    }

    const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,

    });

    res.status(201).json({ success: true, conversation });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// get all conversations seller
router.get('/get-all-conversations-seller/:id', isSellerAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const conversations = await Conversation.find({members: { $in: [req.params.id] }}).sort({updatedAt: -1, createdAt: -1});
        res.status(201).json({ success: true, conversations });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router;