const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Add a menu item
const menuUpload = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newItem = new MenuItem({ name, price, category, restaurantId: req.params.restaurantId });
    await newItem.save();
    res.status(201).json({ message: "Menu item added!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = menuUpload