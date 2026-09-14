# Getting Started with ShopKart

Welcome to **ShopKart** — a full-stack Customer Authentication & Product Management system built with Node.js, Express 5, MongoDB / Mongoose, React 19, and Vite 8.

This guide provides step-by-step instructions for installing, configuring, and running both the backend server and frontend client locally.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher (Node.js 20+ recommended)
- **npm**: `v9.0.0` or higher (bundled with Node.js)
- **MongoDB**: Local MongoDB Community Edition instance running on `mongodb://127.0.0.1:27017` OR a MongoDB Atlas cloud connection URI.

Verify Node.js and npm versions:

```bash
node -v
npm -v
```

---

## Quickstart Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TheVicky1/ShopKart.git
cd ShopKart
```

---

### 2. Backend Setup (`/backend`)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create the backend environment configuration file:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Ensure `.env` contains:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/shopkart
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```
   *The server will connect to MongoDB and start listening on `http://localhost:5000`.*

---

### 3. Frontend Setup (`/frontend`)

1. Open a second terminal window and navigate to the frontend directory:
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

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## Testing the End-to-End User Flow

1. Navigate to `http://localhost:5173/register`.
2. Fill out the registration form with your Full Name, Email, Password, and Phone Number.
3. Upon registration success, you will be automatically redirected to `/login`.
4. Log in with your registered credentials. The backend verifies password hashes using `bcrypt` and issues a signed JWT token inside an `HttpOnly` cookie.
5. You will be redirected to the protected `/home` page, which fetches user profile details from `GET /customers/me`.
6. Click **Logout** in the navigation bar to execute `POST /customers/logout`, clear the authentication cookie, and redirect to `/login`.
