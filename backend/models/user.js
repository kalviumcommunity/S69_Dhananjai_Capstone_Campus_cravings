
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { 
    type: String, 
    enum: ['User', 'Restaurant', 'Delivery'], 
    default: 'User' 
  }, // Defines user type
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
