import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

// Note: Add Google Fonts and CSS in your index.html or CSS file
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
// CSS for subtle background pattern and footer:
/*
.pattern-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10px 10px, rgba(255, 255, 255, 0.1) 2px, transparent 4px);
  background-size: 20px 20px;
  opacity: 0.05;
}
.footer-pattern {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"><path fill="%230052B0" d="M0,50 L0,100 L1440,100 L1440,50 Q720,0 0,50 Z"/></svg>');
  background-size: cover;
}
*/

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
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

      <h2 className="text-xl font-semibold mb-6 text-center font-poppins">Complete your registration</h2>

      <nav className="space-y-4">
        {["Restaurant Information", "Menu and Operational Detail", "Restaurant Documents"].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition shadow-md backdrop-blur-sm"
          >
            <span className="w-6 h-6 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm font-poppins">{item}</span>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

const MenuOperationalDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [deliveryTimings, setDeliveryTimings] = useState({ open: "9:00 AM", close: "9:00 PM", days: [] });
  const [menuImages, setMenuImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleCuisineSelect = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else if (selectedCuisines.length < 3) {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDaySelect = (day) => {
    if (deliveryTimings.days.includes(day)) {
      setDeliveryTimings((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d !== day),
      }));
    } else {
      setDeliveryTimings((prev) => ({
        ...prev,
        days: [...prev.days, day],
      }));
    }
  };

  const handleImageUpload = (e, setter) => {
    const files = Array.from(e.target.files);
    if (setter === setMenuImages) {
      setMenuImages((prev) => [...prev, ...files].slice(0, 5)); // Limit to 5 images
    } else {
      setter(files[0]);
    }
  };

  const handleNext = () => {
    navigate("/resdoc");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#F5F5F0] text-gray-900 font-poppins flex flex-col"
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
            className="text-2xl md:text-3xl font-bold text-center text-[#002147] mb-6 md:mb-10 font-poppins"
          >
            Menu and other operational details
          </motion.h1>

          <div className="space-y-8 md:space-y-12 max-w-3xl mx-auto">
            {/* Add Menu Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#30527A]/80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 text-white"
            >
              <h2 className="text-lg font-semibold font-poppins">Add menu images</h2>
              <p className="text-sm mt-1">These will be used to create your in-app menu for online ordering</p>
              <label className="flex items-center justify-center w-full h-32 mt-4 bg-white/20 rounded-lg border-2 border-dashed border-white/50 cursor-pointer hover:bg-white/30 transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, setMenuImages)}
                  className="hidden"
                />
                <span className="text-sm font-poppins">jpeg, jpg or png formats up to 5MB</span>
              </label>
              <p className="text-xs mt-2 text-gray-300 cursor-pointer hover:underline">Guidelines to upload menu images</p>
            </motion.div>

            {/* Add Restaurant Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#30527A]/80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 text-white"
            >
              <h2 className="text-lg font-semibold font-poppins">Add restaurant profile image</h2>
              <p className="text-sm mt-1 mb-4">This will be your restaurant profile picture on Campus Cravings so use your best food shot!</p>
              <label className="flex items-center justify-center w-full h-32 bg-white/20 rounded-lg border-2 border-dashed border-white/50 cursor-pointer hover:bg-white/30 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                  className="hidden"
                />
                <span className="text-sm font-poppins">jpeg, jpg or png formats up to 5MB</span>
              </label>
              <div className="flex items-center mt-2">
                <p className="text-xs text-gray-300 cursor-pointer hover:underline mr-4">Guidelines to upload menu images</p>
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <span className="ml-2 text-xs text-gray-300">Example of profile food image!</span>
              </div>
            </motion.div>

            {/* Select up to 3 Cuisines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#30527A]/80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 text-white"
            >
              <h2 className="text-lg font-semibold font-poppins">Select up to 3 cuisines</h2>
              <p className="text-sm mt-1">Your restaurant will appear in searches for these cuisines</p>
              <input
                type="text"
                value={selectedCuisines.join(", ")}
                readOnly
                className="w-full mt-4 p-3 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                placeholder="Search cuisines..."
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {["Fast Food", "Chinese", "Biryani", "South Indian"].map((cuisine) => (
                  <motion.button
                    key={cuisine}
                    onClick={() => handleCuisineSelect(cuisine)}
                    className={`p-3 rounded-lg transition font-poppins ${selectedCuisines.includes(cuisine) ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cuisine}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Restaurant Delivery Timings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-[#30527A]/80 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 text-white"
            >
              <h2 className="text-lg font-semibold font-poppins">Restaurant delivery timings</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-poppins">Open time</label>
                  <input
                    type="time"
                    value={deliveryTimings.open}
                    onChange={(e) => setDeliveryTimings((prev) => ({ ...prev, open: e.target.value }))}
                    className="w-full p-3 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins">Close time</label>
                  <input
                    type="time"
                    value={deliveryTimings.close}
                    onChange={(e) => setDeliveryTimings((prev) => ({ ...prev, close: e.target.value }))}
                    className="w-full p-3 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold font-poppins">Mark open days</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <motion.button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`px-3 py-2 rounded-lg text-sm transition font-poppins ${deliveryTimings.days.includes(day) ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {day}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex justify-end"
            >
              <motion.button
                className="px-8 py-3 bg-[#002147] text-white font-semibold rounded-lg shadow-lg hover:bg-[#001530] transition font-poppins"
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

      {/* Footer Pattern */}
      <div className="footer-pattern" />
    </motion.div>
  );
};

export default MenuOperationalDetails;
