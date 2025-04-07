import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/logo.png";
import heroJoin from "../assets/heroJoin.png";
import flexible from "../assets/flexible.png";
import earnMoney from "../assets/earnMoney.png";
import noCommute from "../assets/noCommute.png";

const DeliveryJoin = () => {

  const navigate = useNavigate(); // ✅ Initialize navigate
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What documents are required to start deliveries?",
      answer: [
        "PAN Card (only adult PAN cards accepted)",
        "PSAI license certificate",
        "Bank details (cheque/passbook copy)",
      ],
    },
    {
      question: "How do I get started as a delivery partner?",
      answer: [
        "Sign up through our portal and submit required documents.",
        "Complete onboarding and start accepting deliveries!",
      ],
    },
    {
      question: "Is there a registration fee?",
      answer: ["No, registering as a delivery partner is completely free."],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-500 to-gray-200 min-h-screen pb-10 font-sans">
      {/* Header with Logo */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-lg">
        <img src={logo} alt="Campus Cravings Logo" className="h-16" />
        <motion.h1 
          className="text-5xl font-extrabold text-gray-800 cursor-pointer"
          whileHover={{ scale: 1.1, color: "#ff5733" }}
        >
          Campus Cravings
        </motion.h1>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-6">
        <motion.img 
          src={heroJoin} 
          alt="Campus Cravings" 
          className="w-700 rounded-lg shadow-xl" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
        />

        {/* 🚀 ENHANCED "JOIN NOW" BUTTON 🚀 */}
        <motion.button
          initial={{ opacity: 0.9 }}
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.8)", x: [-2, 2, -2, 2, 0] }}
          onClick={() => navigate("/regisdel")}
          className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-xl text-2xl font-extrabold shadow-lg hover:from-orange-500 hover:to-yellow-400 transition-transform border-4 border-yellow-600 w-80 h-20"
        >
          Join Now
        </motion.button>
      </div>

      {/* Why Deliver With Us Section */}
      <div className="text-center mt-12 px-4">
        <h2 className="text-4xl font-bold text-gray-800">Why Deliver With Us</h2>
        <div className="flex flex-wrap justify-center gap-12 mt-6 ">
          {[earnMoney, flexible, noCommute].map((img, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center max-w-xs p-4 bg-white rounded-xl shadow-lg">
              <img src={img} alt="Icon" className="w-60 mx-auto" />
              <p className="mt-2 text-gray-700 font-medium">{index === 0 ? "Earn extra money anytime" : index === 1 ? "Flexible for students" : "No commute, just campus"}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 px-6">
        <h2 className="text-center text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <motion.div className="bg-white p-8 rounded-2xl shadow-2xl mt-8 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 last:border-none overflow-hidden">
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-4 px-6 flex justify-between items-center text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-all rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                {faq.question}
                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </motion.button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="px-6 pb-4 text-gray-600"
              >
                <ul className="list-disc pl-6 space-y-2">
                  {faq.answer.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-blue-700 text-white text-center py-6 mt-12">
        <h3 className="text-lg font-bold">Stay Connected</h3>
        <div className="flex justify-center space-x-4 mt-2">
          {["Facebook", "Twitter", "Instagram", "TikTok"].map((platform, index) => (
            <motion.a key={index} href="#" className="hover:underline" whileHover={{ scale: 1.1 }}>
              {platform}
            </motion.a>
          ))}
        </div>
        <p className="mt-4 text-sm max-w-md mx-auto">
          Campus Cravings is a student-run platform for food & stationery delivery on campus.
        </p>
      </div>
    </div>
  );
};

export default DeliveryJoin;