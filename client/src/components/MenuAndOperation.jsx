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
    restaurantImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, restaurantImage: URL.createObjectURL(file) });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative min-h-screen bg-[#F5F5F0] text-gray-900 flex flex-col">
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-[#4B6A8B] to-[#2E4663] text-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold">Restaurant Name</h2>
              <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} placeholder="Restaurant name*" className="w-full mt-3 p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-[#4B6A8B] to-[#2E4663] text-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold">Upload Restaurant Image</h2>
              <input type="file" onChange={handleImageUpload} className="w-full mt-3 p-2 bg-white border border-gray-300 rounded-md" />
              {formData.restaurantImage && <img src={formData.restaurantImage} alt="Preview" className="mt-3 w-full rounded-lg shadow-md" />}
            </motion.div>

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
