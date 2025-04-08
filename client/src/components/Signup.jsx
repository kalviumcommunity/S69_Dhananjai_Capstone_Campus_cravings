import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ NEW
import plateSet from "../assets/plate-set.png";
import cup from "../assets/cup.png";
import logo from "../assets/logo.png";
import border from "../assets/decorative-border.png";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const isSignupSuccessful = true;
    if (isSignupSuccessful) {
      navigate("/");
    } else {
      alert("Signup failed! Try again.");
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    // You can send `credentialResponse.credential` (JWT) to your backend
    // Redirect after Google login
  };

  const handleGoogleError = () => {
    alert("Google Signup Failed. Try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#04173F] to-[#092A5E] relative">
      <img src={plateSet} alt="Decorative Plate Set" className="absolute left-10 bottom-20 w-80 h-80" />
      <img src={cup} alt="Decorative Cup" className="absolute right-10 top-20 w-80 h-80" />

      <div className="bg-[#0B1C3F] border border-gray-500 rounded-lg shadow-lg p-10 w-96 text-center relative">
        <img src={logo} alt="Campus Cravings Logo" className="absolute top-3 left-3 w-15 h-15" />

        <h2 className="text-4xl font-semibold text-white mb-2">Signup</h2>
        <p className="text-red-400 italic mb-4">~ cravings ~</p>

        {/* Manual Signup */}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Password" className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Confirm Password" className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="text" placeholder="Name" className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <button type="submit" className="w-full p-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition">
            Signup
          </button>
        </form>

        {/* 🔥 Google Signup Button */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className="mt-5 border-t border-gray-500 pt-3 w-[100%]">
          <img src={border} alt="Decorative Border" className="w-[100%] h-20 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Signup;