const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place a new order
const newOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalPrice } = req.body;
    const newOrder = new Order({ userId, restaurantId, items, totalPrice, status: "Pending" });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm an order
const confirmOrder= async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, { status: "Confirmed" });
    res.json({ message: "Order confirmed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {newOrder,confirmOrder}