import React, { useState } from "react";
import { motion } from "framer-motion";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate(); 
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: sidebarOpen ? 0 : -250, opacity: sidebarOpen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed md:relative bg-gradient-to-b from-[#5A7995] to-[#30527A] text-white p-6 shadow-2xl 
      w-64 md:w-80 h-screen md:h-auto top-0 left-0 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:block rounded-r-2xl`}
    >
      <div className="flex items-center justify-between">
        <motion.img
          src={logo}
          alt="Campus Cravings"
          className="w-16 mx-auto mb-4 rounded-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl md:hidden">
          <IoClose />
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-center font-poppins">Complete Your Registration</h2>

      <nav className="space-y-4">
        {["📜 Restaurant Information", "📅 Menu and Operational Detail", "📂 Restaurant Documents"].map(
          (item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center gap-3 p-4 hover:bg-[#3B5D82]/80 rounded-xl cursor-pointer transition shadow-md backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl">{item.split(" ")[0]}</span>
              <span className="text-sm font-poppins">{item.split(" ").slice(1).join(" ")}</span>
            </motion.div>
          )
        )}
      </nav>
    </motion.aside>
  );
};

const RestaurantDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    navigate("/menudet");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#F5F5F0] text-gray-900 flex flex-col font-poppins"
    >
      {/* Background Pattern */}
      <div className="pattern-bg" />

      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img src={watermark} alt="Watermark" className="w-3/4" />
      </div>

      {/* Menu Toggle Button */}
      <motion.button
        className="absolute top-4 left-4 z-20 bg-[#30527A] text-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMenu size={24} />
      </motion.button>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 p-6 md:p-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#002147] mb-6 md:mb-10 font-poppins"
          >
            Restaurant Information
          </motion.h1>

          <div className="space-y-8 md:space-y-12 max-w-3xl mx-auto">
            {/* Restaurant Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20"
            >
              <h2 className="text-lg md:text-xl font-semibold text-[#002147] font-poppins">Restaurant Name</h2>
              <p className="text-sm text-gray-600 mt-1">Customers will see this name on Campus Cravings</p>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Restaurant name*"
                className="w-full mt-4 p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6200] transition"
              />
            </motion.div>

            {/* Owner Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20"
            >
              <h2 className="text-lg md:text-xl font-semibold text-[#002147] font-poppins">Owner Details</h2>
              <p className="text-sm text-gray-600 mt-1 mb-6">Campus Cravings will use these details for all business communications and updates.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Full name*"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6200] transition"
                />
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  placeholder="Email address*"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6200] transition"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm text-[#002147] font-poppins">Phone number</label>
                <div className="flex gap-2 mt-2">
                  <span className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-poppins">+91</span>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6200] transition"
                  />
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-end"
            >
              <motion.button
                className="w-full md:w-auto px-8 py-3 bg-[#002147] text-white font-semibold rounded-lg shadow-lg hover:bg-[#001530] transition"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 33, 71, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
              >
                Next
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantDetails;
