// import React, { useState, useMemo, createContext, useContext } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";

// // Mock image imports (replace with actual paths)
// import dosa from "../assets/dosa.png";
// import biryani from "../assets/biryani.png";
// import pastry from "../assets/pastry.png";
// import north from "../assets/north.png";
// import tandoori from "../assets/tandoori.png";
// import lassi from "../assets/lassi.png";
// import chickenBurger from "../assets/chickenBurger.png";
// import logo from "../assets/logo.png";

// // Cart Context
// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     setCart((prev) => {
//       const existingItem = prev.find((cartItem) => cartItem.name === item.name);
//       if (existingItem) {
//         return prev.map((cartItem) =>
//           cartItem.name === item.name
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//     showToast(`${item.name} added to cart!`);
//   };

//   const removeFromCart = (name) => {
//     setCart((prev) => prev.filter((item) => item.name !== name));
//     showToast(`${name} removed from cart!`);
//   };

//   const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => useContext(CartContext);

// // Mock data
// const foodItems = [
//   { name: "Dosa", img: dosa },
//   { name: "Biryani", img: biryani },
//   { name: "Pastry", img: pastry },
//   { name: "North", img: north },
// ];

// const restaurants = [
//   { id: 1, name: "Spice Haven", cuisine: "Indian", rating: "4.5", img: dosa },
//   { id: 2, name: "Campus Bites", cuisine: "Fast Food", rating: "4.2", img: chickenBurger },
//   { id: 3, name: "Sweet Tooth", cuisine: "Desserts", rating: "4.7", img: pastry },
// ];

// const stationeryItems = [
//   { icon: "🖊", text: "Pen & Pencil" },
//   { icon: "📖", text: "Notebooks" },
//   { icon: "🍫", text: "Snacks" },
//   { icon: "📄", text: "Xerox Services" },
// ];

// const specialItems = [
//   { name: "Chicken Patty Burger", price: "₹140", img: chickenBurger },
//   { name: "Tandoori Chicken", price: "₹240", img: tandoori },
//   { name: "Mango Lassi", price: "₹100", img: lassi },
// ];

// // Toast Notification
// const showToast = (message) => {
//   const toast = document.createElement("div");
//   toast.className =
//     "fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50";
//   toast.textContent = message;
//   document.body.appendChild(toast);
//   setTimeout(() => toast.remove(), 3000);
// };

// // Reusable Components
// const NavBar = React.memo(({ onSearch, totalItems }) => (
//   <nav className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
//     <img src={logo} alt="Campus Cravings Logo" className="w-12 md:w-16 rounded-full" />
//     <ul className="hidden md:flex space-x-8 text-lg font-semibold font-poppins text-white">
//       {["Home", "Menu", "Orders", "Profile"].map((item) => (
//         <li key={item}>
//           <Link
//             to={`/${item.toLowerCase()}`}
//             className="hover:text-orange-400 transition-colors duration-300"
//             aria-label={item}
//           >
//             {item}
//           </Link>
//         </li>
//       ))}
//     </ul>
//     <div className="flex items-center gap-4">
//       <input
//         type="text"
//         placeholder="Search food or restaurants"
//         className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full max-w-xs font-poppins"
//         onChange={(e) => onSearch(e.target.value)}
//         aria-label="Search food or restaurants"
//       />
//       <Link
//         to="/cart"
//         className="relative text-white"
//         aria-label={`View cart with ${totalItems} items`}
//       >
//         🛒
//         {totalItems > 0 && (
//           <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-2 py-1">
//             {totalItems}
//           </span>
//         )}
//       </Link>
//     </div>
//   </nav>
// ));

