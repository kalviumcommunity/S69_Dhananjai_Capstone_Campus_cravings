const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  owner: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }
  },
  restaurant: {
    name: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  menu: {
    images: [{ type: String }], // URLs of menu images
    cuisines: [{ type: String }], // Array of selected cuisines
    openingTime: { type: String, required: true }, // e.g., "9:00 AM"
    closingTime: { type: String, required: true }, // e.g., "10:00 PM"
    openDays: [{ type: String }] // Array of open days (e.g., ["Monday", "Tuesday"])
  },
  documents: {
    pan: {
      number: { type: String, required: true },
      nameOnPan: { type: String, required: true },
      address: { type: String, required: true },
      fileUrl: { type: String } // PAN document upload URL
    },
    fssai: {
      number: { type: String, required: true },
      expiryDate: { type: Date, required: true },
      fileUrl: { type: String } // FSSAI license upload URL
    },
    bank: {
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      accountType: { type: String, enum: ["Saving", "Current"], required: true },
      verified: { type: Boolean, default: false }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);