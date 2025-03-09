# Zoomer - Ecommerce Platform

## Overview
Zoomer is a modern e-commerce web application built using **React (TypeScript) and Vite**. It provides a seamless shopping experience for users and includes an admin dashboard for managing products, orders, and users.

## Features
### User Features:
- **Authentication:** User registration and login (Login.tsx, Register.tsx)
- **Shopping Cart:** Add, remove, and update cart items (Cart.tsx, Cartpage.tsx, cartUtils.ts)
- **Product Browsing:** View products with details (Productpage.tsx, Store.tsx)
- **Search & Filter:** Search for products (Searchbar.tsx)
- **User Dashboard:** Manage orders and profile settings (UserDashboard.tsx, UserOrders.tsx, UserProfile.tsx, UserSettings.tsx)

### Admin Features:
- **Dashboard Overview:** Analytics for store performance (AdminDashboard.tsx, AnalyticsDashboard.tsx)
- **Product Management:** Add, update, and delete products (ProductManagement.tsx)
- **Order Management:** Process and manage orders (OrderManagement.tsx)
- **User Management:** View and manage users (UserManagement.tsx)

## Folder Structure
```
📦 zoomer
 ┣ 📂 public        # Public assets
 ┣ 📂 src
 ┃ ┣ 📂 assets      # Static assets (images, icons, etc.)
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 admin     # Admin panel components
 ┃ ┃ ┣ 📂 Cart      # Shopping cart components
 ┃ ┃ ┣ 📂 common    # Shared components (PrivateRoute.tsx, etc.)
 ┃ ┃ ┣ 📂 Navbar    # Navigation components (Navbar.tsx, Searchbar.tsx, etc.)
 ┃ ┃ ┣ 📂 ProductCard # Product display components
 ┃ ┃ ┣ 📂 ProductCarousel # Product carousel component
 ┃ ┃ ┣ 📂 user      # User-related pages (dashboard, profile, orders)
 ┃ ┣ 📂 pages       # Page views (Cart.tsx, Store.tsx, etc.)
 ┃ ┣ 📂 services    # API services (AuthService.ts)
 ┃ ┣ 📂 utils       # Utility functions (cartUtils.ts)
 ┃ ┣ App.tsx       # Main app component
 ┃ ┣ main.tsx      # Entry point
 ┣ 📜 package.json  # Dependencies
 ┣ 📜 tsconfig.json # TypeScript configuration
 ┣ 📜 vite.config.ts # Vite configuration
 ┗ 📜 .gitignore    # Git ignored files
```

## Setup and Installation
### Prerequisites:
- Node.js (v16+ recommended)
- npm or yarn

### Steps to Run:
1. Clone the repository:
   ```sh
   git clone https://github.com/levdalba/Ecommerce-shop/zoomer.git
   cd zoomer
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used
- **Frontend:** React, TypeScript, Vite
- **State Management:** Context API
- **Styling:** CSS Modules / Tailwind CSS
- **Authentication:** JWT (via AuthService.ts)
- **Routing:** React Router

---
**Maintained by:** me

