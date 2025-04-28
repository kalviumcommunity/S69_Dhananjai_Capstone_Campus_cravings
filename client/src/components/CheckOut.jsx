import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './FoodStationary'; // Import useCart
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart(); // Access cart state from CartContext
  const navigate = useNavigate();

  // Helper function to convert INR string to number
  const convertPrice = (price) => {
    const inrValue = parseFloat(price.replace('₹', '')); // Remove ₹ and parse to number
    return inrValue; // Return INR value as is
  };

  // State for delivery details
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (deliveryDetails.name && deliveryDetails.address && deliveryDetails.phone) {
      alert(`Order placed successfully!\nDetails: ${JSON.stringify({ ...deliveryDetails, cart }, null, 2)}`);
      navigate('/'); // Redirect to home page after success
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-800 text-white font-poppins p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-500 text-center">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-gray-300 text-center text-lg">Your cart is empty. Add items to proceed.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Cart Items Section */}
          <div className="bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/95 p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-orange-400/50 transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-orange-400/50"
                    />
                  )}
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      ₹{convertPrice(item.price).toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-gray-800 font-medium mt-1">
                      Subtotal: ₹{(convertPrice(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">Qty: {item.quantity}</p>
              </motion.div>
            ))}
            <div className="text-right mt-6">
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                Total: ₹
                {cart
                  .reduce((total, item) => total + convertPrice(item.price) * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>

          {/* Delivery Details Section */}
          <div className="bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Delivery Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm md:text-base font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={deliveryDetails.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700 text-sm md:text-base font-medium mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-black text-sm md:text-base font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full mt-6 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-all shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Place your order"
              >
                Place Order
              </motion.button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default Checkout;