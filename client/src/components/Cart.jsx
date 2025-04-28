import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './FoodStationary'; 
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart } = useCart(); 
  const [removingIndex, setRemovingIndex] = useState(null); // Track which item is being removed
  const navigate = useNavigate();

  const convertPrice = (price) => {
    const inrValue = parseFloat(price.replace('₹', ''));
    return inrValue;
  };

  const totalAmount = cart
    .reduce((total, item) => total + convertPrice(item.price) * item.quantity, 0)
    .toFixed(2);

  const removeFromCart = (indexToRemove) => {
    setRemovingIndex(indexToRemove);
    setTimeout(() => {
      const updatedCart = cart.filter((_, index) => index !== indexToRemove);
      setCart(updatedCart);
      setRemovingIndex(null); // Reset after removal
    }, 400); // Wait for 400ms (same as animation duration)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-800 text-white font-poppins p-4 md:p-8">

      {/* Navbar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Campus Cravings Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-2xl font-bold text-orange-400">Campus Cravings</h1>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-400 text-center drop-shadow-md">
        🛒 Food Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-300 text-center text-lg mt-10">
          Your food cart is empty.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div
                key={item.name + index}
                className="relative bg-white/90 p-5 rounded-2xl shadow-lg backdrop-blur-md flex flex-col md:flex-row items-center justify-between hover:shadow-orange-400/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 100 }}
                transition={{ duration: 0.4 }}
              >
                {/* Remove Button */}
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors"
                  onClick={() => removeFromCart(index)}
                  disabled={removingIndex !== null} // Disable during removing
                  aria-label="Remove item"
                >
                  ❌
                </button>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-orange-400/50"
                    />
                  )}
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      ₹{convertPrice(item.price).toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-gray-800 font-medium mt-1">
                      Subtotal: ₹{(convertPrice(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <p className="text-gray-700 font-semibold">Qty: {item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Total & Checkout */}
      {cart.length !== 0 && (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
          <p className="text-2xl md:text-3xl font-bold text-orange-400">
            Total: ₹{totalAmount}
          </p>

          <motion.button
            className="mt-4 md:mt-0 w-full md:w-auto px-8 py-4 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>navigate("/checkout")}
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Cart;