// const FoodCategory = React.memo(({ items, selectedFood, setSelectedFood, setIsPaused }) => (
//   <motion.div
//     className="flex gap-6 md:gap-10 whitespace-nowrap py-4"
//     animate={{ x: selectedFood ? 0 : ["0%", "-50%"] }}
//     transition={{ repeat: Infinity, duration: 12, ease: "linear", pause: selectedFood }}
//   >
//     {[...items, ...items].map((food, index) => (
//       <motion.div
//         key={`${food.name}-${index}`}
//         className={`text-center min-w-[120px] md:min-w-[160px] cursor-pointer rounded-xl bg-white/10 p-4 backdrop-blur-sm ${
//           selectedFood === food.name ? "scale-105 shadow-xl shadow-orange-400/50" : ""
//         }`}
//         whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
//         onMouseEnter={() => {
//           setIsPaused(true);
//           setSelectedFood(food.name);
//         }}
//         onMouseLeave={() => {
//           setIsPaused(false);
//           setSelectedFood(null);
//         }}
//         onClick={() => setSelectedFood(food.name)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             setSelectedFood(food.name);
//             setIsPaused(true);
//           }
//         }}
//         role="button"
//         tabIndex={0}
//         aria-label={`Select ${food.name}`}
//       >
//         <img
//           src={food.img}
//           alt={food.name}
//           className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full border-4 border-orange-400/50 object-cover"
//           loading="lazy"
//         />
//         <p className="mt-3 text-base md:text-lg font-semibold font-poppins text-white">{food.name}</p>
//       </motion.div>
//     ))}
//   </motion.div>
// ));

// const StationeryItem = React.memo(({ icon, text }) => (
//   <motion.li
//     className="flex items-center space-x-4 bg-white/90 p-4 rounded-xl shadow-lg hover:shadow-orange-400/50 transition-shadow cursor-pointer"
//     whileHover={{ scale: 1.05 }}
//     onKeyDown={(e) => {
//       if (e.key === "Enter" || e.key === " ") {
//         showToast(`${text} clicked!`);
//       }
//     }}
//     role="button"
//     tabIndex={0}
//     aria-label={`Select ${text}`}
//   >
//     <span className="text-3xl" aria-hidden="true">{icon}</span>
//     <span className="font-semibold text-lg font-poppins text-gray-800">{text}</span>
//   </motion.li>
// ));

// const SpecialItem = React.memo(({ name, price, img }) => {
//   const { addToCart } = useCart();
//   return (
//     <motion.div
//       className="bg-white/90 p-5 rounded-xl shadow-lg text-center hover:shadow-orange-400/50 transition-shadow backdrop-blur-sm"
//       whileHover={{ scale: 1.05 }}
//     >
//       <img src={img} alt={name} className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-lg object-cover" loading="lazy" />
//       <p className="mt-3 text-lg font-semibold font-poppins text-gray-800">{name}</p>
//       <p className="text-gray-600 font-poppins">{price}</p>
//       <button
//         className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-poppins"
//         onClick={() => addToCart({ name, price, img })}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             addToCart({ name, price, img });
//           }
//         }}
//         aria-label={`Add ${name} to cart`}
//       >
//         Add to cart
//       </button>
//     </motion.div>
//   );
// });

// const RestaurantCard = React.memo(({ restaurant }) => {
//   const navigate = useNavigate();
//   return (
//     <motion.div
//       className="bg-white/90 text-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-orange-400/50 transition-shadow backdrop-blur-sm"
//       onClick={() => navigate(`/restaurant/${restaurant.id}`)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           navigate(`/restaurant/${restaurant.id}`);
//         }
//       }}
//       role="button"
//       tabIndex={0}
//       aria-label={`View ${restaurant.name} details`}
//       whileHover={{ scale: 1.05 }}
//     >
//       <img
//         src={restaurant.img}
//         alt={restaurant.name}
//         className="w-full h-48 object-cover rounded-lg"
//         loading="lazy"
//       />
//       <h3 className="mt-4 text-xl font-semibold font-poppins">{restaurant.name}</h3>
//       <p className="text-gray-600 font-poppins">{restaurant.cuisine}</p>
//       <p className="text-orange-500 font-bold font-poppins">⭐ {restaurant.rating}</p>
//     </motion.div>
//   );
// });

// const Food = () => {
//   const [isPaused, setIsPaused] = useState(false);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recommendedItems, setRecommendedItems] = useState(specialItems);
//   const navigate = useNavigate();
//   const { getTotalItems } = useCart();

