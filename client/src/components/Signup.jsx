import React from "react";
import plateSet from '../assets/plate-set.png';
import cup from '../assets/cup.png';
import logo from '../assets/logo.png';
import border from "../assets/decorative-border.png"

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#04173F] to-[#092A5E] relative">
      {/* Left Decorative Image */}
      <img
        src={plateSet}
        alt="Decorative Plate Set"
        className="absolute left-10 bottom-20 w-80 h-80"
      />

      {/* Right Decorative Image */}
      <img
        src={cup}
        alt="Decorative Cup"
        className="absolute right-10 top-20 w-80 h-80"
      />

      {/* Signup Card */}
      <div className="bg-[#0B1C3F] border border-gray-500 rounded-lg shadow-lg p-10 w-96 text-center relative">
        {/* Logo */}
        <img
          src={logo}
          alt="Campus Cravings Logo"
          className="absolute top-3 left-3 w-15 h-15"
        />

        <h2 className="text-4xl font-semibold text-white mb-2">Signup</h2>
        <p className="text-red-400 italic mb-4">~ cravings ~</p>

        {/* Input Fields */}
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Signup Button */}
          <button className="w-full p-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition">
            Signup
          </button>
        </form>

        {/* Decorative Bottom Border */}
        <div className="mt-5 border-t border-gray-500 pt-3 w-[100%]">
          <img src={border} alt="Decorative Border" className="w-[100%] h-20 object-cover"  />
        </div>
      </div>
    </div>
  );
};

export default Signup;