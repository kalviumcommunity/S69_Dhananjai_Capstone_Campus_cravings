import React, { useState } from "react";
import { motion } from "framer-motion";
import dosa from "../assets/dosa.png";
import biryani from "../assets/biryani.png";
import pastry from "../assets/pastry.png";
import north from "../assets/north.png";
import tandoori from "../assets/tandoori.png";
import lassi from "../assets/lassi.png";
import chickenburger from "../assets/chickenBurger.png";
import logo from "../assets/logo.png";

const foodItems = [
  { name: "Dosa", img: dosa },
  { name: "Biryani", img: biryani },
  { name: "Pastry", img: pastry },
  { name: "North", img: north },
];

const restaurants = [
    { name: "Spice Haven", cuisine: "Indian", rating: "4.5", img: dosa },
    { name: "Campus Bites", cuisine: "Fast Food", rating: "4.2", img: chickenburger },
    { name: "Sweet Tooth", cuisine: "Desserts", rating: "4.7", img: pastry },
  ];

const Food = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000428] to-[#004e92] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-5 px-10 bg-transparent">
        <img src={logo} alt="Campus Cravings" className="w-16" />
        <ul className="flex space-x-25 text-lg font-semibold">
          <li className="hover:text-red-400 cursor-pointer">Home</li>
          <li className="hover:text-red-400 cursor-pointer">Menu</li>
          <li className="hover:text-red-400 cursor-pointer">Orders</li>
          <li className="hover:text-red-400 cursor-pointer">Profile</li>
        </ul>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg bg-blue-900 text-white border border-gray-500 focus:outline-none"
        />
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-12">
        <h1 className="text-6xl font-bold">Campus Cravings</h1>
        <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg text-xl hover:bg-red-700 transition-all">
          Order now
        </button>
      </div>

      {/* Food Categories - Infinite Scrolling */}
      <div className="overflow-hidden mt-16">
        <motion.div
          className="flex gap-14 whitespace-nowrap"
          animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {[...foodItems, ...foodItems].map((food, index) => (
            <div
              key={index}
              className={`text-center min-w-[150px] transition-transform cursor-pointer ${
                selectedFood === food.name ? "scale-110 shadow-lg shadow-blue-400" : ""
              }`}
              onMouseEnter={() => {
                setIsPaused(true);
                setSelectedFood(food.name);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setSelectedFood(null);
              }}
            >
              <img
                src={food.img}
                alt={food.name}
                className="w-28 h-28 mx-auto rounded-full border-2 border-white shadow-lg"
              />
              <p className="mt-2 text-lg font-medium">{food.name}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stationery & Today's Special Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 px-10">
        {/* Stationery Section */}
        <div className="bg-gradient-to-r from-white to-gray-100 text-black p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-purple-700 flex items-center">✏️ Stationary</h2>
          <ul className="mt-6 space-y-4 text-lg">
            {[
              { icon: "🖊", text: "Pen & Pencil" },
              { icon: "📖", text: "Notebooks" },
              { icon: "🍫", text: "Snacks" },
              { icon: "📄", text: "Xerox Services" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Today's Special Section */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-purple-700">Today's Special</h2>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Show Recommendation
          </button>

          {/* Special Items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {[
              { name: "Chicken patty burger", price: "₹140", img: chickenburger },
              { name: "Tandoori chicken", price: "₹240", img: tandoori },
              { name: "Mango Lassi", price: "₹100", img: lassi },
            ].map((item, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <img src={item.img} alt={item.name} className="w-24 h-24 mx-auto rounded-lg" />
                <p className="mt-2 text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.price}</p>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


        {/* Campus Restaurants Section */}
        <div className="mt-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-6">Campus Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(`/restaurant/${restaurant.name}`)}
            >
              <img src={restaurant.img} alt={restaurant.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-4 text-xl font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <p className="text-yellow-500 font-bold">⭐ {restaurant.rating}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 mt-12 bg-gray-900 text-gray-300">
        © 2025 Campus Cravings. All rights reserved.
      </footer>
    </div>
  );
};

export default Food;
