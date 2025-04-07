import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import user from '../assets/user.png';
import logo from '../assets/logo.png';
import deliveryIcon from "../assets/delivery-icon.png";
import foodIcon from '../assets/food-icon.png';
import step1 from "../assets/step-1.png";
import step2 from "../assets/step-2.png";
import step3 from "../assets/step-3.png";
import restaurantIcon from "../assets/restaurant-icon.png";
import logoBackground from "../assets/logo-background.png";
import watermark from "../assets/watermark.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: ["0%", "-100%"] });
  }, [controls]);

  return (
    <div className="relative w-full bg-[#1E1E1E] text-white min-h-screen flex flex-col bg-gradient-to-b from-[#00224A] to-[#0052B0]">
      
      {/* Hero Section */}
      <img src={watermark} className="w-full absolute inset-0 opacity-5" alt="Background Watermark"/>
      <div className="w-full text-center py-10 relative z-10">
        <img src={logo} alt="Campus Cravings" className="mx-auto md:w-20 md:h-20  h-10 rounded-sm hover:scale-110 transition-transform duration-300 ml-8" />
        <h1 className="text-[80px] font-bold mt-8 tracking-wider hover:text-red-400 transition-colors duration-300">Campus Cravings</h1>
        <img src={logoBackground} className="w-full object-contain h-full" alt="Logo Background"/>
        
        {/* Login Button with Navigation */}
        <button
          onClick={() => navigate("/login")} // ✅ Directs to login page
          className="absolute md:top-8 top-10 md:right-8 right-2 md:bg-red-600 bg-red-600 md:px-5 md:py-2  rounded-md md:shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300 w-30 md:h-10 h-8 md:text-xl text-sm"
        >
          Login
        </button>

        {/* Order Now Button */}
        <button className="bg-red-600 px-6 py-3 mt-6 rounded-full text-2xl shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300 w-45 h-20">
          Order Now
        </button>
      </div>

  {/* Feature Section */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-20 text-center py-12 mx-auto w-4/5">
  {[
    { img: foodIcon, text: "Food and Stationery", link: "/food" },
    { img: restaurantIcon, text: "Add Restaurant",link: "/addres" }, 
    { img: deliveryIcon, text: "Deliver with us", link: "/joindel" }
  ].map((feature, index) => (
    <motion.div 
      key={index}
      className="relative bg-gray-800 p-10 rounded-2xl bg-gradient-to-b from-[#B41414] to-[#4E0909] shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }} // Start hidden & move up
      animate={{ opacity: 1, y: 0 }} // Fade in & slide up
      transition={{ duration: 0.6, delay: index * 0.2 }} // Delayed effect
      whileHover={{ scale: 1.1, rotate: 2 }} // Hover effect
      onClick={() => navigate(feature.link)}
    >
      <div className="absolute inset-0 bg-white opacity-10 rounded-2xl blur-2xl"></div>
      <motion.img 
      
      
        src={feature.img} 
        alt="Feature"
        className="mx-auto w-52 md:w-56 lg:w-60"
        whileHover={{ scale: 1.2, rotate: -3 }} // Bounce effect on hover
        transition={{ type: "spring", stiffness: 300 }}
      />
      <p className="text-xl font-bold mt-6 text-white tracking-wide">{feature.text}</p>
    </motion.div>
  ))}
</div>
{/* How It Works Section */}
<h2 className="text-5xl font-extrabold text-center py-8 tracking-wide text-white">HOW IT WORKS</h2>

<motion.div 
  className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-6 mx-auto w-4/5"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
  }}
>
  {[step1, step2, step3].map((step, index) => (
    <motion.div 
      key={index} 
      className="relative bg-red-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-lg transition-all duration-300"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
      }}
      whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)" }}
    >
      <div className="absolute inset-0 bg-white opacity-5 rounded-2xl blur-xl"></div>
      
      <motion.img 
        src={step} 
        alt={`Step ${index + 1}`} 
        className="mx-auto w-60 rounded-full border-4 border-blue-500 shadow-2xl"
        whileHover={{ scale: 1.15, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      
      <p className="text-2xl font-bold text-white mt-6 tracking-wider">Step {index + 1}</p>
    </motion.div>
  ))}
</motion.div>

      {/* Review Section */}
      <section className="py-8 px-4 overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-6">What Students Say</h2>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex space-x-6 w-max"
            animate={controls}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {[...[
              { text: "Campus Cravings makes student life easier! Fast, convenient, and built for students!" },
              { text: "Super easy to use! I love how students help each other out." },
              { text: "Great service! I saved so much time between classes." },
              { text: "Highly recommended! Perfect for students who need quick service." },
              { text: "Love this app! It’s a game-changer for campus deliveries." }
            ], ...[
              { text: "Campus Cravings makes student life easier! Fast, convenient, and built for students!" },
              { text: "Super easy to use! I love how students help each other out." },
              { text: "Great service! I saved so much time between classes." },
              { text: "Highly recommended! Perfect for students who need quick service." },
              { text: "Love this app! It’s a game-changer for campus deliveries." }
            ]].map((review, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg flex items-center space-x-4 min-w-[300px] transition-all duration-300 hover:scale-110 hover:bg-yellow-500"
                onMouseEnter={() => controls.stop()}
                onMouseLeave={() => controls.start({ x: ["0%", "-100%"] })}
              >
                <img src={user} alt="User" className="w-16 h-16 rounded-full border-2 border-yellow-400 transition-transform duration-300 hover:rotate-3"/>
                <div>
                  <p className="text-sm italic text-gray-300 hover:text-black">{`“${review.text}”`}</p>
                  <div className=" mt-2 hover:text-black">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
          <div className="flex space-x-6 py-4">
            {[
              { icon: "fab fa-facebook", link: "#" },
              { icon: "fab fa-twitter", link: "#" },
              { icon: "fab fa-instagram", link: "#" },
              { icon: "fab fa-tiktok", link: "#" }
            ].map((social, index) => (
              <a key={index} href={social.link} className="hover:text-blue-500 hover:scale-110 transition-all duration-300 text-xl">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500">© 2025 Campus Cravings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;