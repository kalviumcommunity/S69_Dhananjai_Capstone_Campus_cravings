import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ordersData = [
  { id: 1, customer: "John Doe", location: "Campus Library", items: ["Burger", "Fries", "Coke"], price: "₹350" },
  { id: 2, customer: "Jane Smith", location: "Dorm A Block", items: ["Pizza", "Pepsi"], price: "₹200" },
];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = ordersData.find((o) => o.id === parseInt(id));

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 to-blue-600">
      
      {/* 🌟 Navbar */}
      <nav className="bg-white/20 backdrop-blur-md p-4 flex items-center justify-between shadow-md">
        <div className="text-white font-bold text-2xl flex items-center gap-2">
          <img src="/logo.png" alt="Campus Cravings" className="w-10 h-10" /> Campus Cravings
        </div>
        <ul className="flex space-x-6 text-white text-lg">
          <li className="hover:text-yellow-300 transition cursor-pointer" onClick={() => navigate("/")}>Home</li>
          <li className="hover:text-yellow-300 transition cursor-pointer" onClick={() => navigate("/orders")}>Orders</li>
          <li className="hover:text-yellow-300 transition cursor-pointer" onClick={() => navigate("/dashdel")}>Dashboard</li>
        </ul>
      </nav>

      {/* 📦 Order Details */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-4xl font-bold text-white mb-6">📦 Order #{order?.id} Details</h1>

        <div className="w-full max-w-lg bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10">
          <div className="flex flex-col space-y-3 text-white text-lg">
            
            <div className="flex justify-between">
              <span className="font-semibold">👤 Customer:</span>
              <span>{order?.customer}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">📍 Location:</span>
              <span>{order?.location}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">🍽️ Items:</span>
              <ul className="list-disc list-inside text-gray-200 mt-1">
                {order?.items.map((item, index) => (
                  <li key={index} className="opacity-90">{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between text-yellow-300 font-semibold text-xl">
              <span>💰 Price:</span>
              <span>{order?.price}</span>
            </div>
          </div>
        </div>

        {/* 💬 Chat Box */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md border border-white/10 mt-6">
          <h2 className="text-white text-xl font-semibold mb-4 text-center">💬 Chat with Customer</h2>
          
          {/* Chat Messages */}
          <div className="h-48 overflow-y-auto bg-white/10 p-3 rounded-md border border-white/20">
            {chat.length === 0 ? (
              <p className="text-gray-300 text-center">No messages yet</p>
            ) : (
              chat.map((msg, index) => (
                <p key={index} className="text-white">
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-l-md border border-white/30 bg-white/20 text-white placeholder-gray-300 outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-r-md font-semibold transition ${message.trim() ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;