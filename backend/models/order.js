const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    delivery_partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },
    delivery_address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip_code: { type: String, required: true },
      instructions: { type: String },
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["cash", "credit_card", "debit_card", "upi"],
      default: "cash",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;