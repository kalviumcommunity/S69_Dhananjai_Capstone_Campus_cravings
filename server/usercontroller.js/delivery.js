const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");

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



 const getOrdersByUserId = async (req, res) => {
  try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get a single order by ID
 const getOrderById = async (req, res) => {
  try {
      const order = await Order.findById(req.params.orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching order', error });
  }
};




// Get all delivery personnel
 const getAllDeliveryPersonnel = async (req, res) => {
    try {
        const deliveryPeople = await DeliveryPerson.find();
        res.status(200).json(deliveryPeople);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery personnel', error });
    }
};

// Get a specific delivery person by ID
 const getDeliveryPersonById = async (req, res) => {
    try {
        const deliveryPerson = await DeliveryPerson.findById(req.params.id);
        if (!deliveryPerson) return res.status(404).json({ message: 'Delivery person not found' });
        res.status(200).json(deliveryPerson);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery person', error });
    }
};

module.exports = {acceptOrder,completeOrder,getOrderById,getOrdersByUserId,getAllDeliveryPersonnel,getDeliveryPersonById}