const mongoose = require("mongoose");

const deliveryStudentSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    vehicle_type: {
      type: String,
      enum: ["bicycle", "walking"],
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    total_deliveries: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    ratings: {
      total_ratings: { type: Number, default: 0 },
      average_rating: { type: Number, default: 0 },
    },
    assigned_orders: [
      {
         // relation between delivery student and order
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        status: {
          type: String,
          enum: ["pending", "accepted", "picked_up", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
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

const DeliveryStudent = mongoose.model("DeliveryStudent", deliveryStudentSchema);

module.exports = DeliveryStudent;