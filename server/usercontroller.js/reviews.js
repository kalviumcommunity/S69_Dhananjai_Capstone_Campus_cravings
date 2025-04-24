const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const { get } = require("express/lib/response");

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


 const getAllReviews = async (req, res) => {
  try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get reviews for a specific restaurant
 const getReviewsByRestaurantId = async (req, res) => {
  try {
      const reviews = await Review.find({ restaurantId: req.params.restaurantId });
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching restaurant reviews', error });
  }
};

module.exports ={review,getAllReviews,getReviewsByRestaurantId};