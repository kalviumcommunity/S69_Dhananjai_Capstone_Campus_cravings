import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaChartBar, FaMoneyBillWave, FaSmile } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// Mock data
const initialEarnings = [1000, 1500, 1200, 1800, 1600, 2000, 2200];
const mockReviews = [
  { id: 1, customer: "John Doe", rating: 4, comment: "Great taste!", date: "2025-04-24" },
  { id: 2, customer: "Jane Smith", rating: 5, comment: "Excellent service!", date: "2025-04-23" },
];
const mockOrders = [
  { id: 1, item: "Chicken Biryani", customer: "John Doe", status: "Pending", time: "2025-04-25 10:00 PM", price: 200, createdAt: "2025-04-25T22:00:00Z", category: "Main Course" },
  { id: 2, item: "Paneer Tikka", customer: "Jane Smith", status: "Preparing", time: "2025-04-25 10:15 PM", price: 180, createdAt: "2025-04-25T22:15:00Z", category: "Starter" },
  { id: 3, item: "Veg Fried Rice", customer: "Alice Brown", status: "Delivered", time: "2025-04-25 09:45 PM", price: 150, createdAt: "2025-04-25T21:45:00Z", category: "Main Course" },
  { id: 4, item: "Butter Chicken", customer: "Bob Wilson", status: "Pending", time: "2025-04-25 09:30 PM", price: 220, createdAt: "2025-04-25T21:30:00Z", category: "Main Course" },
  { id: 5, item: "Masala Dosa", customer: "Emma Davis", status: "Preparing", time: "2025-04-25 09:20 PM", price: 120, createdAt: "2025-04-25T21:20:00Z", category: "South Indian" },
  { id: 6, item: "Prawn Curry", customer: "Liam Johnson", status: "Pending", time: "2025-04-25 09:10 PM", price: 250, createdAt: "2025-04-25T21:10:00Z", category: "Main Course" },
  { id: 7, item: "Veg Manchurian", customer: "Olivia Taylor", status: "Delivered", time: "2025-04-25 09:00 PM", price: 140, createdAt: "2025-04-25T21:00:00Z", category: "Starter" },
  { id: 8, item: "Mutton Rogan Josh", customer: "Noah Martinez", status: "Preparing", time: "2025-04-25 08:50 PM", price: 280, createdAt: "2025-04-25T20:50:00Z", category: "Main Course" },
  { id: 9, item: "Chole Bhature", customer: "Sophia Anderson", status: "Pending", time: "2025-04-25 08:40 PM", price: 160, createdAt: "2025-04-25T20:40:00Z", category: "North Indian" },
  { id: 10, item: "Fish Fry", customer: "James Thomas", status: "Preparing", time: "2025-04-25 08:30 PM", price: 200, createdAt: "2025-04-25T20:30:00Z", category: "Starter" },
];
const mockMenu = [
  { id: 1, name: "Chicken Biryani", price: 200, category: "Main Course" },
  { id: 2, name: "Paneer Tikka", price: 180, category: "Starter" },
  { id: 3, name: "Masala Dosa", price: 120, category: "South Indian" },
];
const mockCustomers = [
  { id: 1, name: "John Doe", orders: [{ item: "Chicken Biryani", date: "2025-04-24", price: 200 }], email: "john@example.com" },
  { id: 2, name: "Jane Smith", orders: [{ item: "Paneer Tikka", date: "2025-04-23", price: 180 }], email: "jane@example.com" },
];
const mockStaff = [
  { id: 1, name: "Alice", role: "Chef", shift: "9AM-5PM" },
  { id: 2, name: "Bob", role: "Waiter", shift: "12PM-8PM" },
];
const mockPromotions = [
  { id: 1, name: "10% Off", discount: 10, expiry: "2025-04-30" },
];
const mockInventory = [
  { id: 1, name: "Rice", quantity: 50, threshold: 10 },
  { id: 2, name: "Chicken", quantity: 8, threshold: 5 },
];
const mockMessages = [
  { id: 1, user: "Customer", text: "Where is my order?", time: "2025-04-25 10:00 PM" },
];

