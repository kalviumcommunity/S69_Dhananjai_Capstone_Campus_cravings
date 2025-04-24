const express = require("express");
const router = express.Router();

// Payment checkout
const payment = async (req, res) => {
  try {
    const { userId, orderId, amount } = req.body;
    // Payment logic here...
    res.json({ message: "Payment successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = payment;