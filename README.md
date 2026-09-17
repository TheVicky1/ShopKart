# ShopKart — Full-Stack E-Commerce Application

![ShopKart Banner](https://img.shields.io/badge/ShopKart-FullStack%20E--Commerce-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)
![ExpressJS](https://img.shields.io/badge/Express.js-v5.0-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-v19-cyan?style=for-the-badge&logo=react)

**ShopKart** is a full-stack e-commerce web application built progressively across engineering labs. It features secure customer authentication using **JSON Web Tokens (JWT)** stored in `HttpOnly` cookies, coupled with a dynamic **Product Discovery and Catalog System** powered by a RESTful **Node.js/Express** backend and a responsive **React (Vite)** frontend.

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
- [Setup & Installation Instructions](#-setup--installation-instructions)
- [🎓 Comprehensive Viva Examination Preparation Guide (45 Questions)](#-comprehensive-viva-examination-preparation-guide-45-questions)
  - [Category 1: Web & REST API Architecture (Q1 – Q7)](#category-1-web--rest-api-architecture)
  - [Category 2: Backend Development & Express.js (Q8 – Q14)](#category-2-backend-development--expressjs)
  - [Category 3: MongoDB & Mongoose ODM (Q15 – Q22)](#category-3-mongodb--mongoose-odm)
  - [Category 4: Frontend Development & React Hooks (Q23 – Q32)](#category-4-frontend-development--react-hooks)
  - [Category 5: Authentication & Application Security (Q33 – Q38)](#category-5-authentication--application-security)
  - [Category 6: ShopKart Project Specific Logic (Q39 – Q45)](#category-6-shopkart-project-specific-logic)

---

## 🚀 Project Overview & Evolution

ShopKart is developed across modular engineering labs to replicate real-world enterprise software development practices:

- **Lab 01 — Customer Auth Backend**: Modeled database schemas using **Mongoose**, implemented password hashing with **bcrypt**, generated **JWT tokens**, stored credentials securely using **`HttpOnly` cookies**, and built protected profile endpoints.
- **Lab 02 — Customer Auth Frontend**: Built a client-side Single Page Application (SPA) in **React (Vite)** with controlled components, client-side routing via **React Router DOM**, centralized API communication via **Axios**, and session persistence.
- **Lab 03 — Product Catalog & Discovery**: Developed full-stack product management capabilities:
  - Backend `Product` schema validation, product creation API (`POST /products`), all products retrieval with dynamic search & category filtering (`GET /products`), and single product lookup (`GET /products/:id`).
  - Frontend Product Catalog listing page, real-time live Search Bar, Category Dropdown, dynamic card grid rendering via `.map()`, dynamic route product detail view (`/products/:id`), and user feedback states (**Loading**, **Error**, and **Empty** states).

---

## 🛠 Tech Stack

### **Backend Stack**
* **Runtime**: Node.js (v18+)
* **Framework**: Express.js (`v5.2.1`)
* **Database**: MongoDB (Local instance or Cloud Atlas)
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

The project follows a clean **Model-View-Controller (MVC)** design pattern on the backend and a modular **Component-Service-Page** architecture on the frontend.

```text
ShopKart/
├── backend/
│   ├── controllers/
│   │   ├── customer.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── customer.model.js
│   │   └── product.model.js
│   ├── routes/
│   │   ├── customer.routes.js
│   │   └── product.routes.js
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
    │   │   └── SearchBar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Products.jsx
    │   │   └── Register.jsx
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

### 1. Root Directory
- **`README.md`**: Project documentation, architectural overview, API reference, and comprehensive Viva preparation guide.
- **`LICENSE`**: Open-source license agreement (MIT License).
- **`.gitignore`**: Excludes environment secrets (`.env`), build output (`dist/`), and dependencies (`node_modules/`) from Git tracking.

---

### 2. Backend Directory (`backend/`)

| File / Folder Path | Type | Purpose & Overview |
| :--- | :---: | :--- |
| `index.js` | **File** | **Server Entry Point**: Initializes Express application, configures global CORS policy (`withCredentials: true`), JSON body parsers, cookie parser, connects to MongoDB via Mongoose, and mounts `/customers` and `/products` API routes. |
| `.env` | **File** | **Local Environment Secrets**: Contains database connection strings (`MONGO_URI`), server `PORT`, and JWT signing secret (`JWT_SECRET`). *(Git-ignored)* |
| `.env.example` | **File** | **Environment Template**: Reference file showing required secret keys for other developers setting up the backend. |
| `package.json` | **File** | **Backend Manifest**: Lists backend npm dependencies (`express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`, `dotenv`) and start scripts. |
| `controllers/` | **Folder** | Contains the core business logic and database interactions for HTTP request endpoints. |
| ├── `customer.controller.js` | **File** | Handlers for customer authentication: `registerCustomer` (password hashing & duplicate check), `loginCustomer` (password verification & JWT cookie setting), `getMyProfile` (fetching authenticated user data), and `logoutCustomer` (cookie clearing). |
| └── `product.controller.js` | **File** | Handlers for product catalog: `createProduct` (validates price/stock & inserts into DB), `getAllProducts` (dynamic MongoDB regex search & category match query), and `getProductById` (validates ObjectId & fetches single product details). |
| `models/` | **Folder** | Defines database collection schemas and validations using Mongoose. |
| ├── `customer.model.js` | **File** | Schema defining fields for `fullName`, `email` (unique), `password`, `phone`, and automatic `createdAt` timestamp. |
| └── `product.model.js` | **File** | Schema defining product fields: `name`, `description`, `price` (`min: 0.01`), `category`, `image`, `stock` (`min: 0`), and automatic `createdAt` timestamp. |
| `routes/` | **Folder** | Express Router definitions linking REST endpoints to controller functions. |
| ├── `customer.routes.js` | **File** | Route mapping for `/customers/register` (POST), `/customers/login` (POST), `/customers/me` (GET, protected), and `/customers/logout` (POST, protected). |
| └── `product.routes.js` | **File** | Route mapping for `/products` (POST create, GET list with filters) and `/products/:id` (GET single product by ID). |
| `middlewares/` | **Folder** | Custom Express middleware functions executed before controllers. |
| └── `auth.middleware.js` | **File** | **Authentication Middleware (`protect`)**: Reads `req.cookies.token`, verifies the JWT payload using `jwt.verify`, attaches the customer object to `req.user`, or rejects unauthorized requests with HTTP `401`. |
| `utils/` | **Folder** | Reusable helper functions across backend modules. |
| └── `generateToken.js` | **File** | Helper function that signs a JWT payload with the customer's `_id` and secret key, setting an expiration of 1 day (`1d`). |

---

### 3. Frontend Directory (`frontend/`)

| File / Folder Path | Type | Purpose & Overview |
| :--- | :---: | :--- |
| `index.html` | **File** | **HTML Entry Template**: Single Page Application container containing `<div id="root"></div>` where React renders components. |
| `vite.config.js` | **File** | **Vite Bundler Config**: Configures the React plugin and Vite development server options. |
| `package.json` | **File** | **Frontend Manifest**: Lists dependencies (`react`, `react-dom`, `react-router-dom`, `axios`) and build scripts (`dev`, `build`). |
| `src/main.jsx` | **File** | **React Mounting Point**: Renders the root `<App />` component into the DOM target using `ReactDOM.createRoot`. |
| `src/App.jsx` | **File** | **Application Router**: Sets up `BrowserRouter` and defines top-level route mappings (`/login`, `/register`, `/home`, `/products`, `/products/:id`). |
| `src/index.css` & `App.css` | **File** | **Styling System**: CSS tokens, CSS grid layouts, navbar styles, glassmorphism cards, search inputs, and responsive breakpoints. |
| `src/services/` | **Folder** | Encapsulates network logic and API requests. |
| └── `api.js` | **File** | **Axios Service Instance**: Configures base URL (`http://localhost:5000`) and enables `withCredentials: true` so HTTP cookies auto-attach to backend requests. Exposes `getProducts(params)` and `getProductById(id)`. |
| `src/components/` | **Folder** | Modular, reusable UI components. |
| ├── `Navbar.jsx` | **File** | Header navigation component containing ShopKart brand logo, page navigation links (`/home`, `/products`), and Logout button (triggers `POST /customers/logout`). |
| ├── `ProductCard.jsx` | **File** | Renders an individual product card showing thumbnail image, category badge, name, price, stock availability badge, and a "View Details" navigation button. |
| └── `SearchBar.jsx` | **File** | Controlled UI header component with a live text input for product search and a category `<select>` dropdown. |
| `src/pages/` | **Folder** | Main top-level page components bound to application routes. |
| ├── `Register.jsx` | **File** | Form page (`/register`) handling customer registration inputs (name, email, password, phone) and posting to `/customers/register`. |
| ├── `Login.jsx` | **File** | Form page (`/login`) collecting user credentials and sending `POST /customers/login`. Upon success, redirects user to `/home`. |
| ├── `Home.jsx` | **File** | Protected user dashboard (`/home`) that calls `GET /customers/me` on mount to display customer profile information. |
| ├── `Products.jsx` | **File** | Product Catalog page (`/products`). Manages `search`, `category`, `products`, `loading`, and `error` states. Triggers real-time API fetches via `useEffect` and displays Loading (`"Loading products..."`), Error (`"Something went wrong while loading products."`), and Empty (`"No products found."`) states. |
| └── `ProductDetails.jsx` | **File** | Dynamic Product Details page (`/products/:id`). Extracts `:id` using `useParams()`, fetches details from `GET /products/:id`, and renders full image, price, detailed description, and stock status. |

---

## 🔄 System Architecture & Data Flow

### **1. Customer Authentication Flow**
```text
[User] ──► Fill Form (/register) ──► POST /customers/register ──► Hash Password (bcrypt) ──► Save in MongoDB
[User] ──► Enter Credentials (/login) ──► POST /customers/login ──► Compare Hash ──► Generate JWT ──► Set HttpOnly Cookie
[User] ──► Navigate to /home ──► GET /customers/me (Cookie Auto-sent) ──► Auth Middleware Verifies JWT ──► Return Profile Data
[User] ──► Click Logout ──► POST /customers/logout ──► Express Clears Cookie ──► Redirect to /login
```

### **2. Product Discovery & Filter Flow**
```text
[User Types in SearchBar / Selects Category]
       │
       ▼ (State Update: search, category)
  Products.jsx useEffect() Triggers
       │
       ▼ (Axios call with params)
  GET http://localhost:5000/products?search=keyboard&category=Electronics
       │
       ▼
  backend/routes/product.routes.js ──► product.controller.js (getAllProducts)
       │
       ▼ (Dynamic MongoDB Query)
  Product.find({ name: { $regex: 'keyboard', $options: 'i' }, category: 'Electronics' })
       │
       ▼
  Returns JSON: { success: true, count: N, products: [...] }
       │
       ▼
  React updates `products` state ──► Renders ProductCard Grid via .map()
```

---

## 🌐 API Reference Documentation

### **Customer Authentication Endpoints (`/customers`)**

#### 1. Register Customer
- **Endpoint**: `POST /customers/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "fullName": "Vicky Patel",
    "email": "vicky@example.com",
    "password": "password123",
    "phone": "9876543210"
  }
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Customer registered successfully",
    "customer": { "_id": "66d3a1...", "fullName": "Vicky Patel", "email": "vicky@example.com", "phone": "9876543210" }
  }
  ```

#### 2. Login Customer
- **Endpoint**: `POST /customers/login`
- **Access**: Public
- **Request Body**: `{"email": "vicky@example.com", "password": "password123"}`
- **Response (`200 OK`)**: `{"success": true, "message": "Login successful"}` *(Attaches `HttpOnly` cookie named `token`)*

#### 3. Get Current Profile
- **Endpoint**: `GET /customers/me`
- **Access**: Protected *(Requires valid JWT cookie)*
- **Response (`200 OK`)**: Returns authenticated customer document excluding password.

#### 4. Logout Customer
- **Endpoint**: `POST /customers/logout`
- **Access**: Protected
- **Response (`200 OK`)**: Clears the `token` cookie.

---

### **Product Catalog Endpoints (`/products`)**

#### 1. Create Product
- **Endpoint**: `POST /products`
- **Access**: Public *(For lab scope)*
- **Request Body**:
  ```json
  {
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard with blue switches.",
    "price": 2999,
    "category": "Electronics",
    "image": "https://example.com/keyboard.jpg",
    "stock": 10
  }
  ```
- **Response (`201 Created`)**: Returns created product document.

#### 2. Get All Products (with Search & Category Filtering)
- **Endpoint**: `GET /products`
- **Query Parameters**:
  - `search` *(optional)*: Case-insensitive search on product name. Example: `/products?search=keyboard`
  - `category` *(optional)*: Exact match filter on category. Example: `/products?category=Electronics`
  - *Combined*: `/products?search=keyboard&category=Electronics`
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 2,
    "products": [
      {
        "_id": "66d123abc456...",
        "name": "Mechanical Keyboard",
        "price": 2999,
        "category": "Electronics",
        "image": "https://example.com/keyboard.jpg",
        "stock": 10
      }
    ]
  }
  ```

#### 3. Get Single Product by ID
- **Endpoint**: `GET /products/:id`
- **Access**: Public
- **Response (`200 OK`)**: Returns single product object. If invalid ID format returns `400 Bad Request`. If not found returns `404 Not Found`.

---

## ⚡ Setup & Installation Instructions

### 1. Clone Repository
```bash
git clone https://github.com/TheVicky1/ShopKart.git
cd ShopKart
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopkart
JWT_SECRET=shopkart_super_secret_jwt_key
```
Start backend server:
```bash
node index.js
```
*(Runs on `http://localhost:5000`)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 🎓 Comprehensive Viva Examination Preparation Guide (45 Questions)

This section contains **45 curated, high-yield Viva questions and detailed answers** structured across 6 core technical domains to ensure you ace your lab evaluation.

---

### Category 1: Web & REST API Architecture

#### Q1: What is a RESTful API and what are its main constraints?
> **Answer:** REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to perform CRUD operations on resources identified by URIs. Key constraints include statelessness (server stores no client context between requests), client-server separation, uniform interface, and resource-based endpoints.

#### Q2: What is the difference between HTTP request methods `GET`, `POST`, `PUT`, and `DELETE`?
> **Answer:**
> - `GET`: Retrieves data from the server without modifying database state (safe and idempotent).
> - `POST`: Submits new data to the server to create a resource.
> - `PUT`: Replaces an existing resource entirely or creates it if it doesn't exist.
> - `DELETE`: Removes a resource from the database.

#### Q3: What is the difference between URL Path Parameters and Query Parameters?
> **Answer:**
> - **Path Parameters (`/products/:id`)**: Used to uniquely identify a specific resource in the hierarchy.
> - **Query Parameters (`/products?category=Electronics&search=phone`)**: Appended after `?` to filter, sort, search, or paginate a collection of resources.

#### Q4: What do HTTP Status Codes 200, 201, 400, 401, 404, and 500 represent?
> **Answer:**
> - `200 OK`: Request succeeded.
> - `201 Created`: Resource successfully created (e.g., product or user registration).
> - `400 Bad Request`: Invalid client input or missing required fields.
> - `401 Unauthorized`: Authentication missing or invalid credentials.
> - `404 Not Found`: Requested resource or route does not exist.
> - `500 Internal Server Error`: Unhandled crash or error on the server side.

#### Q5: What is CORS and why is it necessary in web applications?
> **Answer:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making API requests to a domain different from the one that served the web page. In ShopKart, the frontend runs on port `5173` and the backend on port `5000`. Enabling CORS on the backend allows cross-origin HTTP requests and credentialed cookies to pass safely.

#### Q6: What does `withCredentials: true` do in Axios?
> **Answer:** By default, browsers do not include cookies in cross-origin HTTP requests. Setting `withCredentials: true` in Axios instructs the browser to automatically include cookies (such as our `HttpOnly` JWT session token) in requests sent to the backend.

#### Q7: What is JSON and why is it used for client-server communication?
> **Answer:** JSON (JavaScript Object Notation) is a lightweight, language-independent text format for data interchange. It is easy for humans to read/write and trivial for JavaScript applications to parse into native objects using `JSON.parse()` or `express.json()`.

---

### Category 2: Backend Development & Express.js

#### Q8: What is Node.js and how does its Event Loop work?
> **Answer:** Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. It uses a single-threaded, non-blocking, event-driven I/O model. The Event Loop continuously checks for asynchronous tasks (like database queries or network requests), delegates heavy work to worker threads, and executes callbacks upon completion without blocking the main execution thread.

#### Q9: What is Express.js middleware and how does the `next()` function operate?
> **Answer:** Middleware functions in Express have access to the request object (`req`), response object (`res`), and the next middleware function in the application’s request-response cycle (`next`). Middleware can execute code, modify request objects, end the cycle, or call `next()` to pass control to the subsequent middleware handler.

#### Q10: What is the Model-View-Controller (MVC) architectural pattern?
> **Answer:** MVC separates application logic into three interconnected components:
> - **Model**: Encapsulates data structure, database schema, and validation (`product.model.js`).
> - **View**: Renders UI components on the frontend (`Products.jsx`).
> - **Controller**: Processes incoming HTTP requests, interacts with Models, contains business logic, and sends HTTP responses (`product.controller.js`).

#### Q11: What does `express.json()` middleware do?
> **Answer:** It parses incoming request payloads with JSON formats and populates `req.body` with the parsed JavaScript object. Without it, `req.body` would be `undefined`.

#### Q12: Why do we use environment variables via `.env` and `dotenv`?
> **Answer:** Environment variables keep sensitive application secrets (like database credentials, port numbers, and JWT secrets) separate from source code. This prevents sensitive keys from being exposed in public version control repositories (Git).

#### Q13: What is `cookie-parser` middleware used for in Express?
> **Answer:** `cookie-parser` extracts cookie headers from incoming HTTP requests and populates `req.cookies` with an object keyed by cookie names, making it easy to access JWT tokens stored in cookies (`req.cookies.token`).

#### Q14: How does error handling work in async Express controller functions?
> **Answer:** Async controller functions wrap database calls in `try...catch` blocks. If an exception occurs, the `catch` block catches the error and returns a structured JSON response with an appropriate HTTP status code (e.g. 400 or 500) and error message, preventing the Express server process from crashing.

---

### Category 3: MongoDB & Mongoose ODM

#### Q15: What is MongoDB and how does it differ from relational SQL databases?
> **Answer:** MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents. Unlike SQL databases (which use rigid tables, rows, and foreign keys), MongoDB is schema-less by default, allows nested objects/arrays, and scales horizontally easily.

#### Q16: What is Mongoose and why do we use it with Node.js?
> **Answer:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model application data, enforce type casting, validate inputs, build queries, and declare hooks.

#### Q17: What is a Mongoose Schema vs. a Mongoose Model?
> **Answer:**
> - **Schema**: Defines the structural blueprint of documents within a collection (field names, types, default values, validators).
> - **Model**: A compiled wrapper around the schema that provides an interface to query, create, update, and delete documents in the MongoDB database (`Product.find()`, `Product.create()`).

#### Q18: How do Mongoose validations work in `product.model.js`?
> **Answer:** Validations enforce rules before saving a document to MongoDB:
> - `required: true`: Ensures a field must be provided.
> - `min: [0, '...']`: Ensures numerical values cannot drop below a minimum bound (e.g. stock cannot be negative, price must be > 0).

#### Q19: What is MongoDB `_id` and what type is it?
> **Answer:** `_id` is a 12-byte unique identifier automatically assigned by MongoDB to every document as a primary key. Its data type is `ObjectId` (a 24-character hexadecimal string containing timestamps, machine IDs, process IDs, and incrementing counters).

#### Q20: How do we search strings in MongoDB using Regular Expressions (`$regex`)?
> **Answer:** Mongoose queries can use MongoDB’s `$regex` operator for pattern matching. In `getAllProducts`, we pass `query.name = { $regex: safeSearch, $options: 'i' }` where `$options: 'i'` ensures the search is case-insensitive (e.g. "phone" matches "iPhone").

#### Q21: Why do we escape special regex characters in search strings?
> **Answer:** If a user inputs characters like `*`, `?`, `(`, or `+` in a search query, unescaped strings could break regex compilation or cause Regex Denial of Service (ReDoS). Escaping special characters (`search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`) ensures user input is treated as literal search text.

#### Q22: How does `mongoose.Types.ObjectId.isValid(id)` prevent backend application errors?
> **Answer:** Passing a malformed string (e.g., `"123"`) directly into `Product.findById()` causes Mongoose to throw a cast error exception. Validating the string format with `isValid(id)` first allows the controller to return a clean `400 Bad Request` response immediately.

---

### Category 4: Frontend Development & React Hooks

#### Q23: What is React and what are its core advantages?
> **Answer:** React is a component-based JavaScript library for building user interfaces. Key advantages include reusable UI components, unidirectional data flow, fast rendering via the Virtual DOM, and a rich ecosystem of hooks and tools.

#### Q24: What is the Virtual DOM and how does reconciliation work?
> **Answer:** The Virtual DOM is a lightweight in-memory representation of the real DOM. When component state changes, React creates a new Virtual DOM tree, compares it with the previous tree using a diffing algorithm ("reconciliation"), and updates only the specific changed nodes in the real browser DOM.

#### Q25: What is the difference between React State and Props?
> **Answer:**
> - **State**: Local data managed internally within a component that can change over time via updater functions (`useState`). State changes trigger component re-renders.
> - **Props (Properties)**: Immutable data passed down from a parent component to a child component to customize its rendering.

#### Q26: How does the `useState` hook work?
> **Answer:** `useState` declares a state variable in a functional component. It returns an array with two elements: the current state value and a setter function to update that value (e.g., `const [search, setSearch] = useState('')`). Calling the setter triggers a re-render.

#### Q27: How does the `useEffect` hook work and what is its dependency array?
> **Answer:** `useEffect` allows components to perform side effects (such as fetching API data). The dependency array controls when the effect runs:
> - **No array**: Runs after every single render.
> - **Empty array `[]`**: Runs once when the component mounts.
> - **`[search, category]`**: Runs on mount AND whenever `search` or `category` state values change.

#### Q28: How does `.map()` help render dynamic lists in React, and why is the `key` prop required?
> **Answer:** `.map()` iterates over an array of items and returns a JSX element for each item. The `key` prop (e.g., `key={product._id}`) provides a stable unique identity for each element, allowing React’s diffing algorithm to efficiently track, add, update, or remove items without re-rendering the entire list.

#### Q29: What is the role of React Router DOM (`BrowserRouter`, `Routes`, `Route`, `Link`)?
> **Answer:** React Router enables client-side routing in Single Page Applications without page reloads:
> - `BrowserRouter`: Provides HTML5 history API context.
> - `Routes` & `Route`: Matches current URL location to specific page components.
> - `Link`: Renders accessible navigation links without triggering full browser refreshes.

#### Q30: How does the `useParams` hook work in `ProductDetails.jsx`?
> **Answer:** `useParams` returns an object of key/value pairs of dynamic URL parameters defined in the `<Route path="/products/:id" />`. In `ProductDetails.jsx`, `const { id } = useParams()` extracts the product's MongoDB `_id` directly from the URL bar.

#### Q31: How does the `useNavigate` hook work?
> **Answer:** `useNavigate` returns a navigation function that allows developers to change routes programmatically in response to user actions (e.g., `navigate('/products/123')` when clicking "View Details" or `navigate('/login')` after logging out).

#### Q32: What are Controlled Components in React forms?
> **Answer:** Controlled components are form elements (`<input>`, `<select>`) whose displayed values are bound to React state (`value={search}`) and updated explicitly via event handlers (`onChange={(e) => setSearch(e.target.value)}`). This makes React state the single source of truth for form data.

---

### Category 5: Authentication & Application Security

#### Q33: How does JWT (JSON Web Token) authentication work?
> **Answer:** JWT is an open standard (RFC 7519) for transmitting information securely between parties as a JSON object. It consists of three parts: Header, Payload, and Signature. Upon login, the server signs a token containing the user's ID and sends it to the client. Subsequent requests present this token to prove identity.

#### Q34: Why store JWT in `HttpOnly` Cookies instead of `localStorage`?
> **Answer:** Data stored in `localStorage` is accessible to any JavaScript code running on the page (`document.cookie` or window execution context). If an application suffers a Cross-Site Scripting (XSS) vulnerability, malicious scripts can steal tokens from `localStorage`. `HttpOnly` cookies cannot be read or accessed by client-side JavaScript, rendering session tokens safe from XSS extraction.

#### Q35: How does `bcrypt` hash passwords safely?
> **Answer:** `bcrypt` is a password-hashing algorithm incorporating a salt (random data added to the password before hashing) and a configurable cost factor (work factor). It makes brute-force dictionary attacks computationally expensive. In ShopKart, we generate a salt with 10 rounds before hashing (`bcrypt.genSalt(10)`).

#### Q36: Why should passwords never be returned in API responses?
> **Answer:** Including hashed passwords in API payloads risks leaking sensitive credentials through network logs, browser caches, or client-side inspection tools. In Mongoose queries, we exclude passwords using `.select('-password')`.

#### Q37: What is Cross-Site Scripting (XSS) and how do we prevent it?
> **Answer:** XSS occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute malicious scripts in the victim's browser. Prevention includes using `HttpOnly` cookies for tokens, sanitizing user input, and relying on React's automatic JSX string escaping.

#### Q38: What is Cross-Site Request Forgery (CSRF)?
> **Answer:** CSRF is an attack where a malicious site tricks a user's browser into performing unwanted actions on a trusted site where the user is currently authenticated. Measures like strict CORS configuration, `SameSite` cookie attributes, and custom headers mitigate CSRF risks.

---

### Category 6: ShopKart Project Specific Logic

#### Q39: What are the three UI states implemented in `Products.jsx` and why are they important?
> **Answer:**
> 1. **Loading State (`"Loading products..."`)**: Displays visual feedback while waiting for async API response.
> 2. **Error State (`"Something went wrong while loading products."`)**: Displays clear error messages if backend connection fails or returns 500.
> 3. **Empty State (`"No products found."`)**: Displays informative feedback when search or category filters return 0 matching items (`products.length === 0`).

#### Q40: How does category filtering populate the dropdown dynamically in `Products.jsx`?
> **Answer:** `Products.jsx` maintains a default array of categories. When products are fetched from the API, it extracts all unique categories from the returned array (`Array.from(new Set([...prev, ...fetchedCats]))`) and updates the state, ensuring newly added backend categories appear automatically in the dropdown.

#### Q41: What happens if a product image URL fails to load in `ProductCard.jsx`?
> **Answer:** Both `ProductCard.jsx` and `ProductDetails.jsx` include an `onError` event handler on `<img>` elements (`onError={(e) => e.target.src = 'https://via.placeholder.com/...'}`). If an image URL is broken or blocked, it seamlessly falls back to a clean placeholder image without breaking UI layout.

#### Q42: How does `auth.middleware.js` protect backend endpoints?
> **Answer:** The `protect` middleware function reads `req.cookies.token`. If no cookie is present, it returns HTTP `401`. If present, it verifies the token signature using `jwt.verify(token, JWT_SECRET)`. If valid, it fetches the customer document from MongoDB, attaches it to `req.user`, and calls `next()`.

#### Q43: Why is product creation (`POST /products`) an open endpoint in Lab 03?
> **Answer:** In Lab 03, the focus is on mastering Product Schema modeling and dynamic GET querying. Role-Based Access Control (RBAC) and Admin authorization for product creation operations will be introduced in subsequent lab sessions.

#### Q44: Why separate `api.js` from component files?
> **Answer:** Creating a centralized Axios service instance in `services/api.js` encapsulates backend base URLs, timeout settings, and cookie header configurations in one file. If API endpoints or backend URLs change, only `api.js` needs modification, keeping UI components decoupled and clean.

#### Q45: How can product sorting by price be added to `GET /products`?
> **Answer:** In `product.controller.js`, parse `req.query.sort`. If `sort === 'price_asc'`, append `.sort({ price: 1 })` to the Mongoose query chain; if `sort === 'price_desc'`, append `.sort({ price: -1 })`. On the frontend, add a `<select>` dropdown in `SearchBar.jsx` to pass `sort` as a query parameter.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
