const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Submit a restaurant review
const review =  async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const newReview = new Review({ userId, restaurantId: req.params.restaurantId, rating, comment });
    await newReview.save();
    res.status(201).json({ message: "Review submitted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports =review;