# ShopKart — Full-Stack E-Commerce Application

![ShopKart Banner](https://img.shields.io/badge/ShopKart-FullStack%20E--Commerce-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)
![ExpressJS](https://img.shields.io/badge/Express.js-v5.0-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-v19-cyan?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**ShopKart** is a production-style, full-stack e-commerce web application built progressively across engineering labs. It features secure customer authentication using **JSON Web Tokens (JWT)** stored in `HttpOnly` cookies, a dynamic **Product Discovery and Catalog System** with real-time regex search, category filtering, and price sorting, and a persistent **Wishlist Experience** powered by **MongoDB ObjectId Referencing** (`ref: 'Product'`) and **Mongoose `populate()`**.

---

## 📋 Table of Contents
- [Project Overview & Evolution](#-project-overview--evolution)
- [Engineering Lab Progression & Feature Matrix](#-engineering-lab-progression--feature-matrix)
- [Tech Stack](#-tech-stack)
- [File & Directory Architecture Breakdown](#-file--directory-architecture-breakdown)
  - [Backend Architecture](#1-backend-directory-backend)
  - [Frontend Architecture](#2-frontend-directory-frontend)
- [System Architecture & Data Flow Diagrams](#-system-architecture--data-flow-diagrams)
- [API Reference Documentation](#-api-reference-documentation)
  - [Customer Auth Endpoints (`/customers`)](#customer-authentication-endpoints-customers)
  - [Product Catalog Endpoints (`/products`)](#product-catalog-endpoints-products)
  - [Wishlist Endpoints (`/wishlist`)](#wishlist-endpoints-wishlist)
- [Edge Cases & Error Handling](#-edge-cases--error-handling)
- [Setup & Installation Instructions](#-setup--installation-instructions)
- [🎓 Comprehensive Viva Examination Preparation Guide (60 Questions)](#-comprehensive-viva-examination-preparation-guide-60-questions)
  - [Category 1: Web & REST API Architecture (Q1 – Q10)](#category-1-web--rest-api-architecture)
  - [Category 2: Backend Development & Express.js (Q11 – Q20)](#category-2-backend-development--expressjs)
  - [Category 3: MongoDB & Mongoose Referencing (Q21 – Q30)](#category-3-mongodb--mongoose-referencing)
  - [Category 4: Frontend Development & React Hooks (Q31 – Q40)](#category-4-frontend-development--react-hooks)
  - [Category 5: Authentication & Security (Q41 – Q50)](#category-5-authentication--security)
  - [Category 6: ShopKart Project Specific Logic (Q51 – Q60)](#category-6-shopkart-project-specific-logic)

---

## 🚀 Project Overview & Evolution

ShopKart is developed across modular engineering labs to replicate real-world enterprise software development practices:

- **Lab 01 — Customer Auth Backend**: Modeled database schemas using **Mongoose**, implemented password hashing with **bcrypt**, generated **JWT tokens**, stored credentials securely using **`HttpOnly` cookies**, and built protected profile endpoints (`GET /customers/me`).
- **Lab 02 — Customer Auth Frontend**: Built a client-side Single Page Application (SPA) in **React (Vite)** with controlled components, client-side routing via **React Router DOM**, centralized API communication via **Axios**, and session persistence.
- **Lab 03 — Product Catalog & Discovery**: Developed full-stack product management capabilities with product creation, regex search, category filtering, price sorting (`price_asc`, `price_desc`), dynamic route product details (`/products/:id`), and user feedback states (**Loading**, **Error**, and **Empty** states).
- **Lab 04 — Wishlist Experience**: Implemented user-specific product wishlisting:
  - Extended `Customer` schema with MongoDB `ObjectId` array referencing `Product` (`ref: "Product"`).
  - Built protected REST APIs: `POST /wishlist/:productId` (with `409 Conflict` duplicate prevention), `GET /wishlist` (using Mongoose `.populate()`), and `DELETE /wishlist/:productId`.
  - Created a dynamic React Wishlist Page (`/wishlist`), Wishlist Card components, Navbar badge count, and UI states (**Loading**, **Empty** with `[ Browse Products ]`, and **Error** with `[ Try Again ]`).

---

## 📊 Engineering Lab Progression & Feature Matrix

| Feature / Module | Lab Introduced | Backend Route | Frontend Component / Page | Key Technologies Used |
| :--- | :---: | :--- | :--- | :--- |
| **Customer Registration** | Lab 01 & 02 | `POST /customers/register` | `Register.jsx` | Bcrypt hashing, Mongoose validation |
| **Customer Login & JWT** | Lab 01 & 02 | `POST /customers/login` | `Login.jsx` | JWT token, `HttpOnly` Cookies |
| **Protected Profile** | Lab 01 & 02 | `GET /customers/me` | `Home.jsx` | Express `protect` auth middleware |
| **Product Schema & Creation** | Lab 03 | `POST /products` | Backend Seeding / Postman | Mongoose validation (`min price`, `min stock`) |
| **Product Discovery & Search** | Lab 03 | `GET /products?search=&category=` | `Products.jsx`, `SearchBar.jsx` | MongoDB `$regex`, Dynamic Query Building |
| **Product Price Sorting** | Lab 03 Bonus | `GET /products?sort=price_asc` | `Products.jsx`, `SearchBar.jsx` | Mongoose `.sort({ price: 1 })` |
| **Product Details View** | Lab 03 | `GET /products/:id` | `ProductDetails.jsx` | React Router `useParams()` |
| **Wishlist ObjectId Schema** | Lab 04 | `customerSchema.wishlist` | `Customer.js` Model | `mongoose.Schema.Types.ObjectId`, `ref: 'Product'` |
| **Add to Wishlist** | Lab 04 | `POST /wishlist/:productId` | `ProductCard.jsx` | `409 Conflict` Duplicate check |
| **Get Populated Wishlist** | Lab 04 | `GET /wishlist` | `Wishlist.jsx`, `WishlistCard.jsx` | Mongoose `.populate('wishlist')` |
| **Remove from Wishlist** | Lab 04 | `DELETE /wishlist/:productId` | `WishlistCard.jsx`, `ProductCard.jsx` | MongoDB `$pull` / array filter |
| **Wishlist Navbar Badge** | Lab 04 Bonus | `GET /wishlist` | `Navbar.jsx` | Dynamic React props & backend fetch |

---

## 🛠 Tech Stack

### **Backend Stack**
* **Runtime**: Node.js (v18+)
* **Framework**: Express.js (`v5.2.1`)
* **Database**: MongoDB (Local instance or In-Memory fallback via `mongodb-memory-server`)
* **ODM Library**: Mongoose (`v9.9.4`)
* **Authentication & Security**: `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`
* **Environment Configuration**: `dotenv`

### **Frontend Stack**
* **Framework**: React (`v19.2.8`) via Vite (`v8.2.2`)
* **Routing**: React Router DOM (`v7.18.3`)
* **HTTP Client**: Axios (`v1.20.0`) with `withCredentials: true`
* **Styling**: Modern Custom CSS (Flexbox, Grid, Glassmorphism, Micro-animations)
