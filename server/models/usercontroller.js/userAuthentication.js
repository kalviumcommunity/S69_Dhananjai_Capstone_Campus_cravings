const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
const login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });
    res.json({ message: "Login successful!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {signUp,login};