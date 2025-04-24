// controllers/putControllers.js

const DeliveryStudent = require("../models/deliveryStudent");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

// Update delivery student profile
const updateDeliveryStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await DeliveryStudent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Delivery student not found" });
    res.json({ message: "Delivery student updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update restaurant profile
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Restaurant not found" });
    res.json({ message: "Restaurant updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  updateDeliveryStudent,
  updateOrder,
  updateRestaurant,
  updateUser
};
