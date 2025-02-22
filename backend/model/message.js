const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);