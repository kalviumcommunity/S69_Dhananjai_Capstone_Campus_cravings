import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ordersData = [
  { id: 1, customer: "John Doe", location: "Campus Library", items: ["Burger", "Fries", "Coke"], price: "₹350", timeLeft: 300 },
  { id: 2, customer: "Jane Smith", location: "Dorm A Block", items: ["Pizza", "Pepsi"], price: "₹200", timeLeft: 300 },
];

const DeliveryRequests = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(ordersData);

  // ⏳ Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders
          .map((order) => ({ ...order, timeLeft: order.timeLeft - 1 }))
          .filter((order) => order.timeLeft > 0) // Remove expired orders
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle Accept: Navigate to order details page
  const handleAccept = (id) => {
    navigate(`/order/${id}`); // Ensure this matches the route in App.js
  };

  // ❌ Handle Reject: Remove order from list
  const handleReject = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 to-blue-600">
      {/* 🌟 Navbar */}
      <nav className="bg-white/20 backdrop-blur-md p-4 flex items-center justify-between shadow-md">
        <div className="text-white font-bold text-2xl flex items-center gap-2">
          <img src="/logo.png" alt="Campus Cravings" className="w-10 h-10" /> Campus Cravings
        </div>
        <ul className="flex space-x-6 text-white text-lg">
          <li className="hover:text-yellow-300 transition"><a href="#">Home</a></li>
          <li className="hover:text-yellow-300 transition"><a href="#">Orders</a></li>
          <li className="hover:text-yellow-300 transition">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/dashdel"); }}>Dashboard</a>
          </li>
        </ul>
      </nav>

      {/* 🚀 Delivery Requests Section */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h2 className="text-4xl font-bold text-white mb-8">📦 Incoming Orders</h2>

        <div className="w-full max-w-3xl space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/20 backdrop-blur-md shadow-xl rounded-xl p-5 flex flex-col gap-4 text-white border border-white/10"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Order #{order.id} - {order.customer}</h3>
                  <span className="text-yellow-300 font-semibold">{order.price}</span>
                </div>
                <p className="text-sm">📍 Deliver to: <span className="font-semibold">{order.location}</span></p>
                <ul className="text-sm list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index} className="opacity-90">{item}</li>
                  ))}
                </ul>

                {/* ⏳ Timer */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-semibold">
                    ⏳ Time Left: <span className={`font-bold ${order.timeLeft <= 30 ? "text-red-400" : "text-yellow-300"}`}>
                      {formatTime(order.timeLeft)}
                    </span>
                  </p>
                  
                  {/* ✅❌ Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAccept(order.id)}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
                    >
                      <CheckCircleIcon className="w-5 h-5" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(order.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
                    >
                      <XCircleIcon className="w-5 h-5" /> Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-white text-lg font-medium text-center">⏳ All orders have expired or been accepted!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryRequests;