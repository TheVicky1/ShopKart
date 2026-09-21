# ShopKart — Full-Stack E-Commerce Application

![ShopKart Banner](https://img.shields.io/badge/ShopKart-FullStack%20E--Commerce-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)
![ExpressJS](https://img.shields.io/badge/Express.js-v5.0-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-v19-cyan?style=for-the-badge&logo=react)

**ShopKart** is a full-stack e-commerce web application built progressively across engineering labs. It features secure customer authentication using **JSON Web Tokens (JWT)** stored in `HttpOnly` cookies, a dynamic **Product Discovery and Catalog System**, and a persistent **Wishlist Experience** powered by **MongoDB ObjectId Referencing** and **Mongoose `populate()`**.

---

## 📋 Table of Contents
- [Project Overview & Evolution](#-project-overview--evolution)
- [Tech Stack](#-tech-stack)
- [File & Directory Architecture Breakdown](#-file--directory-architecture-breakdown)
  - [Root Level](#1-root-directory)
  - [Backend Directory Structure](#2-backend-directory-backend)
  - [Frontend Directory Structure](#3-frontend-directory-frontend)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [API Reference Documentation](#-api-reference-documentation)
  - [Customer Auth Endpoints](#customer-authentication-endpoints-customers)
  - [Product Catalog Endpoints](#product-catalog-endpoints-products)
  - [Wishlist Endpoints (Lab 04)](#wishlist-endpoints-wishlist)
- [Setup & Installation Instructions](#-setup--installation-instructions)
- [🎓 Comprehensive Viva Examination Preparation Guide (60 Questions)](#-comprehensive-viva-examination-preparation-guide-60-questions)

---

## 🚀 Project Overview & Evolution

ShopKart is developed across modular engineering labs to replicate real-world enterprise software development practices:

- **Lab 01 — Customer Auth Backend**: Modeled database schemas using **Mongoose**, implemented password hashing with **bcrypt**, generated **JWT tokens**, stored credentials securely using **`HttpOnly` cookies**, and built protected profile endpoints.
- **Lab 02 — Customer Auth Frontend**: Built a client-side Single Page Application (SPA) in **React (Vite)** with controlled components, client-side routing via **React Router DOM**, centralized API communication via **Axios**, and session persistence.
- **Lab 03 — Product Catalog & Discovery**: Developed full-stack product management capabilities with product creation, regex search, category filtering, price sorting (`price_asc`, `price_desc`), dynamic route product details (`/products/:id`), and user feedback states (**Loading**, **Error**, and **Empty** states).
- **Lab 04 — Wishlist Experience**: Implemented user-specific product wishlisting:
  - Extended `Customer` schema with MongoDB `ObjectId` array referencing `Product` (`ref: "Product"`).
  - Built protected REST APIs: `POST /wishlist/:productId` (with `409 Conflict` duplicate prevention), `GET /wishlist` (using Mongoose `.populate()`), and `DELETE /wishlist/:productId`.
  - Created a dynamic React Wishlist Page (`/wishlist`), Wishlist Card components, Navbar badge count, and UI states (**Loading**, **Empty** with `[ Browse Products ]`, and **Error** with `[ Try Again ]`).

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

| File / Folder Path | Type | Purpose & Overview |
| :--- | :---: | :--- |
| `index.js` | **File** | **Server Entry Point**: Initializes Express application, CORS policy (`withCredentials: true`), JSON/cookie parsers, MongoDB connection with In-Memory fallback, database seeding, and mounts `/customers`, `/products`, and `/wishlist` routes. |
| `models/customer.model.js` | **File** | **Customer Schema**: Defines fields for `fullName`, `email` (unique), `password`, `phone`, and `wishlist` array storing `mongoose.Schema.Types.ObjectId` references pointing to `Product`. |
| `models/product.model.js` | **File** | **Product Schema**: Defines `name`, `description`, `price` (`min: 0.01`), `category`, `image`, `stock` (`min: 0`), and `createdAt` timestamp. |
| `controllers/wishlist.controller.js` | **File** | **Wishlist Business Logic**: `addToWishlist` (validates ID, checks duplicate `409`, appends reference), `getWishlist` (uses `.populate()` to fetch full product objects), and `removeFromWishlist` (filters out product reference from customer array). |
| `routes/wishlist.routes.js` | **File** | **Wishlist Routes**: Maps `POST /:productId`, `GET /`, and `DELETE /:productId` protected by `protect` authentication middleware. |
| `middlewares/auth.middleware.js` | **File** | **Auth Middleware (`protect`)**: Reads `req.cookies.token`, verifies JWT, attaches customer object to `req.user`, or rejects unauthorized calls with HTTP `401`. |

---

### 2. Frontend Directory (`frontend/`)

| File / Folder Path | Type | Purpose & Overview |
| :--- | :---: | :--- |
| `src/services/api.js` | **File** | **Axios Service**: Exports `getProducts`, `getProductById`, `addToWishlist`, `getWishlist`, and `removeFromWishlist`. |
| `src/components/ProductCard.jsx` | **File** | **Product Card UI**: Renders product thumbnail, details, and interactive Wishlist toggle button (`♡ Wishlist` / `⏳ Saving...` / `♥ Saved`). |
| `src/components/WishlistCard.jsx` | **File** | **Wishlist Item Card**: Renders saved product image, category, price, stock status, **View Details** button, and **Remove ♥** button. |
| `src/components/Navbar.jsx` | **File** | **Navigation Bar**: Header links (`Home | Products | Wishlist | Logout`) with a dynamic wishlist count badge (`Wishlist (N)`). |
| `src/pages/Products.jsx` | **File** | **Catalog Page**: Displays product grid, live search input, category filter, and price sort dropdown. |
| `src/pages/Wishlist.jsx` | **File** | **Wishlist Page**: Displays saved products grid. Handles **Loading** (`"Loading your wishlist..."`), **Empty** (`"Your wishlist is empty ❤️"` + `[ Browse Products ]`), and **Error** (`"Unable to load wishlist."` + `[ Try Again ]`) states. |
| `src/App.jsx` | **File** | **Application Router**: Mounts `/login`, `/register`, `/home`, `/products`, `/products/:id`, and `/wishlist`. |

---

## 🔄 System Architecture & Data Flow

### **Wishlist Data Flow (Lab 04)**
```text
[User Clicks ♡ Wishlist on ProductCard]
       │
       ▼ (Calls Axios API Service)
  POST http://localhost:5000/wishlist/:productId (with HttpOnly Cookie)
       │
       ▼
  backend/routes/wishlist.routes.js ──► auth.middleware.js (protects & sets req.user)
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
  GET http://localhost:5000/wishlist ──► Customer.findById(userId).populate('wishlist')
       │
       ▼
  Returns JSON: { success: true, count: N, wishlist: [ { name: "...", price: ... } ] }
       │
       ▼
  Wishlist.jsx renders WishlistCard Grid dynamically via .map()
```

---

## 🌐 API Reference Documentation

### **Wishlist Endpoints (`/wishlist`) — Lab 04**

#### 1. Add Product to Wishlist
- **Method & Endpoint**: `POST /wishlist/:productId`
- **Access**: Protected *(Requires valid JWT cookie)*
- **Response (`200 OK`)**:
  ```json
  { "success": true, "message": "Product added to wishlist" }
  ```
- **Failure Status Codes**:
  - `401 Unauthorized`: Not authenticated.
  - `400 Bad Request`: Invalid MongoDB product ID format.
  - `404 Not Found`: Product does not exist.
  - `409 Conflict`: Product is already in the user's wishlist.

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
- **Failure Status Codes**:
  - `401 Unauthorized`: Not authenticated.
  - `400 Bad Request`: Invalid product ID format.
  - `404 Not Found`: Product is not present in the user's wishlist.

---

## ⚡ Setup & Installation Instructions

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/TheVicky1/ShopKart.git
cd ShopKart/backend
npm install
cd ../frontend
npm install
```

### 2. Start Backend Server
```bash
cd backend
node index.js
```
*(Runs on `http://localhost:5000` with automatic in-memory MongoDB fallback and product seeding)*

### 3. Start Frontend Dev Server
```bash
cd frontend
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 🎓 Comprehensive Viva Examination Preparation Guide (60 Questions)

### **Lab 04 Wishlist Specific Viva Questions**

#### Q1: Why are we storing Product ObjectIds in the Wishlist array instead of full Product objects?
> **Answer:** Storing references (`ObjectId`) maintains **Normalized Data Modeling**. The `Product` collection remains the single source of truth. If a product's price, stock, title, or image changes in the database, the user's wishlist automatically reflects the updated data without duplicating or syncing stale data across user documents.

#### Q2: What does `ref: "Product"` in `customer.model.js` do?
> **Answer:** `ref: "Product"` tells Mongoose which model to associate with the stored `ObjectId`s. This enables Mongoose to perform query population (`.populate('wishlist')`) to dynamically swap out `ObjectId` strings with their full `Product` documents during query execution.

#### Q3: What is the difference between Database Embedding and Referencing in MongoDB?
> **Answer:**
> - **Embedding**: Storing child data directly inside the parent document as a sub-document array. Best for 1-to-few relationships where child data is private to the parent and doesn't change independently.
> - **Referencing**: Storing `ObjectId` pointers to another collection. Best for 1-to-many or many-to-many relationships where referenced entities are shared across the system and updated independently (like Products in an E-commerce catalog).

#### Q4: Why do we use Mongoose `.populate()` in `getWishlist`?
> **Answer:** `.populate({ path: 'wishlist', select: 'name price category image stock' })` instructs Mongoose to execute a secondary lookup behind the scenes, resolving the array of `ObjectId` references stored in `customer.wishlist` into actual `Product` document objects before returning the final JSON response to the client.

#### Q5: Why should wishlist API endpoints never accept `userId` from the request body or URL path (`/wishlist/:userId`)?
> **Answer:** Accepting `userId` from the client introduces a severe security vulnerability (**IDOR - Insecure Direct Object Reference**). A malicious user could pass someone else's `userId` and view or alter another customer's private wishlist. The backend must always extract user identity securely from `req.user._id` populated by the `protect` JWT authentication middleware.

#### Q6: How are duplicate wishlist entries prevented in the backend?
> **Answer:** Before adding a product to the user's wishlist, the controller checks if the product ID already exists in the `customer.wishlist` array using `customer.wishlist.some(id => id.toString() === productId)`. If present, the API immediately halts execution and returns an HTTP `409 Conflict` status code.

#### Q7: What HTTP status code should be returned when trying to add a duplicate wishlist item?
> **Answer:** HTTP `409 Conflict`. It indicates that the request cannot be processed because it conflicts with the current state of the resource (i.e. item already exists in the wishlist collection).

#### Q8: Why does the Wishlist page need to fetch saved products from the backend instead of relying on frontend state?
> **Answer:** The wishlist is a **persistent user feature**. If we only stored wishlist items in local React component state, saved items would be wiped clean whenever the user refreshes the page, switches devices, or logs in from another browser. Fetching from the backend ensures data persistence across sessions.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
