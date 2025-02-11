const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter product discount price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock!"],
  },
  images: [
    {
      type: String,
      required: [true, "Please add product images!"],
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
    },
  ],
  ratings: [
    {
      type: Number,
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

module.exports = mongoose.model("Product", productSchema);
