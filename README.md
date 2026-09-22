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

---

## 📁 File & Directory Architecture Breakdown

```text
ShopKart/
├── backend/
│   ├── controllers/
│   │   ├── customer.controller.js
│   │   ├── product.controller.js
│   │   └── wishlist.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── customer.model.js
│   │   └── product.model.js
│   ├── routes/
│   │   ├── customer.routes.js
│   │   ├── product.routes.js
│   │   └── wishlist.routes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── WishlistCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Products.jsx
    │   │   ├── Register.jsx
    │   │   └── Wishlist.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

### 1. Backend Directory (`backend/`)

| File / Folder Path | Type | Lab | Purpose & Architectural Overview |
| :--- | :---: | :---: | :--- |
| `index.js` | **File** | Labs 1-4 | **Express Server Entry Point**: Configures Express, CORS (`withCredentials: true`), body parsers, cookie parser, resilient MongoDB connection with In-Memory fallback, database seeding, and mounts API routes (`/customers`, `/products`, `/wishlist`). |
| `.env` | **File** | Lab 01 | **Environment Secret Config**: Stores database connection strings (`MONGO_URI`), server `PORT`, and JWT signing secret (`JWT_SECRET`). *(Git-ignored)* |
| `models/customer.model.js` | **File** | Labs 1 & 4 | **Customer Schema**: Defines fields for `fullName`, `email` (unique), `password`, `phone`, and `wishlist` array storing `mongoose.Schema.Types.ObjectId` references pointing to `Product`. |
| `models/product.model.js` | **File** | Lab 03 | **Product Schema**: Defines product data blueprint: `name`, `description`, `price` (`min: 0.01`), `category`, `image`, `stock` (`min: 0`), and automatic `createdAt` timestamp. |
| `controllers/customer.controller.js` | **File** | Labs 1 & 2 | **Customer Handlers**: `registerCustomer` (bcrypt hashing), `loginCustomer` (password comparison & JWT `HttpOnly` cookie setting), `getMyProfile` (authenticated customer data), and `logoutCustomer` (clears cookie). |
| `controllers/product.controller.js` | **File** | Lab 03 | **Product Handlers**: `createProduct` (validates price/stock), `getAllProducts` (case-insensitive `$regex` search, category match, price sorting `price_asc`/`price_desc`), and `getProductById` (validates ObjectId & fetches details). |
| `controllers/wishlist.controller.js` | **File** | Lab 04 | **Wishlist Handlers**: `addToWishlist` (validates ID, checks duplicate `409 Conflict`, pushes reference), `getWishlist` (uses `.populate()` to resolve full product objects), and `removeFromWishlist` (filters reference from user array). |
| `routes/customer.routes.js` | **File** | Labs 1 & 2 | **Customer Routes**: Maps `/register` (POST), `/login` (POST), `/me` (GET, protected), and `/logout` (POST, protected). |
| `routes/product.routes.js` | **File** | Lab 03 | **Product Routes**: Maps `/` (POST create, GET catalog list) and `/:id` (GET product details). |
| `routes/wishlist.routes.js` | **File** | Lab 04 | **Wishlist Routes**: Maps `POST /:productId`, `GET /`, and `DELETE /:productId` protected by `protect` authentication middleware. |
| `middlewares/auth.middleware.js` | **File** | Lab 02 | **JWT Protection Guard (`protect`)**: Extracts `req.cookies.token`, verifies JWT payload using `jwt.verify()`, attaches user object to `req.user`, or returns `401 Unauthorized`. |
| `utils/generateToken.js` | **File** | Lab 01 | **JWT Signing Utility**: Signs a JSON Web Token with customer ID and secret key, setting expiration to 1 day (`1d`). |

---

### 2. Frontend Directory (`frontend/`)

| File / Folder Path | Type | Lab | Purpose & Architectural Overview |
| :--- | :---: | :---: | :--- |
| `src/main.jsx` | **File** | Lab 02 | **React DOM Mounting Point**: Renders root `<App />` component inside `<div id="root"></div>` target using `ReactDOM.createRoot()`. |
| `src/App.jsx` | **File** | Labs 2-4 | **Application Router**: Sets up `BrowserRouter` and maps client routes (`/login`, `/register`, `/home`, `/products`, `/products/:id`, `/wishlist`). |
| `src/services/api.js` | **File** | Labs 2-4 | **Axios API Service**: Configured with `withCredentials: true`. Exposes helper functions: `getProducts`, `getProductById`, `addToWishlist`, `getWishlist`, and `removeFromWishlist`. |
| `src/components/Navbar.jsx` | **File** | Labs 2-4 | **Header Navigation**: Navigation links (`Home | Products | Wishlist (N) | Logout`) featuring dynamic wishlist badge count. |
| `src/components/ProductCard.jsx` | **File** | Labs 3 & 4 | **Product Card UI**: Displays product thumbnail, info, price, stock badge, View Details button, and interactive Wishlist toggle button (`♡ Wishlist` / `⏳ Saving...` / `♥ Saved`). |
| `src/components/SearchBar.jsx` | **File** | Lab 03 | **Search & Filter Bar**: Controlled UI header with live search text input, category `<select>` filter, and price `<select>` sort dropdown. |
| `src/components/WishlistCard.jsx` | **File** | Lab 04 | **Wishlist Item Card**: Displays saved product image, title, category, price, stock availability, **View Details** button, and **Remove ♥** button. |
| `src/pages/Register.jsx` | **File** | Lab 02 | **Registration Page**: Controlled form collecting customer details (fullName, email, password, phone) posting to `/customers/register`. |
| `src/pages/Login.jsx` | **File** | Lab 02 | **Login Page**: Form collecting credentials posting to `/customers/login`. Upon success, redirects user to `/home`. |
| `src/pages/Home.jsx` | **File** | Lab 02 | **Protected User Dashboard**: Calls `GET /customers/me` on mount to display customer profile card. |
| `src/pages/Products.jsx` | **File** | Lab 03 | **Product Catalog Page**: Displays catalog grid, live search, category filter, and price sort dropdown. Handles **Loading**, **Error**, and **Empty** states. |
| `src/pages/ProductDetails.jsx` | **File** | Lab 03 | **Product Details View (`/products/:id`)**: Extracts `:id` using `useParams()`, fetches details from `GET /products/:id`, and renders full product view. |
| `src/pages/Wishlist.jsx` | **File** | Lab 04 | **Wishlist Page (`/wishlist`)**: Fetches `GET /wishlist`, renders dynamic wishlist cards, and manages **Loading**, **Empty** (`[ Browse Products ]`), and **Error** (`[ Try Again ]`) states. |

---

## 🔄 System Architecture & Data Flow Diagrams

### **1. Authentication & Cookie Session Flow (Labs 1 & 2)**
```text
[User] ──► Submits Form (/login) ──► POST /customers/login ──► Compare Hash (bcrypt)
                                                                       │
                                                                       ▼
