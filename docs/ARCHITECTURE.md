# System Architecture & Technical Design

This document details the software architecture, authentication security flow, component hierarchy, database schema, and API contracts of **ShopKart**.

---

## Technical Overview

ShopKart follows a decoupled client-server architecture. The frontend is a React Single Page Application (SPA) built with Vite, communicating asynchronously with a Node.js / Express REST API server using Axios.

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer Browser
    participant React as React SPA (Frontend:5173)
    participant Axios as Axios API Service
    participant Express as Express Server (Backend:5000)
    participant AuthMW as auth.middleware.js
    participant Mongo as MongoDB Database

    %% Registration
    Customer->>React: Fill /register form
    React->>Axios: POST /customers/register {fullName, email, password, phone}
    Axios->>Express: Transmit JSON Payload
    Express->>Mongo: Check existing & save bcrypt hashed password
    Mongo-->>Express: Return Customer Document
    Express-->>Customer: 201 Created {success: true, customer}

    %% Login
    Customer->>React: Fill /login form
    React->>Axios: POST /customers/login {email, password}
    Axios->>Express: Transmit Credentials
    Express->>Mongo: Query Customer by email
    Mongo-->>Express: Customer Record
    Express->>Express: bcrypt.compare(password, hash) & Sign JWT
    Express-->>Customer: 200 OK + Set-Cookie: token (HttpOnly, SameSite=Lax, maxAge=1d)

    %% Protected Route
    Customer->>React: Navigate to /home
    React->>Axios: GET /customers/me (Browser auto-attaches HttpOnly Cookie)
    Axios->>Express: HTTP GET with Cookie
    Express->>AuthMW: Extract & jwt.verify(cookie.token)
    AuthMW->>Mongo: Find Customer by ID (.select('-password'))
    Mongo-->>AuthMW: Return Clean Profile
    AuthMW-->>Express: Attach req.customer
    Express-->>Customer: 200 OK {fullName, email, phone, createdAt}
    Customer->>React: Render Profile Card

    %% Logout
    Customer->>React: Click Logout Button
    React->>Axios: POST /customers/logout
    Express-->>Customer: 200 OK + Set-Cookie: token=; Expires=Epoch
    Customer->>React: Redirect to /login
```

---

## Backend Component Boundaries

| Module | File Path | Primary Responsibility |
| :--- | :--- | :--- |
| **Server Entry Point** | [`backend/index.js`](../backend/index.js) | Initializes Express 5 server, sets up CORS credentials and `cookie-parser`, connects to MongoDB via Mongoose. |
| **Auth Controller** | [`backend/controllers/customer.controller.js`](../backend/controllers/customer.controller.js) | Contains `registerCustomer`, `loginCustomer`, `getCustomerProfile`, and `logoutCustomer` logic. |
| **Auth Middleware** | [`backend/middlewares/auth.middleware.js`](../backend/middlewares/auth.middleware.js) | Extracts JWT from `req.cookies.token`, verifies signature, and attaches decoded customer data to `req.customer`. |
| **Token Generator** | [`backend/utils/generateToken.js`](../backend/utils/generateToken.js) | Signs JWT payloads using `JWT_SECRET` with 1-day expiration and writes `HttpOnly` cookie. |
| **Customer Model** | [`backend/models/customer.model.js`](../backend/models/customer.model.js) | Defines MongoDB Mongoose schema with field validations and indexes. |

---

## Database Schema Design

### Collection: `customers`

```typescript
interface ICustomer {
  _id: mongoose.Types.ObjectId; // Auto-generated Object ID
  fullName: string;              // Required, trimmed string
  email: string;                 // Required, lowercase, unique, trimmed
  password: string;              // Required, bcrypt hash (salt rounds = 10)
  phone: string;                 // Required, trimmed string
  createdAt: Date;               // Mongoose timestamp
  updatedAt: Date;               // Mongoose timestamp
}
```

#### Index Strategy
- **`email`**: Unique index enforced at MongoDB level to prevent duplicate account registration.

---

## Frontend Architecture

- **Axios Credentials Configuration**: [`frontend/src/services/api.js`](../frontend/src/services/api.js) configures `axios.create({ baseURL: 'http://localhost:5000', withCredentials: true })` ensuring every HTTP request automatically transmits `HttpOnly` authentication cookies without storing sensitive tokens in `localStorage`.
- **Protected Routing**: [`frontend/src/pages/Home.jsx`](../frontend/src/pages/Home.jsx) executes `GET /customers/me` on component mount. If the server returns `401 Unauthorized`, the router redirects the client to `/login`.
