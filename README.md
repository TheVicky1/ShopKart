# ShopKart — Full-Stack Customer Portal & Authentication System 🛒

> **Production-grade decoupled full-stack application featuring a Node.js, Express 5 & MongoDB backend paired with a React 19 & Vite 8 frontend, implementing secure JWT authentication stored in `HttpOnly` cookies.**

[![React Version](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev)
[![Vite Version](https://img.shields.io/badge/Vite-8.2.2-646CFF?logo=vite)](https://vite.dev)
[![Express Version](https://img.shields.io/badge/Express-5.2.1-000000?logo=express)](https://expressjs.com)
[![MongoDB Version](https://img.shields.io/badge/MongoDB-9.9.4-47A248?logo=mongodb)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)

---

## 📌 What is ShopKart?

**ShopKart** is an open-source full-stack customer authentication and product catalog platform. Designed around security best practices, ShopKart isolates authentication tokens inside `HttpOnly` browser cookies, preventing client-side script access (`document.cookie`) and mitigating Cross-Site Scripting (XSS) attacks. The platform seamlessly integrates customer registration, login verification, protected profile sessions, product catalog browsing, and session invalidation.

---

## ✨ Key Features

- 🔐 **Secure JWT Session Management**: Tokens signed with 1-day expiration and delivered via `HttpOnly` cookies.
- 🔑 **Bcrypt Password Security**: Passwords hashed using bcrypt (10 salt rounds) prior to storage; omitted from queries (`.select('-password')`).
- 🛡️ **Protected Route Middleware**: Server-side Express middleware (`auth.middleware.js`) verifying token signature before returning protected profile data.
- 🛍️ **E-Commerce Product Catalog**: Search, filter by category, view product stock status, and inspect detailed product views.
- ⚛️ **React 19 Controlled Components**: Responsive forms managed via `useState`, client-side routing via React Router 7, and component lifecycle handlers.
- 🌐 **Automated Axios Cookie Delivery**: Configured with `withCredentials: true` for automatic cross-origin cookie transmission.

---

## 🏗️ Architecture & Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer Browser
    participant React as React 19 SPA (Frontend:5173)
    participant Axios as Axios Service (withCredentials)
    participant Express as Express 5 API (Backend:5000)
    participant AuthMW as auth.middleware.js
    participant Mongo as MongoDB Database

    %% Registration
    Customer->>React: Fill /register Form
    React->>Axios: POST /customers/register {fullName, email, password, phone}
    Axios->>Express: Send JSON Payload
    Express->>Mongo: Save Customer with Bcrypt Hashed Password
    Mongo-->>Express: Return Customer Record
    Express-->>Customer: 201 Created

    %% Login
    Customer->>React: Fill /login Form
    React->>Axios: POST /customers/login {email, password}
    Axios->>Express: Send Credentials
    Express->>Mongo: Find Customer by email
    Express->>Express: Verify Bcrypt Hash & Sign JWT
    Express-->>Customer: 200 OK + Set-Cookie: token (HttpOnly, maxAge=1d)

    %% Profile Verification
    Customer->>React: Navigate to /home
    React->>Axios: GET /customers/me
    Axios->>Express: Send GET with HttpOnly Cookie
    Express->>AuthMW: Verify JWT Token
    AuthMW->>Mongo: Fetch Profile (.select('-password'))
    Express-->>Customer: 200 OK {fullName, email, phone}
    Customer->>React: Render Welcome Dashboard

    %% Logout
    Customer->>React: Click Logout
    React->>Axios: POST /customers/logout
    Express-->>Customer: 200 OK + Clear Cookie
    Customer->>React: Redirect to /login
```

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend Runtime** | [Node.js](https://nodejs.org) | Asynchronous JavaScript runtime environment |
| **Backend Framework** | [Express 5.2](https://expressjs.com) | RESTful API server framework |
| **Database & ODM** | [MongoDB](https://mongodb.com) / [Mongoose 9.9](https://mongoosejs.com) | NoSQL document database & ODM schema modeling |
| **Auth & Encryption** | `bcrypt`, `jsonwebtoken`, `cookie-parser` | Salted password hashing, JWT signing, cookie parsing |
| **Frontend Framework** | [React 19.2](https://react.dev) | UI component library with hooks (`useState`, `useEffect`) |
| **Build Tooling** | [Vite 8.2](https://vite.dev) | Lightning-fast HMR dev server & production bundler |
| **Client Routing** | [React Router 7.18](https://reactrouter.com) | Client-side page navigation & protected route redirects |
| **HTTP Client** | [Axios 1.20](https://axios-http.com) | HTTP client configured with `withCredentials: true` |
| **Static Analysis** | [Oxlint 1.79](https://oxc.rs) | High-speed JavaScript/JSX code linter |

---

## 📂 Project Structure

```text
ShopKart/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md         # Standardized bug reporting form
│   │   └── feature_request.md    # Feature proposal template
│   ├── workflows/
│   │   └── ci.yml                # Automated backend & frontend GitHub Actions CI
│   ├── CODEOWNERS                # Maintainer code ownership definitions
│   ├── PULL_REQUEST_TEMPLATE.md  # Contributor PR submission checklist
│   └── dependabot.yml            # Automated dependency update configuration
├── docs/
│   ├── GETTING_STARTED.md        # Step-by-step setup and local running guide
│   ├── ARCHITECTURE.md           # Sequence flow, module breakdown & database schema
│   ├── DEVELOPMENT.md            # Developer commands, linting & build scripts
│   ├── CONTRIBUTING.md           # Contributor guidelines and workflow
│   ├── SECURITY.md               # Session security safeguards & vulnerability reporting
│   └── FAQ.md                    # Frequently asked technical questions
├── backend/
│   ├── controllers/
│   │   ├── customer.controller.js # Auth request handlers (register, login, me, logout)
│   │   └── product.controller.js  # Product catalog request handlers
│   ├── middlewares/
│   │   └── auth.middleware.js     # JWT cookie verification middleware
│   ├── models/
│   │   ├── customer.model.js      # Customer Mongoose schema
│   │   └── product.model.js       # Product Mongoose schema
│   ├── routes/
│   │   ├── customer.routes.js     # Customer endpoint routes
│   │   └── product.routes.js      # Product endpoint routes
│   ├── utils/
│   │   └── generateToken.js       # JWT signing & HttpOnly cookie configuration
│   ├── .env.example               # Backend environment configuration template
│   ├── index.js                   # Express server entry point & MongoDB connection
│   └── package.json               # Backend dependencies & scripts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── ProductCard.jsx    # Product card preview component
│   │   │   └── SearchBar.jsx      # Product search & category filter bar
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Protected profile page (/home)
│   │   │   ├── Login.jsx          # Customer login page (/login)
│   │   │   ├── ProductDetails.jsx # Detailed product view (/products/:id)
│   │   │   ├── Products.jsx       # Product catalog page (/products)
│   │   │   └── Register.jsx       # Registration page (/register)
│   │   ├── services/
│   │   │   └── api.js             # Axios instance with withCredentials: true
│   │   ├── App.jsx                # Router configuration
│   │   ├── index.css              # Global application styles
│   │   └── main.jsx               # React DOM entry point
│   ├── .oxlintrc.json             # Oxlint linter rules
│   ├── index.html                 # Single Page Application HTML shell
│   ├── package.json               # Frontend dependencies & scripts
│   └── vite.config.js             # Vite bundler configuration
├── .env.example                   # Unified repository environment reference
├── .gitignore                     # Git tracking exclusions
├── LICENSE                        # MIT License
└── README.md                      # Project landing documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB server on `mongodb://127.0.0.1:27017` or Atlas cloud URI.

### Quickstart

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheVicky1/ShopKart.git
   cd ShopKart
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   node index.js
   ```
   *(Server starts on `http://localhost:5000`)*.

3. **Frontend Setup**:
   Open a second terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *(Frontend app starts on `http://localhost:5173`)*.

---

## 📡 API Reference

All customer endpoints are mounted under `/customers`.

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/customers/register` | `POST` | Public | Registers a new customer account |
| `/customers/login` | `POST` | Public | Verifies credentials & sets `HttpOnly` JWT cookie |
| `/customers/me` | `GET` | Protected | Returns authenticated user profile data |
| `/customers/logout` | `POST` | Protected | Clears `HttpOnly` cookie and invalidates session |
| `/products` | `GET` | Public | Returns product catalog with search & category filters |
| `/products/:id` | `GET` | Public | Returns individual product details |

---

## 📖 Documentation Architecture

Explore deeper technical guides in the [`docs/`](docs/) directory:

- 🏎️ **[Getting Started Guide](docs/GETTING_STARTED.md)** — Installation & environment setup.
- 📐 **[Architecture Overview](docs/ARCHITECTURE.md)** — Sequence flow, database schema & component design.
- 💻 **[Development Guide](docs/DEVELOPMENT.md)** — Commands, linting, and build optimization.
- 🤝 **[Contributing Guidelines](docs/CONTRIBUTING.md)** — Contribution workflow and PR checklist.
- 🔒 **[Security Policy](docs/SECURITY.md)** — Session security safeguards & vulnerability reporting.
- ❓ **[FAQ](docs/FAQ.md)** — Technical FAQ and viva preparation notes.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](docs/CONTRIBUTING.md) to get started.

---

## 🔒 Security

For vulnerability disclosures and cookie policy details, view our [Security Policy](docs/SECURITY.md).

---

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
