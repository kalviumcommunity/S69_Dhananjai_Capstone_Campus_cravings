const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Accept order for delivery
const acceptOrder = async (req, res) => {
  try {
    const { deliveryPersonId } = req.body;
    await Order.findByIdAndUpdate(req.params.orderId, { status: "Out for Delivery", deliveryPersonId });
    res.json({ message: "Order accepted for delivery!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complete delivery
const completeOrder =  async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, { status: "Delivered" });
    res.json({ message: "Order delivered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {acceptOrder,completeOrder}