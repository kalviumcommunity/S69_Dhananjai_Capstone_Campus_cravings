import React from "react";
import { motion } from "framer-motion";
import user from "../assets/user.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
const RegisterDelivery = () => {

  const navigate = useNavigate(); // ✅ Initialize navigate
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex flex-col items-center py-10 relative">
      
      {/* Logo in Top Left */}
      <motion.img
        src={logo}
        alt="Campus Cravings"
        className="absolute top-6 left-6 w-16 h-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Title */}
      <motion.h1
        className="text-white text-5xl font-bold mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Campus Craving
      </motion.h1>

      {/* Registration Form */}
      <motion.div
        className="mt-10 bg-gradient-to-b from-[#F5F5DC] to-[#D3BFA7] text-white p-8 rounded-2xl shadow-xl w-96"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">
          Become a delivery partner
        </h2>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" className="p-3 rounded-md text-black " />
          <input type="email" placeholder="Email" className="p-3 rounded-md text-black" />
          <input type="tel" placeholder="Phone" className="p-3 rounded-md text-black" />
          <input type="text" placeholder="Student ID" className="p-3 rounded-md text-black" />
          <input type="text" placeholder="Mode of Transport" className="p-3 rounded-md text-black" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-sm">
              I agree with the terms and conditions
            </label>
          </div>
          <motion.button
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashdel")}
          >
            Register now
          </motion.button>
        </form>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="mt-20 w-4/5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2 className="text-center text-white text-2xl font-semibold border-b-2 pb-2">
          What our partners say
        </h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-10">
          {[
            {
              name: "Dhanush",
              rating: "⭐️⭐️⭐️⭐️⭐️ (5/5)",
              feedback:
                "Great way to earn as a student! Flexible, easy to use, and super convenient. Highly recommend!",
              author: "Alex R., Campus Cravings Delivery Partner",
            },
            {
              name: "Manoj",
              rating: "⭐️⭐️⭐️⭐️⭐️",
              feedback: "Easy, flexible, and worth it!",
              author: "Jamie L.",
            },
            {
              name: "Preetham",
              rating: "⭐️⭐️⭐️⭐️⭐️",
              feedback:
                "Great experience! The flexibility and extra cash make it perfect for students.",
              author: "Alex M.",
            },
          ].map((partner, index) => (
            <motion.div
              key={index}
              className="bg-gray-300 text-black p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={user}
                alt="Avatar"
                className="mx-auto w-20 h-20 mb-3"
              />
              <h3 className="text-xl font-bold">{partner.name}</h3>
              <p className="text-yellow-500 text-lg">{partner.rating}</p>
              <p className="mt-2 text-sm">"{partner.feedback}"</p>
              <p className="mt-1 text-xs text-gray-600">{partner.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterDelivery;