import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiSun, FiMoon, FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";

// Simple translations
const translations = {
  en: {
    restaurant_docs: "Restaurant Documents",
    pan_details: "PAN details",
    pan_desc: "This will be used to create your in-app menu for online ordering",
    pan_number: "PAN number *",
    full_name: "Full name as per PAN *",
    address: "Full address of your registered business *",
    upload_pan: "Upload your PAN",
    pan_guidelines: "Guidelines to upload PAN",
    pan_guidelines_desc: "jpg, png or pdf formats up-to 5MB",
    fssai_details: "FSSAI details",
    fssai_desc: "FSSAI registration comply with regulations on food safety",
    fssai_requirements: "FSSAI requirements",
    fssai_name_match: "The name on the FSSAI certificate should match either the restaurant's name or the name on the PAN card.",
    fssai_address_match: "The address on the FSSAI certificate should match the restaurant's address.",
    fssai_number: "FSSAI number *",
    expiry_date: "Expiry date *",
    upload_fssai: "Upload FSSAI license",
    fssai_guidelines: "FSSAI guidelines to upload",
    fssai_guidelines_desc: "jpg, png or pdf formats up-to 5MB",
    bank_details: "Bank account details",
    bank_desc: "Bank account usage charge deposit your earnings",
    bank_account_number: "Bank account number *",
    re_enter_bank_account: "Re-enter Bank account number *",
    ifsc_code: "Enter IFSC code",
    account_type: "Account type",
    verify_bank: "verify bank account details",
    done: "Done",
    complete_registration: "Complete your registration",
    restaurant_info: "Restaurant Information",
    menu_operations: "Menu and Operational detail",
    restaurant_documents: "Restaurant Documents",
  },
  hi: {
    restaurant_docs: "रेस्तरां दस्तावेज़",
    pan_details: "पैन विवरण",
    pan_desc: "इसका उपयोग ऑनलाइन ऑर्डरिंग के लिए आपके ऐप में मेनू बनाने के लिए किया जाएगा",
    pan_number: "पैन नंबर *",
    full_name: "पैन के अनुसार पूरा नाम *",
    address: "आपके पंजीकृत व्यवसाय का पूरा पता *",
    upload_pan: "अपना पैन अपलोड करें",
    pan_guidelines: "पैन अपलोड करने के दिशानिर्देश",
    pan_guidelines_desc: "jpg, png या pdf प्रारूप, 5MB तक",
    fssai_details: "FSSAI विवरण",
    fssai_desc: "FSSAI पंजीकरण खाद्य सुरक्षा पर नियमों का अनुपालन करता है",
    fssai_requirements: "FSSAI आवश्यकताएँ",
    fssai_name_match: "FSSAI प्रमाणपत्र पर नाम रेस्तरां के नाम या पैन कार्ड पर नाम से मेल खाना चाहिए।",
    fssai_address_match: "FSSAI प्रमाणपत्र पर पता रेस्तरां के पते से मेल खाना चाहिए।",
    fssai_number: "FSSAI नंबर *",
    expiry_date: "समाप्ति तिथि *",
    upload_fssai: "FSSAI लाइसेंस अपलोड करें",
    fssai_guidelines: "FSSAI अपलोड करने के दिशानिर्देश",
    fssai_guidelines_desc: "jpg, png या pdf प्रारूप, 5MB तक",
    bank_details: "बैंक खाता विवरण",
    bank_desc: "बैंक खाता उपयोग शुल्क जमा करने के लिए आपके आय",
    bank_account_number: "बैंक खाता नंबर *",
    re_enter_bank_account: "बैंक खाता नंबर पुनः दर्ज करें *",
    ifsc_code: "IFSC कोड दर्ज करें",
    account_type: "खाता प्रकार",
    verify_bank: "बैंक खाता विवरण सत्यापित करें",
    done: "हो गया",
    complete_registration: "अपना पंजीकरण पूरा करें",
    restaurant_info: "रेस्तरां जानकारी",
    menu_operations: "मेनू और परिचालन विवरण",
    restaurant_documents: "रेस्तरां दस्तावेज़",
  },
};

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen, setSection, t }) => {
  const sections = ["Restaurant Information", "Menu and Operational detail", "Restaurant Documents"];
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: sidebarOpen ? 0 : -250, opacity: sidebarOpen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed md:relative bg-gradient-to-b from-[#1E3A8A] to-[#4B5EAA] text-white p-6 shadow-2xl w-64 md:w-80 h-screen md:h-auto top-0 left-0 z-50 rounded-r-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <motion.img src={logo} alt="Campus Cravings" className="w-16 mb-4 rounded-lg" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} />
        <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl md:hidden">
          <IoClose />
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-6 text-center font-poppins text-neon-blue-500">{t("restaurant_docs")}</h2>
      <nav className="space-y-4">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition shadow-lg bg-white/10 hover:bg-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "#4B5EAA" }}
            onClick={() => setSection(item)}
          >
            <span className="w-6 h-6 rounded-full bg-green-400 mr-2"></span>
            <span className="text-sm font-poppins text-neon-green-500">{t(item.toLowerCase().replace(/ /g, "_"))}</span>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

