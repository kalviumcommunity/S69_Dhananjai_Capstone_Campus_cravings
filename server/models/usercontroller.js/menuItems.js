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
 const getAllItems = async (req, res) => {
  try {
      const items = await Item.find();
      res.status(200).json(items);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
  }
};

// Get a single item by ID
 const getItemById = async (req, res) => {
  try {
      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(item);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching item', error });
  }
};


module.exports = {menuUpload,getItemById,getAllItems}