const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSellerAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, item] of shopItemsMap) {
        const order = await Order.create({
          cart: item,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all orders for user
router.get(
  "/get-all-orders-user/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders for shop
router.get(
  "/get-all-orders-shop/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller only
router.put("/update-order-status/:id", isSellerAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if(!order){
      return next(new ErrorHandler("Order not found", 404));
    }
    
    if(req.body.status === "Shipped"){
      order.cart.forEach(async (item) => {
        await updateOrder(item._id, item.qty);
      })
    }
    
    order.status = req.body.status;
    
    if(req.body.status === "Delivered"){
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Paid";
    }
    
    await order.save({validateBeforeSave: false});
    
    res.status(200).json({success: true, order, message: "Order status updated successfully"});
    
    async function updateOrder(id, qty){
      const product = await Product.findById(id);
      product.stock = Math.max((product.stock || 0) - qty, 0);
      product.soldOut = Math.max((product.soldOut || 0) + qty, 0);
      await product.save({validateBeforeSave: false});
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// apply for refund
router.put("/apply-refund/:id", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if(!order){
      return next(new ErrorHandler("Order not found", 404));
    }
    
    order.status = req.body.status;
    
    await order.save({validateBeforeSave: false});
    
    res.status(200).json({success: true, order, message: "Refund request sent successfully"});
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// accept refund request by seller
router.put("/order-refund-success/:id", isSellerAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if(!order){
      return next(new ErrorHandler("Order not found", 404));
    }

    order.status = req.body.status;

    await order.save();
    
    res.status(200).json({success: true, message: "Order refunded successfully"});
    
    if(req.body.status === "Refund Successful"){
      order.cart.forEach(async (item) => {
        await updateOrder(item._id, item.qty);
      })
    }
    
    async function updateOrder(id, qty){
      const product = await Product.findById(id);
      product.stock = Math.max((product.stock || 0) + qty, 0);
      product.soldOut = Math.max((product.soldOut || 0) - qty, 0);
      await product.save({validateBeforeSave: false});
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