//   const filteredFoodItems = useMemo(
//     () =>
//       foodItems.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     [searchQuery]
//   );

//   const filteredRestaurants = useMemo(
//     () =>
//       restaurants.filter(
//         (restaurant) =>
//           restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     [searchQuery]
//   );

//   const handleShowRecommendation = () => {
//     // Mock recommendation logic: Randomly shuffle specialItems
//     const shuffled = [...specialItems].sort(() => Math.random() - 0.5);
//     setRecommendedItems(shuffled.slice(0, 3));
//     showToast("New recommendations loaded!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-800 text-white font-poppins">
//       {/* Navbar */}
//       <NavBar onSearch={setSearchQuery} totalItems={getTotalItems()} />

//       {/* Hero Section */}
//       <motion.div
//         className="text-center mt-10 md:mt-16"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
//           Campus Cravings
//         </h1>
//         <motion.button
//           className="mt-8 px-8 py-4 bg-orange-500 text-white rounded-full text-lg md:text-xl font-semibold hover:bg-orange-600 transition-all shadow-lg"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/menu")}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               navigate("/menu");
//             }
//           }}
//           aria-label="Order now"
//         >
//           Order Now
//         </motion.button>
//       </motion.div>

//       {/* Food Categories - Infinite Scrolling */}
//       {filteredFoodItems.length > 0 ? (
//         <div className="overflow-hidden mt-12 md:mt-16 px-4">
//           <FoodCategory
//             items={filteredFoodItems}
//             selectedFood={selectedFood}
//             setSelectedFood={setSelectedFood}
//             setIsPaused={setIsPaused}
//           />
//         </div>
//       ) : (
//         <p className="text-center mt-12 text-lg font-poppins text-gray-300">
//           No food items found for "{searchQuery}".
//         </p>
//       )}

//       {/* Stationery & Today's Special Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 md:mt-16 px-4 md:px-10">
//         {/* Stationery Section */}
//         <motion.div
//           className="bg-gradient-to-br from-white to-gray-100 text-black p-6 md:p-8 rounded-2xl shadow-2xl"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-orange-600 flex items-center">
//             ✏️ Stationery
//           </h2>
//           <ul className="mt-6 space-y-4 text-lg">
//             {stationeryItems.map((item, index) => (
//               <StationeryItem key={index} icon={item.icon} text={item.text} />
//             ))}
//           </ul>
//         </motion.div>

