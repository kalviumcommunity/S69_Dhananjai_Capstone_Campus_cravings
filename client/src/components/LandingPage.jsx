import React from "react";
// import "tailwindcss/tailwind.css";
import user from '../assets/user.png';
import logo from '../assets/logo.png';
import deliveryIcon from "../assets/delivery-icon.png"
import foodIcon from '../assets/food-icon.png';
import step1 from "../assets/step-1.png"
import step2 from "../assets/step-2.png"
import step3 from "../assets/step-3.png"
import restaurantIcon from "../assets/restaurant-icon.png"
import logoBackground from "../assets/logo-background.png"
import watermark from "../assets/watermark.png"





const Home = () => {
  return (
    <div className="relative  w-full bg-[#1E1E1E] text-white min-h-screen flex flex-col  bg-gradient-to-b from-[#00224A] to-[#0052B0] fixed">
      {/* Hero Section */}
      <img src={watermark} className="w-full z-1 absolute inset-0 opacity-[5%]"/>
      <div className="w-full  text-center py-10 z-10 items-center">
        <img src={logo} alt="Campus Cravings" className="mx-10 w-20 h-20" />
        <h1 className="text-[110px] font-bold mt-4">Campus Craving</h1>
        <img src={logoBackground} className="w-full object-contain h-full"/>
        <button className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded bg-gradient-to-b from-[#4E0909] to-[#B41414] w-30 h-12 text-semibold text-xl">Login</button>
        <button className="bg-red-600 px-6 py-3 -mt-10 rounded-3xl bg-gradient-to-b from-[#4E0909] to-[#B41414] w-60 h-25 text-semibold text-2xl z-15">Order Now</button>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-3 gap-10 text-center py-6 z-10 place-content-between  mx-15">
        <div className="bg-gray-800 p-4 rounded-lg bg-gradient-to-b from-[#B41414] to-[#4E0909] h-80 w-70 text-center">
          <img src={foodIcon} alt="Food" className="mx-auto w-16 " />
          <p>Food and Stationery</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg bg-gradient-to-b from-[#B41414] to-[#4E0909]">
          <img src={restaurantIcon} alt="Restaurant" className="mx-auto w-16 " />
          <p>Add Restaurant</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg bg-gradient-to-b from-[#B41414] to-[#4E0909]">
          <img src={deliveryIcon} alt="Delivery" className="mx-auto w-16 " />
          <p>Deliver with us</p>
        </div>
      </div>

      {/* How It Works Section */}
      <h2 className="text-2xl font-bold py-4 z-10">HOW IT WORKS</h2>
      <div className="grid grid-cols-3 gap-4 text-center py-4 z-10 ">
        <div>
          <img src={step1} alt="Step 1" className="mx-auto w-24" />
          <p>Step 1</p>
        </div>
        <div>
          <img src={step2} alt="Step 2" className="mx-auto w-24" />
          <p>Step 2</p>
        </div>
        <div>
          <img src={step3} alt="Step 3" className="mx-auto w-24" />
          <p>Step 3</p>
        </div>
      </div>

      {/* Review Section */}
      <h2 className="text-2xl font-bold py-4 z-10">REVIEW SECTION</h2>
      <div className="bg-gray-900 p-6 rounded-lg w-3/4 flex items-center z-10 ">
        <img src={user} alt="User" className="w-16 h-16 rounded-full" />
        <div className="ml-4 z-10 flex items-center">
          <p className="text-sm italic">“Campus Cravings makes student life easier! Fast, convenient, and built for students!”</p>
          <p className="text-yellow-400 mt-2">⭐⭐⭐⭐⭐</p>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-gray-400 z-10">
        <p>Stay Connected</p>
        <div className="flex justify-center gap-4 py-2">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
        <p className="text-xs">© 2025 Campus Cravings. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
