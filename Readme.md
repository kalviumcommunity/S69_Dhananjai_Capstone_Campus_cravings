              Campus Cravings
    “Craving Convenience? We Deliver, You Relax!”

1. Project Overview
Campus Cravings is a university-exclusive, student-powered delivery platform designed to fulfill food and stationery needs within the campus. The platform connects students who want to order food or stationery with fellow students who are available to pick up and deliver orders. By leveraging the student community, Campus Cravings ensures fast, affordable, and efficient service while promoting a collaborative campus economy.

2. Problem Statement
Students often face challenges in accessing food and essential supplies within campus due to:
	•	Long queues at food outlets and stationery shops.
	•	Limited time between classes.
	•	Inconvenience of walking across the campus, especially during busy schedules or bad weather.
	•	Expensive delivery charges from third-party services that don’t cater to university-specific needs.

3. Solution
Campus Cravings provides a peer-to-peer delivery system where students help each other by fulfilling orders from campus vendors. This ensures:
 Faster delivery, as students know campus shortcuts.
 Affordable service, reducing the reliance on external delivery apps.
 A gig-like system where students can earn by delivering orders.
 A smooth and interactive UX/UI design for easy navigation.
4. Key Features of Campus Cravings

1. Multi-User Interfaces
User Interface (Customers): Browse menus, place orders, track deliveries.
Vendor Interface (Restaurants/Shops): Manage orders, update inventory, track sales.
Courier Interface (Student Deliverers): Accept delivery requests, navigate with maps, track earnings.
2. Real-Time Order Tracking
Live order tracking for users and couriers.
Notifications at each stage (Order Placed, Picked Up, Out for Delivery,       
3. Student-Powered Delivery System
Students fulfill orders, creating a peer-to-peer delivery network.
 Flexible work for students, allowing them to earn money on their own schedule.
4. Interactive & User-Friendly UI/UX
Minimalistic and easy-to-navigate design.
Optimized for quick access and smooth order placement.
5. Smart Order Matching System
Matches orders to the nearest available student courier for faster delivery.
Priority-based delivery system (e.g., urgent requests, bulk orders).
6. Secure & Flexible Payments
Multiple payment options (Cash, Digital Wallets, Campus Cards).
Secure transactions within the platform.
7. In-App Chat & Notifications
Direct communication between users, couriers, and vendors.
Instant notifications for order status updates.
8. Vendor Management System
Restaurants and stationery shops can manage their menus, prices, and availability.
Performance analytics for vendors to track sales.
9. Ratings & Reviews
Users can rate and review restaurants, delivery experiences, and        couriers.
Helps improve service quality and reliability.


5.  Tech Stack Summary:
Frontend: React.js, Next.js, Tailwind CSS, Redux, Mapbox
Backend: Node.js, Express.js, MongoDB, Socket.io
Database: MongoDB Atlas
Authentication: JWT, OAuth
Payments: Stripe / Razorpay
Hosting: Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas (Database)
Real-Time Updates: Socket.io, Firebase Cloud Messaging



Campus craving project timeline.
Week 1: Planning, UI/UX Design & Initial Setup (Day 1-7)
 Day 1-2: Planning & Initial Setup
 Define project scope, user flow, and finalize feature list.
 Create a GitHub project (setup README, issues, and milestones).
 Set up GitHub Projects to track daily progress (proof of 10+ entries).
Day 3-4: UI/UX Design (Low-Fidelity & High-Fidelity)
 Create Low-Fidelity Wireframes (sketch navigation and layouts).
 Convert to High-Fidelity Design (Figma or Adobe XD).
 Ensure design consistency across User, Vendor, and Courier interfaces.
 Day 5-6: Tech Stack & Initial Repos
 Initialize backend repo (Node.js + Express.js).
 Initialize frontend repo (React.js + Tailwind CSS).
 Create bruno API collection for API testing.
 Set up MongoDB Atlas (cloud database).
 Day 7: Database Schema & API Setup
 Design database schema for Users, Orders, Restaurants, and Couriers.
 Implement GET API (Fetch user, orders, and vendors).
 Implement POST API (Create new orders, register users).

Week 2: Backend Development & Authentication (Day 8-14)
 Day 8-9: CRUD Operations & API Implementation
 Implement PUT API (Update user details, restaurant menus).
 Implement DELETE API (Remove orders, users, restaurants).
 Define relationships between database entities (Mongoose Models).
 Day 10-11: Backend Deployment & JWT Authentication
 Deploy backend to Render/Railway.
 Implement authentication using JWT (Sign up, login, protected routes).
 Implement Password Hashing with bcrypt.js.
 Day 12-13: OAuth Authentication (Google Login)
 Implement Google OAuth authentication.
 Ensure smooth login for students (Campus Email or Google).
 Day 14: Database Read & Write Testing
 Test all CRUD APIs using Bruno/Postman.
 Store & retrieve user, order, and menu data in MongoDB.



Week 3: Frontend Development & UI Implementation (Day 15-21)
Day 15-16: Initialize Frontend & React Components
 Initialize React app & set up React Router.
 Implement global state management (Redux Toolkit).
 Create reusable UI components (Buttons, Cards, Forms).
 Day 17-18: Implement Authentication in Frontend
 Implement JWT authentication in React (Login/Register UI).
 Integrate Google Login with React.
 Day 19-20: Fetching & Displaying Data from APIs
 Implement GET API in frontend (fetching menus, orders, and vendors).
 Display fetched data in responsive UI components.
 Day 21: Deploy Frontend & Connect with Backend
 Deploy frontend using Vercel/Netlify.
 Connect frontend with backend APIs (Live data flow).



Week 4: Advanced Features & Testing (Day 22-30)
 Day 22-23: Implement Order & Delivery System
 Implement POST API to place new orders from frontend.
 Display active orders for students & delivery personnel.
 Day 24-25: File Upload Functionality
 Implement Cloudinary/Firebase for menu & profile picture uploads.
 Users can upload images while placing orders.
 Day 26-27: Implement Update & Delete Features
 Implement PUT API to update order status.
 Implement DELETE API to allow users to cancel orders.
 Day 28-29: Final Testing & Debugging
 Test all API integrations with Bruno/Postman.
 Fix bugs and UI inconsistencies.
 Ensure smooth order tracking & delivery assignment.
 Day 30: Final Deployment & Launch
 Deploy final backend and frontend versions.
 Perform end-to-end testing.
 Submit final proof of GitHub project tracking with 10+ entries.