[Browser] ◄── Set-Cookie: token=<JWT>; HttpOnly ◄── Generate Signed JWT (generateToken.js)
    │
    ▼ Navigates to /home
GET /customers/me (Cookie auto-attached) ──► auth.middleware.js (protect)
                                                   │
                                                   ▼
[User Dashboard] ◄── Return Customer Profile JSON ◄── Verify Signature & Find User
```

### **2. Product Catalog Search & Sorting Flow (Lab 03)**
```text
[User Types in SearchBar / Selects Category or Sort]
       │
       ▼ (State Change: search, category, sort)
  Products.jsx useEffect() Triggers
       │
       ▼ (Axios call with params)
  GET /products?search=keyboard&category=Electronics&sort=price_asc
       │
       ▼
  backend/routes/product.routes.js ──► product.controller.js (getAllProducts)
       │
       ▼ (Dynamic MongoDB Query)
  Product.find({ name: { $regex: 'keyboard', $options: 'i' }, category: 'Electronics' }).sort({ price: 1 })
       │
       ▼
  Returns JSON: { success: true, count: N, products: [...] } ──► Renders ProductCard Grid via .map()
```

### **3. Wishlist Data Lifecycle & Referencing Flow (Lab 04)**
```text
[User Clicks ♡ Wishlist on ProductCard]
       │
       ▼ (Calls Axios API Service)
  POST /wishlist/:productId (with HttpOnly JWT Cookie)
       │
       ▼
  backend/routes/wishlist.routes.js ──► auth.middleware.js (protects & attaches req.user)
       │
       ▼
  wishlist.controller.js (addToWishlist)
       ├─► Check duplicate: customer.wishlist.includes(productId) ──► Yes? Return 409 Conflict
       └─► No? customer.wishlist.push(productId) ──► Save in MongoDB ──► Return 200 OK
       │
       ▼
[User Navigates to /wishlist]
       │
       ▼
  GET /wishlist ──► Customer.findById(userId).populate({ path: 'wishlist', select: 'name price category image stock' })
       │
       ▼
  Returns JSON: { success: true, count: N, wishlist: [ { _id: "...", name: "...", price: ... } ] }
       │
       ▼
  Wishlist.jsx renders WishlistCard Grid dynamically via .map()
```

---

## 🌐 API Reference Documentation

### **Customer Authentication Endpoints (`/customers`)**

| HTTP Method | Endpoint | Access | Request Payload | Success Status | Description |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `POST` | `/customers/register` | Public | `{ fullName, email, password, phone }` | `201 Created` | Registers customer & hashes password via bcrypt. |
| `POST` | `/customers/login` | Public | `{ email, password }` | `200 OK` | Verifies password & sets `HttpOnly` JWT cookie. |
| `GET` | `/customers/me` | Protected | None *(Cookies auto-sent)* | `200 OK` | Returns authenticated customer profile data. |
| `POST` | `/customers/logout` | Protected | None | `200 OK` | Clears `HttpOnly` token cookie. |

---

### **Product Catalog Endpoints (`/products`)**

| HTTP Method | Endpoint | Access | Query Parameters / Body | Success Status | Description |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `POST` | `/products` | Public | `{ name, description, price, category, image, stock }` | `201 Created` | Inserts a new product into MongoDB collection. |
| `GET` | `/products` | Public | `search`, `category`, `sort` | `200 OK` | Returns products matching search regex, category, & price sort order. |
| `GET` | `/products/:id` | Public | Path variable `:id` | `200 OK` | Returns single product details by MongoDB ObjectId. |

---

### **Wishlist Endpoints (`/wishlist`) — Lab 04**

#### 1. Add Product to Wishlist
- **Method & Endpoint**: `POST /wishlist/:productId`
- **Access**: Protected *(Requires valid JWT cookie)*
- **Response (`200 OK`)**:
  ```json
  { "success": true, "message": "Product added to wishlist" }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid auth cookie.
  - `400 Bad Request`: Invalid MongoDB product ID format.
  - `404 Not Found`: Product does not exist in database.
  - `409 Conflict`: Product already exists in user's wishlist.

#### 2. Get Current User's Wishlist
- **Method & Endpoint**: `GET /wishlist`
- **Access**: Protected *(Requires valid JWT cookie)*
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 2,
    "wishlist": [
      {
        "_id": "66d123abc456...",
        "name": "Mechanical Keyboard",
        "price": 2999,
        "category": "Electronics",
        "image": "https://images.unsplash.com/...",
        "stock": 15
      }
    ]
  }
  ```

#### 3. Remove Product from Wishlist
- **Method & Endpoint**: `DELETE /wishlist/:productId`
- **Access**: Protected *(Requires valid JWT cookie)*
- **Response (`200 OK`)**:
  ```json
  { "success": true, "message": "Product removed from wishlist" }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Not authenticated.
  - `400 Bad Request`: Invalid product ID format.
  - `404 Not Found`: Product is not present in user's wishlist.