const RestaurantsDocuments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState("Restaurant Documents");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({
    panNumber: "",
    fullName: "",
    address: "",
    panFile: null,
    fssaiNumber: "",
    fssaiExpiry: "",
    fssaiFile: null,
    bankAccountNumber: "",
    reBankAccountNumber: "",
    ifscCode: "",
    accountType: "",
  });

  const navigate = useNavigate(); // Hook for navigation
  const t = (key) => translations[language][key] || key;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = () => {
    // No validation, direct navigation to /resdash
    navigate("/resdash"); // Navigate to /resdash route
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-screen ${
        theme === "dark" ? "bg-gradient-to-br from-[#1E3A8A] via-[#2A5298] to-[#4B5EAA] text-gray-100" : "bg-gray-100 text-gray-900"
      } font-poppins flex flex-col overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="pattern-bg" />

      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
        <img src={watermark} alt="Watermark" className="w-3/4 blur-sm" />
      </div>

      {/* Menu Toggle Button */}
      <motion.button
        className="absolute top-4 left-4 z-20 bg-[#4B5EAA] text-white p-2 rounded-full shadow-lg border-2 border-neon-blue-500"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px #00FFCC" }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMenu size={24} />
      </motion.button>

      {/* Theme and Language Toggle */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.button
          className="bg-[#4B5EAA] text-white p-2 rounded-full shadow-lg"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#4B5EAA] text-white p-2 rounded-lg"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setSection={setSection} t={t} />

        <div className="flex-1 p-6 md:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-poppins neon-text"
          >
            {t("restaurant_docs")}
          </motion.h1>

          {section === "Restaurant Documents" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* PAN Details */}
              <div className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
                <h2 className="text-lg font-semibold font-poppins text-neon-green-500">{t("pan_details")}</h2>
                <p className="text-sm mt-1 text-gray-300">{t("pan_desc")}</p>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="panNumber"
                    placeholder={t("pan_number")}
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder={t("full_name")}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder={t("address")}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <div className="flex items-center justify-between bg-[#4B5EAA]/40 p-4 rounded-xl">
                    <div>
                      <p className="font-semibold text-neon-blue-500">{t("upload_pan")}</p>
                      <p className="text-sm text-gray-300">{t("pan_guidelines_desc")}</p>
                    </div>
                    <label className="cursor-pointer">
                      <FiUpload size={24} className="text-white" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "panFile")} accept=".jpg,.png,.pdf" />
                    </label>
                  </div>
                  <a href="#" className="text-neon-blue-500 text-sm">{t("pan_guidelines")}</a>
                </div>
              </div>

              {/* FSSAI Details */}
              <div className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
                <h2 className="text-lg font-semibold font-poppins text-neon-green-500">{t("fssai_details")}</h2>
                <p className="text-sm mt-1 text-gray-300">{t("fssai_desc")}</p>
                <div className="mt-4 bg-green-500/20 p-4 rounded-xl">
                  <p className="font-semibold">{t("fssai_requirements")}</p>
                  <ul className="list-disc list-inside text-sm mt-2">
                    <li>{t("fssai_name_match")}</li>
                    <li>{t("fssai_address_match")}</li>
                  </ul>
                </div>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="fssaiNumber"
                    placeholder={t("fssai_number")}
                    value={formData.fssaiNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <input
                    type="date"
                    name="fssaiExpiry"
                    placeholder={t("expiry_date")}
                    value={formData.fssaiExpiry}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <div className="flex items-center justify-between bg-[#4B5EAA]/40 p-4 rounded-xl">
                    <div>
                      <p className="font-semibold text-neon-blue-500">{t("upload_fssai")}</p>
                      <p className="text-sm text-gray-300">{t("fssai_guidelines_desc")}</p>
                    </div>
                    <label className="cursor-pointer">
                      <FiUpload size={24} className="text-white" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "fssaiFile")} accept=".jpg,.png,.pdf" />
                    </label>
                  </div>
                  <a href="#" className="text-neon-blue-500 text-sm">{t("fssai_guidelines")}</a>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
                <h2 className="text-lg font-semibold font-poppins text-neon-green-500">{t("bank_details")}</h2>
                <p className="text-sm mt-1 text-gray-300">{t("bank_desc")}</p>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="bankAccountNumber"
                    placeholder={t("bank_account_number")}
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    name="reBankAccountNumber"
                    placeholder={t("re_enter_bank_account")}
                    value={formData.reBankAccountNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder={t("ifsc_code")}
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  />
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white/20 text-white border border-white/50 rounded-lg focus:outline-none"
                  >
                    <option value="" disabled>{t("account_type")}</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                  <motion.button
                    className="w-full p-2 bg-green-500 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("verify_bank")}
                  </motion.button>
                </div>
              </div>

              {/* Done Button */}
              <motion.button
  className="w-full p-3 bg-gradient-to-r from-neon-blue-500 to-blue-600 text-white rounded-xl mt-4 shadow-lg hover:shadow-xl hover:bg-gradient-to-l from-neon-blue-500 to-blue-700 transition-all duration-300 ease-in-out"
  onClick={handleSubmit}
  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)" }}
  whileTap={{ scale: 0.95 }}
>
  {t("done")}
</motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Pattern */}
      <div className="footer-pattern" />
    </motion.div>
  );
};

export default RestaurantsDocuments;