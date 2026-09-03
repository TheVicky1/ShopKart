# ShopKart — Full-Stack Customer Authentication System

A simple, beginner-friendly full-stack web application for **ShopKart**, featuring a **Node.js, Express & MongoDB backend** (Lab 01) integrated with a **React (Vite) frontend** (Lab 02). Implements secure customer registration, login, protected home profile access, and logout using JSON Web Tokens (JWT) stored in `HttpOnly` cookies.

---

## Project Overview

ShopKart Customer Authentication System provides an end-to-end authentication flow:
* **Node.js & Express.js**: RESTful web server framework.
* **MongoDB & Mongoose**: Document database and Object Data Modeling (ODM).
* **React & React Router DOM**: Client-side single-page application (SPA) with controlled form components and routing.
* **Axios API Service**: Configured with `withCredentials: true` to seamlessly transmit authentication cookies.
* **JWT & HttpOnly Cookie Storage**: Secure session management protecting tokens from client-side script access (`document.cookie`).
* **Protected Routes**: `/home` verifies the authenticated customer via `GET /customers/me` on component load.

---

## Tech Stack

### Backend (Lab 01)
* **Runtime**: Node.js
* **Framework**: Express.js (`^5.2.1`)
* **Database & ODM**: MongoDB / Mongoose (`^9.9.4`)
* **Security & Auth**: bcrypt (`^6.0.0`), jsonwebtoken (`^9.0.3`), cookie-parser (`^1.4.7`), cors (`^2.8.6`)
* **Environment**: dotenv (`^17.4.2`)

### Frontend (Lab 02)
* **Framework**: React (`^19.2.8`) via Vite (`^8.2.2`)
* **Routing**: React Router DOM (`^7.18.3`)
* **HTTP Client**: Axios (`^1.20.0`)
* **Styling**: Vanilla CSS

---

## Project Structure

```text
ShopKart/
├── .gitignore
├── README.md
├── LICENSE
├── backend/
│   ├── controllers/
│   │   └── customer.controller.js  # Request handlers & authentication logic
│   ├── middlewares/
│   │   └── auth.middleware.js      # JWT verification middleware for protected routes
│   ├── models/
│   │   └── customer.model.js       # Customer database schema definition
│   ├── routes/
│   │   └── customer.routes.js      # Customer API route definitions
│   ├── utils/
│   │   └── generateToken.js        # JWT signing utility
│   ├── .env                        # Local environment configuration (git-ignored)
│   ├── .env.example                # Environment variable reference template
│   ├── index.js                    # Express server entry point & MongoDB connection
│   └── package.json                # Backend dependencies and scripts
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx          # Top navigation bar with ShopKart logo, Home link & Logout
    │   ├── pages/
    │   │   ├── Register.jsx        # Registration form (/register)
    │   │   ├── Login.jsx           # Login form (/login)
    │   │   └── Home.jsx            # Protected customer profile page (/home)
    │   ├── services/
    │   │   └── api.js              # Axios instance configured with withCredentials: true
    │   ├── App.jsx                 # Main application router setup
    │   ├── index.css               # Global application styling
    │   └── main.jsx                # React DOM entry point
    ├── index.html                  # HTML template
    ├── vite.config.js              # Vite configuration
    └── package.json                # Frontend dependencies and scripts
```

---

## Setup & Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/TheVicky1/ShopKart.git
cd ShopKart
```

---

### 2. Backend Setup (Lab 01)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create the environment configuration file:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Ensure `.env` contains:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/shopkart
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```
   *(Server will connect to MongoDB and run on `http://localhost:5000`)*.

---

### 3. Frontend Setup (Lab 02)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(Frontend app will run on `http://localhost:5173`)*.

---

## Application User Flow

```text
Registration Flow:
/register → Fill Form (Name, Email, Password, Phone) → POST /customers/register → Redirect to /login

Login Flow:
/login → Enter Credentials → POST /customers/login → Backend sets HttpOnly 'token' cookie → Redirect to /home

Protected Home Flow:
/home → GET /customers/me (with Cookie) → Backend verifies JWT → Returns Profile Data → Render Welcome Card
(If unauthenticated or 401 error → Redirect to /login)

Logout Flow:
Click Logout → POST /customers/logout → Backend clears 'token' cookie → Redirect to /login
```

---

## API Documentation

All backend customer endpoints are prefixed with `/customers`.

### 1. Customer Registration
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/register`
* **Access**: Public
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

---

### 2. Customer Login
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/login`
* **Access**: Public
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

---

### 3. Get Authenticated Profile
* **HTTP Method**: `GET`
* **Endpoint**: `/customers/me`
* **Access**: Protected (Requires valid `token` cookie)
* **Success Response (`200 OK`)**:
  ```json
  {
    "_id": "66d3a1b2c3d4e5f6a7b8c9d0",
    "fullName": "Vicky Patel",
    "email": "vicky@example.com",
    "phone": "9876543210",
    "createdAt": "2026-09-03T07:14:48.355Z"
  }
  ```

---

### 4. Customer Logout
* **HTTP Method**: `POST`
* **Endpoint**: `/customers/logout`
* **Access**: Protected
* **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
  *(Clears the `token` cookie).*

---

## Security Practices Implemented

* **Bcrypt Password Hashing**: Passwords are saved as bcrypt hashes using a salt factor of 10 (`bcrypt.hash()`). Plain-text passwords are never stored.
* **Password Exclusion**: Passwords are excluded from database queries and API responses (`.select('-password')`).
* **HttpOnly Cookie Storage**: JWT tokens are sent via `res.cookie('token', token, { httpOnly: true, maxAge: 86400000 })`. `httpOnly: true` prevents client-side scripts from reading session tokens, defending against XSS attacks.
* **No Client Token Storage**: Frontend does not store JWT tokens in `localStorage` or `sessionStorage`.
* **CORS Credentials Configuration**: Backend enables CORS with `origin: true` and `credentials: true`, allowing cross-origin cookie authentication.
* **Protected Routes Guard**: Express `auth.middleware.js` verifies the JWT cookie on protected endpoints (`/customers/me`, `/customers/logout`).
* **Environment Protection**: `.env` containing database secrets is ignored by Git (`.gitignore`).

---

## Viva & Learning Notes

* **What is React?**: A JavaScript library for building component-based user interfaces.
* **Controlled Components**: Form elements whose values are tied to React state (`useState`) and updated via input handlers (`onChange`).
* **`useState`**: React hook for maintaining local component state (e.g. form inputs, error messages, user details).
* **`useEffect`**: React hook for executing side effects (e.g. calling `GET /customers/me` when the Home page mounts).
* **`useNavigate`**: React Router hook used for client-side navigation between pages (e.g., redirecting to `/login` after register or logout).
* **`withCredentials: true`**: Axios setting that ensures cross-origin requests send cookies along with HTTP requests.
* **Why use HttpOnly Cookies over `localStorage`?**: `localStorage` is accessible by any client-side JavaScript, exposing tokens to Cross-Site Scripting (XSS). `HttpOnly` cookies are unreadable by JavaScript (`document.cookie`), keeping session tokens secure.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