//         {/* Today's Special Section */}
//         <motion.div
//           className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-orange-600">Today's Special</h2>
//           <motion.button
//             className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-poppins"
//             whileHover={{ scale: 1.1 }}
//             onClick={handleShowRecommendation}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 handleShowRecommendation();
//               }
//             }}
//             aria-label="Show recommendations"
//           >
//             Show Recommendation
//           </motion.button>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
//             {recommendedItems.map((item, index) => (
//               <SpecialItem key={index} name={item.name} price={item.price} img={item.img} />
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Campus Restaurants Section */}
//       {filteredRestaurants.length > 0 ? (
//         <motion.div
//           className="mt-12 md:mt-16 px-4 md:px-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-400 mb-8">
//             Campus Restaurants
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {filteredRestaurants.map((restaurant) => (
//               <RestaurantCard key={restaurant.id} restaurant={restaurant} />
//             ))}
//           </div>
//         </motion.div>
//       ) : (
//         <p className="text-center mt-12 text-lg font-poppins text-gray-300">
//           No restaurants found for "{searchQuery}".
//         </p>
//       )}

//       {/* Footer */}
//       <footer className="text-center py-8 mt-16 bg-blue-950 text-gray-300 font-poppins">
//         © 2025 Campus Cravings. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// // Wrap Food component with CartProvider
// const FoodWithCart = () => (
//   <CartProvider>
//     <Food />
//   </CartProvider>
// );

// export default FoodWithCart;






import React, { useState, useMemo, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

// Mock image imports (replace with actual paths)
import dosa from '../assets/dosa.png';
import biryani from '../assets/biryani.png';
import pastry from '../assets/pastry.png';
import north from '../assets/north.png';
import tandoori from '../assets/tandoori.png';
import lassi from '../assets/lassi.png';
import chickenBurger from '../assets/chickenBurger.png';
import logo from '../assets/logo.png';

// Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart!`);
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
    showToast(`${name} removed from cart!`);
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// Mock data
const foodItems = [
  { name: 'Dosa', img: dosa },
  { name: 'Biryani', img: biryani },
  { name: 'Pastry', img: pastry },
  { name: 'North', img: north },
];

const restaurants = [
  { id: 1, name: 'Spice Haven', cuisine: 'Indian', rating: '4.5', img: dosa },
  { id: 2, name: 'Campus Bites', cuisine: 'Fast Food', rating: '4.2', img: chickenBurger },
  { id: 3, name: 'Sweet Tooth', cuisine: 'Desserts', rating: '4.7', img: pastry },
];

const stationeryItems = [
  { icon: '🖊', text: 'Pen & Pencil' },
  { icon: '📖', text: 'Notebooks' },
  { icon: '🍫', text: 'Snacks' },
  { icon: '📄', text: 'Xerox Services' },
];

const specialItems = [
  { name: 'Chicken Patty Burger', price: '₹140', img: chickenBurger },
  { name: 'Tandoori Chicken', price: '₹240', img: tandoori },
  { name: 'Mango Lassi', price: '₹100', img: lassi },
];

// Toast Notification
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className =
    'fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// Reusable Components
const NavBar = React.memo(({ onSearch, totalItems }) => (
  <nav className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
    <img src={logo} alt="Campus Cravings Logo" className="w-12 md:w-16 rounded-full" />
    <ul className="hidden md:flex space-x-8 text-lg font-semibold font-poppins text-white">
      {['Home', 'Menu', 'Orders', 'Profile'].map((item) => (
        <li key={item}>
          <Link
            to={`/${item.toLowerCase()}`}
            className="hover:text-orange-400 transition-colors duration-300"
            aria-label={item}
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Search food or restaurants"
        className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full max-w-xs font-poppins"
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search food or restaurants"
      />
      <Link
        to="/cart"
        className="relative text-white"
        aria-label={`View cart with ${totalItems} items`}
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-2 py-1">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  </nav>
));

const FoodCategory = React.memo(({ items, selectedFood, setSelectedFood, setIsPaused }) => (
  <motion.div
    className="flex gap-6 md:gap-10 whitespace-nowrap py-4"
    animate={{ x: selectedFood ? 0 : ['0%', '-50%'] }}
    transition={{ repeat: Infinity, duration: 12, ease: 'linear', pause: selectedFood }}
  >
    {[...items, ...items].map((food, index) => (
      <motion.div
        key={`${food.name}-${index}`}
        className={`text-center min-w-[120px] md:min-w-[160px] cursor-pointer rounded-xl bg-white/10 p-4 backdrop-blur-sm ${
          selectedFood === food.name ? 'scale-105 shadow-xl shadow-orange-400/50' : ''
        }`}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        onMouseEnter={() => {
          setIsPaused(true);
          setSelectedFood(food.name);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setSelectedFood(null);
        }}
        onClick={() => setSelectedFood(food.name)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setSelectedFood(food.name);
            setIsPaused(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Select ${food.name}`}
      >
        <img
          src={food.img}
          alt={food.name}
          className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full border-4 border-orange-400/50 object-cover"
          loading="lazy"
        />
        <p className="mt-3 text-base md:text-lg font-semibold font-poppins text-white">{food.name}</p>
      </motion.div>
    ))}
  </motion.div>
));

const StationeryItem = React.memo(({ icon, text }) => (
  <motion.li
    className="flex items-center space-x-4 bg-white/90 p-4 rounded-xl shadow-lg hover:shadow-orange-400/50 transition-shadow cursor-pointer"
    whileHover={{ scale: 1.05 }}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showToast(`${text} clicked!`);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`Select ${text}`}
  >
    <span className="text-3xl" aria-hidden="true">{icon}</span>
    <span className="font-semibold text-lg font-poppins text-gray-800">{text}</span>
  </motion.li>
));

const SpecialItem = React.memo(({ name, price, img }) => {
  const { addToCart } = useCart(); // Fixed typo: addontext -> addToCart
  return (
    <motion.div
      className="bg-white/90 p-5 rounded-xl shadow-lg text-center hover:shadow-orange-400/50 transition-shadow backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={img}
        alt={name}
        className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-lg object-cover"
        loading="lazy"
      />
      <p className="mt-3 text-lg font-semibold font-poppins text-gray-800">{name}</p>
      <p className="text-gray-600 font-poppins">{price}</p>
      <button
        className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-poppins"
        onClick={() => addToCart({ name, price, img })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            addToCart({ name, price, img });
          }
        }}
        aria-label={`Add ${name} to cart`}
      >
        Add to cart
      </button>
    </motion.div>
  );
});

const RestaurantCard = React.memo(({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white/90 text-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-orange-400/50 transition-shadow backdrop-blur-sm"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/restaurant/${restaurant.id}`);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${restaurant.name} details`}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={restaurant.img}
        alt={restaurant.name}
        className="w-full h-48 object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="mt-4 text-xl font-semibold font-poppins">{restaurant.name}</h3>
      <p className="text-gray-600 font-poppins">{restaurant.cuisine}</p>
      <p className="text-orange-500 font-bold font-poppins">⭐ {restaurant.rating}</p>
    </motion.div>
  );
});

const Food = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedItems, setRecommendedItems] = useState(specialItems);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const filteredFoodItems = useMemo(
    () => foodItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const filteredRestaurants = useMemo(
    () =>
      restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const handleShowRecommendation = () => {
    const shuffled = [...specialItems].sort(() => Math.random() - 0.5);
    setRecommendedItems(shuffled.slice(0, 3));
    showToast('New recommendations loaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-800 text-white font-poppins">
      <NavBar onSearch={setSearchQuery} totalItems={getTotalItems()} />
      <motion.div
        className="text-center mt-10 md:mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          Campus Cravings
        </h1>
        <motion.button
          className="mt-8 px-8 py-4 bg-orange-500 text-white rounded-full text-lg md:text-xl font-semibold hover:bg-orange-600 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/menu')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate('/menu');
            }
          }}
          aria-label="Order now"
        >
          Order Now
        </motion.button>
      </motion.div>
      {filteredFoodItems.length > 0 ? (
        <div className="overflow-hidden mt-12 md:mt-16 px-4">
          <FoodCategory
            items={filteredFoodItems}
            selectedFood={selectedFood}
            setSelectedFood={setSelectedFood}
            setIsPaused={setIsPaused}
          />
        </div>
      ) : (
        <p className="text-center mt-12 text-lg font-poppins text-gray-300">
          No food items found for "{searchQuery}".
        </p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 md:mt-16 px-4 md:px-10">
        <motion.div
          className="bg-gradient-to-br from-white to-gray-100 text-black p-6 md:p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 flex items-center">
            ✏️ Stationery
          </h2>
          <ul className="mt-6 space-y-4 text-lg">
            {stationeryItems.map((item, index) => (
              <StationeryItem key={index} icon={item.icon} text={item.text} />
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600">Today's Special</h2>
          <motion.button
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-poppins"
            whileHover={{ scale: 1.1 }}
            onClick={handleShowRecommendation}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleShowRecommendation();
              }
            }}
            aria-label="Show recommendations"
          >
            Show Recommendation
          </motion.button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {recommendedItems.map((item, index) => (
              <SpecialItem key={index} name={item.name} price={item.price} img={item.img} />
            ))}
          </div>
        </motion.div>
      </div>
      {filteredRestaurants.length > 0 ? (
        <motion.div
          className="mt-12 md:mt-16 px-4 md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-400 mb-8">
            Campus Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </motion.div>
      ) : (
        <p className="text-center mt-12 text-lg font-poppins text-gray-300">
          No restaurants found for "{searchQuery}".
        </p>
      )}
      <footer className="text-center py-8 mt-16 16px bg-blue-950 text-gray-300 font-poppins">
        © 2025 Campus Cravings. All rights reserved.
      </footer>
    </div>
  );
};

export default Food;