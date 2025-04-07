import React from "react";
import { useNavigate } from "react-router-dom";
import customerBaseImg from "../assets/customer-base.png";
import deliveryImg from "../assets/deliveryImg.png";
import orderManagementImg from "../assets/orderManagementImg.png";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png"; // optional if available

const AddRestaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F5F5F0] text-gray-900">
      {/* Watermark */}
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10 z-0"
        style={{ backgroundImage: `url(${watermark})` }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-4 bg-white/30 backdrop-blur-lg text-[#002147] shadow-md">
        <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="Campus Cravings" className="w-10 h-10" />
          Campus Cravings
        </div>
        <button className="px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-12 md:py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002147] mb-6 drop-shadow-lg">
          Partner with Campus Cravings
        </h1>
        <button 
  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
  onClick={() => {
    console.log("Navigating to /restodet..."); // Debugging log
    navigate("/restodet");
  }}
>
  Register your restaurant
</button>
      </div>

      {/* Required Documents Section */}
      <div className="relative z-10 max-w-2xl mx-auto bg-white/30 backdrop-blur-md text-[#002147] p-6 rounded-xl shadow-xl border border-white/20 mb-10 mx-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Get Started - It only takes 10 minutes
        </h2>
        <p className="text-sm opacity-80 mb-4">
          Please keep these documents ready for a smooth sign-up:
        </p>
        <ul className="space-y-2 text-base font-medium">
          <li>✅ PAN card</li>
          <li>
            ✅ FSSAI <strong>license</strong>
          </li>
          <li>✅ Bank account details</li>
          <li>✅ GST number (if applicable)</li>
          <li>✅ Menu & profile food image</li>
        </ul>
      </div>

      {/* Why Partner with Us Section with Images */}
      <div className="relative z-10 max-w-6xl mx-auto text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Why you should partner with us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative p-6 rounded-2xl shadow-lg bg-white/30 backdrop-blur-md text-[#002147] border border-white/20 hover:scale-105 transition-transform">
            <img
              src={customerBaseImg}
              alt="Customer Base"
              className="w-full h-32 md:h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg md:text-xl font-semibold mt-4">
              🔓 Unlock a New Customer Base
            </h3>
            <p className="text-gray-800 text-sm mt-2">
              High-demand audience—students need quick and affordable meals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative p-6 rounded-2xl shadow-lg bg-white/30 backdrop-blur-md text-[#002147] border border-white/20 hover:scale-105 transition-transform">
            <img
              src={deliveryImg}
              alt="Hassle-Free Delivery"
              className="w-full h-32 md:h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg md:text-xl font-semibold mt-4">
              🚚 Hassle-Free Delivery
            </h3>
            <p className="text-gray-800 text-sm mt-2">
              Orders fulfilled by nearby student couriers for faster service.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative p-6 rounded-2xl shadow-lg bg-white/30 backdrop-blur-md text-[#002147] border border-white/20 hover:scale-105 transition-transform">
            <img
              src={orderManagementImg}
              alt="Easy Order Management"
              className="w-full h-32 md:h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg md:text-xl font-semibold mt-4">
              📊 Easy-to-Use Order Management
            </h3>
            <p className="text-gray-800 text-sm mt-2">
              Simple dashboard to manage orders and update menus.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "📑 What documents are required?",
              a: "PAN card, FSSAI license, bank account details, menu, and at least one food image.",
            },
            {
              q: "⏳ How long does approval take?",
              a: "Approval typically takes 3–5 business days.",
            },
            {
              q: "💰 What are the commission rates?",
              a: "Commission rates depend on order volume and restaurant size.",
            },
          ].map(({ q, a }, i) => (
            <details
              key={i}
              className="p-5 bg-white/30 backdrop-blur-md text-[#002147] rounded-xl shadow-lg border border-white/20 hover:scale-105 transition-transform"
            >
              <summary className="cursor-pointer font-semibold text-lg">{q}</summary>
              <p className="text-sm mt-2 opacity-90">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#002147] text-white mt-16 p-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">About Us</h3>
            <p className="text-sm opacity-90 mt-2">
              - Who you are
              <br />
              - Your mission to connect students with convenient food options
              <br />
              - Supporting local restaurants and student entrepreneurs
            </p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Social Media</h3>
            <ul className="text-sm mt-2 space-y-2 opacity-90">
              <li>📷 Instagram (@campuscravings)</li>
              <li>🐦 Twitter/X</li>
              <li>📘 Facebook</li>
              <li>🔗 LinkedIn</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AddRestaurant;