// Simple translations
const translations = {
  en: {
    orders: "Orders",
    analytics: "Analytics",
    reviews: "Reviews",
    menu: "Menu",
    staff: "Staff",
    promotions: "Promotions",
    inventory: "Inventory",
    chat: "Support Chat",
    order_flow: "Order Flow",
    earnings_pulse: "Earnings Pulse",
    customer_feedback: "Customer Feedback",
    export_orders: "Export Orders",
    add_menu_item: "Add Menu Item",
    add_staff: "Add Staff",
    add_promotion: "Add Promotion",
    total_orders: "Total Orders",
    total_revenue: "Total Revenue",
    avg_order_value: "Avg Order Value",
    customer_satisfaction: "Customer Satisfaction",
    recent_orders: "Recent Orders",
    earnings_over_time: "Earnings Over Time",
    order_distribution: "Order Distribution",
    order_id: "Order ID",
    item: "Item",
    customer: "Customer",
    status: "Status",
    time: "Time",
  },
  hi: {
    orders: "आदेश",
    analytics: "विश्लेषण",
    reviews: "समीक्षा",
    menu: "मेनू",
    staff: "कर्मचारी",
    promotions: "प्रचार",
    inventory: "सूची",
    chat: "समर्थन चैट",
    order_flow: "आदेश प्रवाह",
    earnings_pulse: "कमाई पल्स",
    customer_feedback: "ग्राहक प्रतिक्रिया",
    export_orders: "आदेश निर्यात करें",
    add_menu_item: "मेनू आइटम जोड़ें",
    add_staff: "कर्मचारी जोड़ें",
    add_promotion: "प्रचार जोड़ें",
    total_orders: "कुल आदेश",
    total_revenue: "कुल राजस्व",
    avg_order_value: "औसत आदेश मूल्य",
    customer_satisfaction: "ग्राहक संतुष्टि",
    recent_orders: "हाल के आदेश",
    earnings_over_time: "समय के साथ कमाई",
    order_distribution: "आदेश वितरण",
    order_id: "आदेश आईडी",
    item: "आइटम",
    customer: "ग्राहक",
    status: "स्थिति",
    time: "समय",
  },
};

const Sidebar = ({ sidebarOpen, setSidebarOpen, setSection, t, theme }) => {
  const sections = ["Orders", "Analytics", "Reviews", "Menu", "Staff", "Promotions", "Inventory", "Chat"];
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: sidebarOpen ? 0 : -250, opacity: sidebarOpen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed md:relative ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#1E3A8A] to-[#4B5EAA] text-white"
          : "bg-gradient-to-b from-[#DBEAFE] to-[#E6F0FA] text-gray-900"
      } p-6 shadow-2xl w-64 md:w-80 h-screen md:h-auto top-0 left-0 z-50 rounded-r-2xl backdrop-blur-md`}
    >
      <div className="flex items-center justify-between">
        <motion.img
          src={logo}
          alt="Campus Cravings"
          className="w-16 mb-4 rounded-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <button onClick={() => setSidebarOpen(false)} className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-2xl md:hidden`}>
          <IoClose />
        </button>
      </div>
      <h2
        className={`text-xl font-semibold mb-6 text-center font-poppins ${
          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
        }`}
      >
        Restaurant Control Hub
      </h2>
      <nav className="space-y-4">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition shadow-lg ${
              theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-white/50 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.05, backgroundColor: theme === "dark" ? "#4B5EAA" : "#DBEAFE" }}
            onClick={() => setSection(item)}
          >
            <span className="w-6 h-6 rounded-full bg-green-400 mr-2"></span>
            <span
              className={`text-sm font-poppins ${
                theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
              }`}
            >
              {t(item.toLowerCase())}
            </span>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

const RestaurantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState("Orders");
  const [orders, setOrders] = useState(mockOrders.filter(order => order.status !== "Delivered"));
  const [earnings, setEarnings] = useState(initialEarnings);
  const [menuItems, setMenuItems] = useState(mockMenu);
  const [customers] = useState(mockCustomers);
  const [staff, setStaff] = useState(mockStaff);
  const [promotions, setPromotions] = useState(mockPromotions);
  const [inventory, setInventory] = useState(mockInventory);
  const [messages, setMessages] = useState(mockMessages);
  const [chatInput, setChatInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortKey, setSortKey] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showCustomerModal, setShowCustomerModal] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [newMenuItem, setNewMenuItem] = useState({ name: "", price: "", category: "" });
  const [newStaff, setNewStaff] = useState({ name: "", role: "", shift: "" });
  const [newPromotion, setNewPromotion] = useState({ name: "", discount: "", expiry: "" });
  const notificationSound = useRef(new Audio("/notification.mp3"));

  const t = (key) => translations[language][key] || key;

  // Debug Analytics rendering
  useEffect(() => {
    console.log("Current section:", section);
    console.log("Orders:", orders);
    console.log("Earnings:", earnings);
    console.log("MockOrders:", mockOrders);
  }, [section, orders, earnings]);

  // Real-time order notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = {
        id: orders.length + 1,
        item: mockMenu[Math.floor(Math.random() * mockMenu.length)].name,
        customer: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].name,
        status: "Pending",
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        price: Math.floor(Math.random() * 100) + 100,
        createdAt: new Date().toISOString(),
        category: mockMenu[Math.floor(Math.random() * mockMenu.length)].category,
      };
      setOrders(prev => [...prev, newOrder]);
      notificationSound.current.play().catch(() => {});
      const toast = document.createElement("div");
      toast.className = `fixed bottom-4 right-4 ${
        theme === "dark" ? "bg-green-500" : "bg-[#00A3CC]"
      } text-white p-4 rounded-lg shadow-lg`;
      toast.textContent = `New order: ${newOrder.item} from ${newOrder.customer}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 10000);
    return () => clearInterval(interval);
  }, [orders, theme]);

  // Update earnings periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setEarnings(prev => prev.map(value => value + (Math.random() - 0.5) * 200));
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Order status timers
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => [...prev]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getElapsedTime = (createdAt) => {
    const now = new Date();
    const orderDate = new Date(createdAt);
    const minutes = Math.floor((now - orderDate) / 60000);
    return minutes;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    if (newStatus === "Delivered") {
      setOrders(orders.filter(order => order.id !== orderId));
    } else {
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
    }
  };

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };

  const sortedOrders = [...orders]
    .filter(order => filterStatus === "All" || order.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (sortKey === "time") {
        return sortOrder === "asc" ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
      }
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

  const exportOrders = () => {
    const csv = ["Order ID,Item,Customer,Time,Status,Price"]
      .concat(orders.map(order => `${order.id},${order.item},${order.customer},${order.time},${order.status},${order.price}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  const addMenuItem = () => {
    setMenuItems(prev => [...prev, { id: prev.length + 1, ...newMenuItem, price: parseFloat(newMenuItem.price) }]);
    setNewMenuItem({ name: "", price: "", category: "" });
    setShowMenuModal(false);
  };

  const addStaffMember = () => {
    setStaff(prev => [...prev, { id: prev.length + 1, ...newStaff }]);
    setNewStaff({ name: "", role: "", shift: "" });
    setShowStaffModal(false);
  };

  const addPromotion = () => {
    setPromotions(prev => [...prev, { id: prev.length + 1, ...newPromotion, discount: parseFloat(newPromotion.discount) }]);
    setNewPromotion({ name: "", discount: "", expiry: "" });
    setShowPromotionModal(false);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setMessages(prev => [...prev, { id: prev.length + 1, user: "Restaurant", text: chatInput, time: new Date().toISOString().replace("T", " ").slice(0, 19) }]);
      setChatInput("");
    }
  };

  // Analytics data
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;
  const customerSatisfaction = mockReviews.length
    ? ((mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length) / 5 * 100).toFixed(0) + "%"
    : "N/A";

  const earningsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: t("earnings_over_time"),
        data: earnings.length ? earnings : [0, 0, 0, 0, 0, 0, 0],
        borderColor: theme === "dark" ? "#00FFCC" : "#00A3CC",
        backgroundColor: theme === "dark" ? "rgba(0, 255, 204, 0.5)" : "rgba(0, 163, 204, 0.5)",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const orderDistributionData = {
    labels: ["Delivered", "Preparing", "Pending"],
    datasets: [
      {
        label: t("order_distribution"),
        data: [
          mockOrders.filter(o => o.status === "Delivered").length || 0,
          orders.filter(o => o.status === "Preparing").length || 0,
          orders.filter(o => o.status === "Pending").length || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"],
      },
    ],
  };

  const analyticsData = [
    {
      title: t("total_orders"),
      value: totalOrders,
      icon: <FaChartBar className={`text-4xl ${theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"}`} />,
    },
    {
      title: t("total_revenue"),
      value: `₹${totalRevenue}`,
      icon: <FaMoneyBillWave className={`text-4xl ${theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"}`} />,
    },
    {
      title: t("avg_order_value"),
      value: `₹${avgOrderValue}`,
      icon: <FaMoneyBillWave className={`text-4xl ${theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"}`} />,
    },
    {
      title: t("customer_satisfaction"),
      value: customerSatisfaction,
      icon: <FaSmile className={`text-4xl ${theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"}`} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#1E3A8A] via-[#2A5298] to-[#4B5EAA] text-gray-100"
          : "bg-gradient-to-br from-[#E6F0FA] via-[#F0F5FF] to-[#F3F7FF] text-gray-900"
      } font-poppins flex flex-col overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className={`pattern-bg ${theme === "dark" ? "pattern-bg-dark" : "pattern-bg-light"}`} />

      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
        <img src={watermark} alt="Watermark" className="w-3/4 blur-sm" />
      </div>

      {/* Menu Toggle Button */}
      <motion.button
        className={`absolute top-4 left-4 z-20 ${
          theme === "dark" ? "bg-[#4B5EAA] text-white" : "bg-[#00A3CC] text-white"
        } p-2 rounded-full shadow-lg border-2 ${theme === "dark" ? "border-neon-blue-500" : "border-[#E6F0FA]"}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px #00A3CC" }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMenu size={24} />
      </motion.button>

      {/* Theme and Language Toggle */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.button
          className={`${
            theme === "dark" ? "bg-[#4B5EAA] text-white" : "bg-[#00A3CC] text-white"
          } p-2 rounded-full shadow-lg`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={`${
            theme === "dark" ? "bg-[#4B5EAA] text-white" : "bg-[#00A3CC] text-white"
          } p-2 rounded-lg`}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setSection={setSection} t={t} theme={theme} />

        <div className="flex-1 p-6 md:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-poppins ${
              theme === "dark" ? "neon-text" : "text-[#00A3CC]"
            }`}
          >
            Restaurant Control Hub
          </motion.h1>

          {/* Orders Section */}
          {section === "Orders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <h2
                className={`text-lg font-semibold font-poppins ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("order_flow")}
              </h2>
              <div className="flex gap-2 mb-4 mt-4">
                {["All", "Pending", "Preparing"].map(status => (
                  <motion.button
                    key={status}
                    className={`px-4 py-2 rounded-lg ${
                      filterStatus === status
                        ? theme === "dark"
                          ? "bg-neon-green-500"
                          : "bg-[#00A3CC]"
                        : theme === "dark"
                        ? "bg-white/20"
                        : "bg-white/50"
                    } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    onClick={() => setFilterStatus(status)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status}
                  </motion.button>
                ))}
                <motion.button
                  className={`px-4 py-2 ${
                    theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                  } text-white rounded-lg`}
                  onClick={exportOrders}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("export_orders")}
                </motion.button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"} cursor-pointer`}
                        onClick={() => handleSort("id")}
                      >
                        Order ID
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"} cursor-pointer`}
                        onClick={() => handleSort("item")}
                      >
                        Item
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"} cursor-pointer`}
                        onClick={() => handleSort("customer")}
                      >
                        Customer
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"} cursor-pointer`}
                        onClick={() => handleSort("time")}
                      >
                        Time
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Status
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Timer
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOrders.map((order) => {
                      const elapsed = getElapsedTime(order.createdAt);
                      return (
                        <tr
                          key={order.id}
                          className={`border-t ${
                            theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
                          } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"} transition ${
                            elapsed > 30 ? "border-l-4 border-red-500" : ""
                          }`}
                        >
                          <td className="p-2">{order.id}</td>
                          <td className="p-2">{order.item}</td>
                          <td
                            className={`p-2 cursor-pointer ${
                              theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                            }`}
                            onClick={() => setShowCustomerModal(order.customer)}
                          >
                            {order.customer}
                          </td>
                          <td className="p-2">{order.time}</td>
                          <td className="p-2">{order.status}</td>
                          <td className="p-2">{elapsed} min</td>
                          <td className="p-2">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className={`p-1 rounded ${
                                theme === "dark"
                                  ? "bg-white/20 text-white border-white/50"
                                  : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                              } focus:outline-none focus:ring-2 ${
                                theme === "dark" ? "focus:ring-neon-blue-500" : "focus:ring-[#00A3CC]"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Analytics Section */}
          {section === "Analytics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <h2
                className={`text-lg font-semibold font-poppins ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("earnings_pulse")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <motion.div
                  className={`p-6 ${
                    theme === "dark" ? "bg-white/20" : "bg-white/50"
                  } shadow-lg rounded-xl text-center`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {t("total_orders")}
                  </p>
                  <h2
                    className={`text-3xl font-bold ${
                      theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                    }`}
                  >
                    {totalOrders}
                  </h2>
                </motion.div>
                <motion.div
                  className={`p-6 ${
                    theme === "dark" ? "bg-white/20" : "bg-white/50"
                  } shadow-lg rounded-xl text-center`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {t("total_revenue")}
                  </p>
                  <h2 className="text-3xl font-bold text-green-500">₹{totalRevenue}</h2>
                </motion.div>
                <motion.div
                  className={`p-6 ${
                    theme === "dark" ? "bg-white/20" : "bg-white/50"
                  } shadow-lg rounded-xl text-center`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {t("customer_satisfaction")}
                  </p>
                  <h2 className="text-3xl font-bold text-yellow-500">{customerSatisfaction}</h2>
                </motion.div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className={`p-6 ${
                    theme === "dark" ? "bg-white/20" : "bg-white/50"
                  } rounded-xl shadow-lg`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h2
                    className={`text-xl font-semibold ${
                      theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                    } mb-4`}
                  >
                    {t("earnings_over_time")}
                  </h2>
                  <Line data={earningsData} />
                </motion.div>
                <motion.div
                  className={`p-6 ${
                    theme === "dark" ? "bg-white/20" : "bg-white/50"
                  } rounded-xl shadow-lg`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <h2
                    className={`text-xl font-semibold ${
                      theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                    } mb-4`}
                  >
                    {t("order_distribution")}
                  </h2>
                  <Pie data={orderDistributionData} />
                </motion.div>
              </div>

              <motion.div
                className={`mt-8 p-6 ${
                  theme === "dark" ? "bg-white/20" : "bg-white/50"
                } rounded-xl shadow-lg`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h2
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                  } mb-4`}
                >
                  {t("recent_orders")}
                </h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b ${theme === "dark" ? "border-gray-500" : "border-[#DBEAFE]"}`}>
                      <th className={`p-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {t("order_id")}
                      </th>
                      <th className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{t("item")}</th>
                      <th className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{t("customer")}</th>
                      <th className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{t("status")}</th>
                      <th className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{t("time")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.slice(0, 3).map((order) => (
                      <tr
                        key={order.id}
                        className={`border-b ${
                          theme === "dark" ? "border-gray-700" : "border-[#DBEAFE]"
                        } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"}`}
                      >
                        <td className="p-3">#{order.id}</td>
                        <td>{order.item}</td>
                        <td>{order.customer}</td>
                        <td
                          className={`font-semibold ${
                            order.status === "Delivered"
                              ? "text-green-500"
                              : order.status === "Preparing"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td>{getElapsedTime(order.createdAt)} min ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {analyticsData.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 ${
                      theme === "dark" ? "bg-white/20" : "bg-white/50"
                    } shadow-lg rounded-xl flex flex-col items-center`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    {item.icon}
                    <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {item.title}
                    </p>
                    <h2
                      className={`text-2xl font-bold ${
                        theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                      }`}
                    >
                      {item.value}
                    </h2>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews Section */}
          {section === "Reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <h2
                className={`text-lg font-semibold font-poppins ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("customer_feedback")}
              </h2>
              <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
                {mockReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 ${
                      theme === "dark" ? "bg-[#4B5EAA]/40" : "bg-[#DBEAFE]/40"
                    } rounded-xl hover:${
                      theme === "dark" ? "bg-[#4B5EAA]/60" : "bg-[#DBEAFE]/60"
                    } transition`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } cursor-pointer`}
                        onClick={() => setShowCustomerModal(review.customer)}
                      >
                        {review.customer}
                      </span>
                      <span className="text-yellow-400">
                        {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                      {review.comment}
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-1`}>
                      {review.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Menu Section */}
          {section === "Menu" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2
                  className={`text-lg font-semibold font-poppins ${
                    theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                  }`}
                >
                  {t("menu")}
                </h2>
                <motion.button
                  className={`px-4 py-2 ${
                    theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                  } text-white rounded-lg`}
                  onClick={() => setShowMenuModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("add_menu_item")}
                </motion.button>
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Name
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Price
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-t ${
                          theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
                        } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"} transition`}
                      >
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">₹{item.price}</td>
                        <td className="p-2">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Staff Section */}
          {section === "Staff" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2
                  className={`text-lg font-semibold font-poppins ${
                    theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                  }`}
                >
                  {t("staff")}
                </h2>
                <motion.button
                  className={`px-4 py-2 ${
                    theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                  } text-white rounded-lg`}
                  onClick={() => setShowStaffModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("add_staff")}
                </motion.button>
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Name
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Role
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Shift
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr
                        key={member.id}
                        className={`border-t ${
                          theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
                        } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"} transition`}
                      >
                        <td className="p-2">{member.name}</td>
                        <td className="p-2">{member.role}</td>
                        <td className="p-2">{member.shift}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Promotions Section */}
          {section === "Promotions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2
                  className={`text-lg font-semibold font-poppins ${
                    theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                  }`}
                >
                  {t("promotions")}
                </h2>
                <motion.button
                  className={`px-4 py-2 ${
                    theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                  } text-white rounded-lg`}
                  onClick={() => setShowPromotionModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("add_promotion")}
                </motion.button>
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Name
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Discount (%)
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Expiry
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promo) => (
                      <tr
                        key={promo.id}
                        className={`border-t ${
                          theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
                        } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"} transition`}
                      >
                        <td className="p-2">{promo.name}</td>
                        <td className="p-2">{promo.discount}%</td>
                        <td className="p-2">{promo.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Inventory Section */}
          {section === "Inventory" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <h2
                className={`text-lg font-semibold font-poppins ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("inventory")}
              </h2>
              <div className="mt-4 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Name
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Quantity
                      </th>
                      <th
                        className={`p-2 text-left ${
                          theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                        } sticky top-0 ${theme === "dark" ? "bg-[#4B5EAA]/80" : "bg-[#DBEAFE]/80"}`}
                      >
                        Threshold
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-t ${
                          theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
                        } hover:${theme === "dark" ? "bg-white/5" : "bg-white/30"} transition ${
                          item.quantity <= item.threshold ? "border-l-4 border-red-500" : ""
                        }`}
                      >
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Chat Section */}
          {section === "Chat" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-white/90"
              } p-6 rounded-2xl shadow-xl backdrop-blur-md border ${
                theme === "dark" ? "border-white/20" : "border-[#DBEAFE]"
              }`}
            >
              <h2
                className={`text-lg font-semibold font-poppins ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("chat")}
              </h2>
              <div className="mt-4 max-h-60 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 ${msg.user === "Restaurant" ? "text-right" : "text-left"}`}
                  >
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-neon-blue-500" : "text-[#00A3CC]"
                      }`}
                    >
                      {msg.user}
                    </span>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                      {msg.text}
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className={`flex-1 p-2 ${
                    theme === "dark"
                      ? "bg-white/20 text-white border-white/50"
                      : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                  } rounded-lg focus:outline-none`}
                />
                <motion.button
                  className={`px-4 py-2 ${
                    theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                  } text-white rounded-lg`}
                  onClick={sendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      <AnimatePresence>
        {showCustomerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCustomerModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${
                theme === "dark" ? "bg-[#4B5EAA]" : "bg-[#E6F0FA]"
              } p-6 rounded-2xl max-w-md w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {showCustomerModal}
              </h2>
              {customers
                .find(c => c.name === showCustomerModal)
                ?.orders.map((order, index) => (
                  <div key={index} className="mt-2">
                    <p className={`${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                      {order.item} - {order.date} - ₹{order.price}
                    </p>
                  </div>
                ))}
              <motion.button
                className={`mt-4 px-4 py-2 ${
                  theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                } text-white rounded-lg`}
                onClick={() => setShowCustomerModal(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Item Modal */}
      <AnimatePresence>
        {showMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowMenuModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${
                theme === "dark" ? "bg-[#4B5EAA]" : "bg-[#E6F0FA]"
              } p-6 rounded-2xl max-w-md w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("add_menu_item")}
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="number"
                placeholder="Price"
                value={newMenuItem.price}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="text"
                placeholder="Category"
                value={newMenuItem.category}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <motion.button
                className={`mt-4 px-4 py-2 ${
                  theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                } text-white rounded-lg`}
                onClick={addMenuItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Modal */}
      <AnimatePresence>
        {showStaffModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowStaffModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${
                theme === "dark" ? "bg-[#4B5EAA]" : "bg-[#E6F0FA]"
              } p-6 rounded-2xl max-w-md w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("add_staff")}
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="text"
                placeholder="Role"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="text"
                placeholder="Shift"
                value={newStaff.shift}
                onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <motion.button
                className={`mt-4 px-4 py-2 ${
                  theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                } text-white rounded-lg`}
                onClick={addStaffMember}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promotion Modal */}
      <AnimatePresence>
        {showPromotionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowPromotionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${
                theme === "dark" ? "bg-[#4B5EAA]" : "bg-[#E6F0FA]"
              } p-6 rounded-2xl max-w-md w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-neon-green-500" : "text-[#00A3CC]"
                }`}
              >
                {t("add_promotion")}
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newPromotion.name}
                onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="number"
                placeholder="Discount (%)"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <input
                type="date"
                placeholder="Expiry"
                value={newPromotion.expiry}
                onChange={(e) => setNewPromotion({ ...newPromotion, expiry: e.target.value })}
                className={`w-full p-2 mt-2 ${
                  theme === "dark"
                    ? "bg-white/20 text-white border-white/50"
                    : "bg-white/50 text-gray-900 border-[#DBEAFE]"
                } rounded-lg`}
              />
              <motion.button
                className={`mt-4 px-4 py-2 ${
                  theme === "dark" ? "bg-neon-blue-500" : "bg-[#00A3CC]"
                } text-white rounded-lg`}
                onClick={addPromotion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Pattern */}
      <div className={`footer-pattern ${theme === "dark" ? "footer-pattern-dark" : "footer-pattern-light"}`} />
    </motion.div>
  );
};

export default RestaurantDashboard;