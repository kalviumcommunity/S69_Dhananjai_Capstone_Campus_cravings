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

 const getAllRestaurants = async (req, res) => {
  try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};

// Get a single restaurant by ID
 const getRestaurantById = async (req, res) => {
  try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
      res.status(200).json(restaurant);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching restaurant', error });
  }
};


module.exports = {newOrder,confirmOrder,getAllRestaurants,getRestaurantById}