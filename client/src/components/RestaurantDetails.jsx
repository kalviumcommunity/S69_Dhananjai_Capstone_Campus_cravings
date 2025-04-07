import React, { useState } from "react";
import { motion } from "framer-motion";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: sidebarOpen ? 0 : -250, opacity: sidebarOpen ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed md:relative bg-gradient-to-b from-[#5A7995] to-[#30527A] text-white p-6 shadow-xl 
      w-64 md:w-80 h-screen md:h-auto top-0 left-0 z-50 transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:block`}
    >
      <div className="flex items-center justify-between">
        <img src={logo} alt="Campus Cravings" className="w-16 mx-auto mb-4" />
        <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl md:hidden">
          <IoClose />
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-center">Complete your registration</h2>

      <nav className="space-y-6">
        {["📜 Restaurant Information", "📅 Menu and Operational Detail", "📂 Restaurant Documents"].map(
          (item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } }}
              className="flex items-center gap-3 p-4 hover:bg-[#3B5D82] rounded-xl cursor-pointer transition shadow-md"
            >
              <span className="text-xl">{item.split(" ")[0]}</span>
              <span className="text-sm">{item.split(" ").slice(1).join(" ")}</span>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative min-h-screen bg-[#F5F5F0] text-gray-900 flex flex-col">
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img src={watermark} alt="Watermark" className="w-3/4" />
      </div>

      <button className="absolute top-4 left-4 z-20 bg-[#30527A] text-white p-2 rounded-md shadow-md" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FiMenu size={24} />
      </button>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 p-6 md:p-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-center text-[#002147] mb-6 md:mb-10">
            Restaurant Information
          </motion.h1>

          <div className="space-y-6 md:space-y-10">
            {/* Restaurant Name */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-[#4B6A8B] to-[#2E4663] text-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold">Restaurant Name</h2>
              <p className="text-sm opacity-80">Customers will see this name on Campus Cravings</p>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Restaurant name*"
                className="w-full mt-3 p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            {/* Owner Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-[#4B6A8B] to-[#2E4663] text-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold">Owner Details</h2>
              <p className="text-sm opacity-80 mb-4">Campus Cravings shall use these details for all business communications and updates.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Full name*"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  placeholder="Email address*"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm">Phone number</label>
                <div className="flex gap-2">
                  <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">+91</span>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-end">
              <button className="w-full md:w-auto px-6 py-3 bg-[#002147] text-white font-semibold rounded-lg shadow-lg hover:bg-[#001530] transition">
                Next
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantDetails;