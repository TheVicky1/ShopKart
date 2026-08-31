# ShopKart — Customer Authentication Service

A simple, beginner-friendly Node.js, Express, and MongoDB backend for **ShopKart**, implementing customer authentication using JSON Web Tokens (JWT) and HttpOnly cookies. Built for Engineering Lab 01 / Web Development Lab.

---

## Project Overview

ShopKart Customer Authentication Service provides a complete authentication flow for online shoppers:
* **Node.js & Express.js**: RESTful web server framework.
* **MongoDB & Mongoose**: Document database and Object Data Modeling (ODM).
* **Customer Authentication System**: Registration, login, profile access, and logout.
* **JWT-Based Authentication**: Secure session identification using signed JSON Web Tokens.
* **HttpOnly Cookie Storage**: Cookie-based session management to protect against client-side script access.

---

## Tech Stack

* **Runtime Environment**: Node.js
* **Web Framework**: Express.js (`^5.2.1`)
* **Database & ODM**: MongoDB / Mongoose (`^9.9.4`)
* **Password Hashing**: bcrypt (`^6.0.0`)
* **Token Authentication**: jsonwebtoken (`^9.0.3`)
* **Cookie Parsing**: cookie-parser (`^1.4.7`)
* **Environment Configuration**: dotenv (`^17.4.2`)

---

## Project Structure

```text
ShopKart/
├── .gitignore
├── README.md
├── LICENSE
└── backend/
    ├── controllers/
    │   └── customer.controller.js  # Request handlers and business logic
    ├── middlewares/
    │   └── auth.middleware.js      # JWT authentication guard middleware
    ├── models/
    │   └── customer.model.js       # Customer database schema definition
    ├── routes/
    │   └── customer.routes.js      # Endpoint route definitions
    ├── utils/
    │   └── generateToken.js        # JWT generation helper utility
    ├── .env.example                # Environment variable template
    ├── index.js                    # Server entry point & DB connection
    ├── package.json                # Dependencies and project metadata
    └── package-lock.json           # Locked dependency tree
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ShopKart
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create Environment File
Create a `.env` file in the `backend/` directory by copying `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and configure your environment variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/?appName=ShopKart
JWT_SECRET=your_jwt_secret_key
```

> **Security Note**: Never commit your real `.env` file or database credentials to GitHub. The `.gitignore` file ensures `.env` stays local.

---

## How to Start the Backend

Run the server from the `backend` directory:
```bash
cd backend
node index.js
```

Upon starting, the server initializes the MongoDB connection and listens on the configured `PORT` (default: 5000).

---

## API Documentation

All customer routes are prefixed with `/customers`.

### 1. Register Customer
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/register`
* **Purpose**: Registers a new customer account.
* **Authentication Required**: No (Public)
* **Request Body**:
  ```json
  {
    "fullName": "Vicky Patel",
    "email": "vicky@example.com",
    "password": "password123",
    "phone": "9876543210"
  }
  ```
* **Success Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Customer registered successfully",
    "customer": {
      "_id": "66d3a1b2c3d4e5f6a7b8c9d0",
      "fullName": "Vicky Patel",
      "email": "vicky@example.com",
      "phone": "9876543210"
    }
  }
  ```
* **Error Responses**:
  * `400 Bad Request`: Missing required fields or password shorter than 6 characters.
  * `409 Conflict`: Email address is already registered.
  * `500 Internal Server Error`: Database error.

---

### 2. Customer Login
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/login`
* **Purpose**: Authenticates customer credentials and issues an HttpOnly cookie containing a JWT.
* **Authentication Required**: No (Public)
* **Request Body**:
  ```json
  {
    "email": "vicky@example.com",
    "password": "password123"
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Login successful"
  }
  ```
  *(Sets an `HttpOnly` cookie named `token` valid for 1 day).*
* **Error Responses**:
  * `400 Bad Request`: Missing email or password.
  * `401 Unauthorized`: Invalid email or password.
  * `500 Internal Server Error`: Database error.

---

### 3. Get Protected Profile
* **HTTP Method**: `GET`
* **Endpoint**: `/customers/me`
* **Purpose**: Retrieves the profile details of the logged-in customer.
* **Authentication Required**: Yes (Requires valid `token` cookie)
* **Request Body**: None
* **Success Response (`200 OK`)**:
  ```json
  {
    "_id": "66d3a1b2c3d4e5f6a7b8c9d0",
    "fullName": "Vicky Patel",
    "email": "vicky@example.com",
    "phone": "9876543210",
    "createdAt": "2026-08-31T08:50:00.000Z"
  }
  ```
* **Error Responses**:
  * `401 Unauthorized`: Missing, invalid, or expired JWT cookie, or user no longer exists.
  * `500 Internal Server Error`: Server error.

---

### 4. Customer Logout
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/logout`
* **Purpose**: Clears the authentication `token` cookie to log out the customer.
* **Authentication Required**: Yes (Requires valid `token` cookie)
* **Request Body**: None
* **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
* **Error Responses**:
  * `401 Unauthorized`: No active session token found.
  * `500 Internal Server Error`: Server error.

---

## Authentication Flow

```text
1. Registration Flow:
   Client Request → Register Endpoint → Validate Fields → Hash Password (bcrypt) → Save to MongoDB → Return User Details (No Password)

2. Login Flow:
   Client Request → Login Endpoint → Find User by Email → Verify Password (bcrypt.compare) → Generate JWT (jwt.sign) → Set HttpOnly Cookie → Return Success

3. Protected Request Flow:
   Client Request (with Cookie) → Auth Middleware → Read 'token' Cookie → Verify JWT (jwt.verify) → Extract ID → Query Customer.findById() → Attach to req.user → Controller Returns Profile

4. Logout Flow:
   Client Request → Auth Middleware (Verify Token) → Logout Controller → Clear 'token' Cookie (res.clearCookie) → Return Success
```

---

## Security Practices Implemented

* **Bcrypt Password Hashing**: Passwords are saved only as secure bcrypt hashes generated with a salt factor of 10 (`bcrypt.hash()`). Plain-text passwords are never stored.
* **Password Exclusion**: Plain-text passwords and hash strings are excluded from API responses (`.select('-password')`).
* **Minimal JWT Payload**: The JWT payload contains only the MongoDB user ID (`{ id: customer._id }`). No sensitive data is placed in the payload.
* **Environment-Based Secret**: The JWT signing key is loaded securely from `process.env.JWT_SECRET`.
* **Token Expiration**: JWT tokens expire after 24 hours (`1d`).
* **HttpOnly Cookie Storage**: The JWT token is sent via `res.cookie('token', token, { httpOnly: true, maxAge: 24*60*60*1000 })`. `httpOnly: true` prevents client-side JavaScript (`document.cookie`) from accessing the session token, mitigating Cross-Site Scripting (XSS) attacks.
* **Protected Routes Guard**: Sensitive endpoints (`/customers/me`, `/customers/logout`) are guarded by `auth.middleware.js`.
* **Git Security**: Sensitive `.env` files and `node_modules/` are ignored in `.gitignore`.

---

## MVC Architecture Overview

The backend uses a standard Model-View-Controller (MVC) organization:

* **Models (`models/customer.model.js`)**: Defines the data structure, data types, validation rules, and schema for MongoDB documents using Mongoose.
* **Controllers (`controllers/customer.controller.js`)**: Handles HTTP requests, executes business logic (field validation, hashing, database operations, cookie setting), and returns HTTP responses.
* **Routes (`routes/customer.routes.js`)**: Defines URL endpoints and maps them to their respective controller functions and middlewares.
* **Middlewares (`middlewares/auth.middleware.js`)**: Intercepts requests before controllers to perform authentication checks and populate `req.user`.
* **Utilities (`utils/generateToken.js`)**: Contains reusable helper functions (e.g., signing JWT tokens).

---

## Postman / API Testing Guide

### 1. Test Registration
* **POST** `http://localhost:5000/customers/register`
* **Headers**: `Content-Type: application/json`
* **Body (raw JSON)**:
  ```json
  {
    "fullName": "Vicky Patel",
    "email": "vicky@example.com",
    "password": "password123",
    "phone": "9876543210"
  }
  ```

### 2. Test Login
* **POST** `http://localhost:5000/customers/login`
* **Headers**: `Content-Type: application/json`
* **Body (raw JSON)**:
  ```json
  {
    "email": "vicky@example.com",
    "password": "password123"
  }
  ```
* **Verify**: In Postman, check the **Cookies** tab under the response pane to confirm that the `token` cookie was set with `HttpOnly` enabled.

### 3. Test Get Profile
* **GET** `http://localhost:5000/customers/me`
* **Verify**: Ensure the profile details return with status `200 OK` and exclude the password hash.

### 4. Test Logout
* **POST** `http://localhost:5000/customers/logout`
* **Verify**: Status `200 OK`. Then attempt `GET /customers/me` again to verify it now returns `401 Unauthorized`.

---

## Viva & Learning Notes

* **What is JWT?**: A JSON Web Token is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. It consists of Header, Payload, and Signature.
* **What are HttpOnly Cookies?**: A cookie attribute that restricts JavaScript from accessing the cookie via `document.cookie`. This helps defend against Cross-Site Scripting (XSS) attacks.
* **Why use bcrypt?**: Bcrypt is a salted password hashing function that introduces computational cost (work factor) to slow down brute-force and dictionary attacks.
* **What is Express Middleware?**: Functions that execute during the request-response lifecycle. Middleware functions can inspect/modify requests (`req`), send responses (`res`), or invoke `next()` to pass control forward.
* **What is Mongoose?**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships, schema validation, and database operations.
* **Why exclude password fields in responses?**: Returning password hashes exposes internal security mechanisms and increases risk during client-side data leaks or logging.

---

## Git & Version Control

* `.env` contains local environment variables and database credentials. It is listed in `.gitignore` and **must never be committed**.
* `node_modules/` contains downloaded package files and is ignored by Git.
* `.env.example` is committed as a reference template showing required variable names without disclosing actual secrets.

---

## Database Note

The application connects to MongoDB using the `MONGO_URI` environment variable defined in `.env`.
* **Local MongoDB**: `mongodb://127.0.0.1:27017/shopkart` (requires local MongoDB service running).
* **MongoDB Atlas**: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=ShopKart` (requires configured Atlas cluster, valid database user credentials, and current IP address added to Atlas Network Access whitelist).
