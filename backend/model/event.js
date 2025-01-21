const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter event name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter event product category!"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter event product discount price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter event product stock!"],
  },
  images: [
    {
      type: String,
      required: [true, "Please add event product images!"],
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  soldOut: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
