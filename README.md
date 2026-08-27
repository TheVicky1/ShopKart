# ShopKart — Customer Authentication Service (Backend Engineering Lab 01)

This project is a simple, beginner-friendly customer authentication backend for **ShopKart**, developed using Node.js, Express, and MongoDB. It implements secure customer registration, login with JSON Web Tokens (JWT), and HttpOnly cookie storage for secure authenticated session management.

---

## 1. Project Folder Structure

The project follows a standard Model-View-Controller (MVC) style architecture:

```text
backend/
│
├── controllers/
│   └── customer.controller.js  # Contains request handling and business logic
│
├── models/
│   └── customer.model.js       # Defines the Customer database structure and schema
│
├── routes/
│   └── customer.routes.js      # Maps URL endpoints to specific controller functions
│
├── middlewares/
│   └── auth.middleware.js      # Verifies JWT authentication cookies for protected routes
│
├── utils/
│   └── generateToken.js        # Helper utility to sign and generate JWT tokens
│
├── index.js                    # Main server entry point, database connection, and middleware setup
└── .env                        # Stores environment-specific variables (port, secrets, URIs)
```

---

## 2. Setup and Execution

To run this project locally, follow these steps:

### Step 1: Install Dependencies
Run the following command inside the `backend` folder to download all required npm packages:
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a file named `.env` in the `backend/` root directory and add the following configuration placeholders:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
*(Note: Never commit your real connection string or secret keys to version control.)*

### Step 3: Start the Server
Run the application using Node:
```bash
node index.js
```

---

## 3. Database Schema Design (Mongoose)

The `Customer` document fields are defined inside `models/customer.model.js`:

* **`fullName`** (`String`): Required.
* **`email`** (`String`): Required, must be unique.
* **`password`** (`String`): Required, stored as a secure bcrypt hash.
* **`phone`** (`String`): Required, stored as a String to preserve leading zeros.
* **`createdAt`** (`Date`): Automatically defaults to the current date/time (`Date.now`).

### Important Security Rule:
**Plain-text passwords are NEVER stored in MongoDB.** During registration, the plain-text password is put through `bcrypt.hash()` to create a secure one-way hash, which is then saved in the database.

---

## 4. API Endpoints

### 1. Register Customer
* **Method**: `POST`
* **Route**: `/customers/register`
* **Description**: Registers a new customer after checking that all fields are filled, the password has at least 6 characters, and the email does not already exist. It hashes the password before writing to the database and returns user details without the password.
* **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@gmail.com",
    "password": "john123",
    "phone": "9876543210"
  }
  ```
* **HTTP Status Codes**:
  * `201 Created` → Successful registration.
  * `400 Bad Request` → Missing required field or password shorter than 6 characters.
  * `409 Conflict` → Email address already registered.
  * `500 Internal Server Error` → Database or server error.

---

### 2. Customer Login
* **Method**: `POST`
* **Route**: `/customers/login`
* **Description**: Authenticates an existing customer. Compares the plain-text password with the database hash using `bcrypt.compare()`. Upon success, it signs a JWT, stores it in an `HttpOnly` cookie named `token`, and returns a login confirmation message.
* **Request Body**:
  ```json
  {
    "email": "john@gmail.com",
    "password": "john123"
  }
  ```
* **HTTP Status Codes**:
  * `200 OK` → Successful login (and cookie created).
  * `400 Bad Request` → Missing email or password in request body.
  * `401 Unauthorized` → Invalid email or password.
  * `500 Internal Server Error` → Database or server error.

> [!NOTE]
> For security, the login handler returns a generic "Invalid email or password" error for both unregistered emails and incorrect passwords to prevent user enumeration attacks.

---

### 3. Customer Profile
* **Method**: `GET`
* **Route**: `/customers/me`
* **Description**: Retreives the logged-in customer's profile details. This route is **protected** and requires a valid JWT in the HTTP cookie headers.
* **Request Body**: None (requires cookie)
* **HTTP Status Codes**:
  * `200 OK` → Successful retrieval.
  * `401 Unauthorized` → Missing, expired, or tampered token cookie.
* **Returned JSON**:
  ```json
  {
    "_id": "64d0...",
    "fullName": "John Doe",
    "email": "john@gmail.com",
    "phone": "9876543210",
    "createdAt": "2026-08-27T08:50:00.000Z"
  }
  ```
  *(Note: The database password hash is completely excluded from this response.)*

---

### 4. Customer Logout
* **Method**: `POST`
* **Route**: `/customers/logout`
* **Description**: Clears the customer session by deleting the authentication cookie. This route is **protected** by the auth middleware as per lab requirements.
* **HTTP Status Codes**:
  * `200 OK` → Cookie cleared and successfully logged out.
  * `401 Unauthorized` → No active session token found.

---

## 5. End-to-End Authentication Flow

1. **Registration**: 
   `Client` → `register endpoint` → validates fields → `bcrypt.hash()` password → saves to `MongoDB`.
2. **Login**: 
   `Client` → `login endpoint` → finds user by email → `bcrypt.compare()` → `jwt.sign()` ID payload → sets `HttpOnly` cookie.
3. **Protected Request**: 
   `Client` sends request with cookie → `protect middleware` reads cookie → `jwt.verify()` signature → extracts ID → queries `Customer.findById()` → attaches user to `req.user` → calls `next()` → `getMyProfile` controller sends `req.user` details.
4. **Logout**: 
   `Client` sends logout request → `protect middleware` checks access → `logoutCustomer` controller runs → clears `token` cookie.

---

## 6. JWT and Cookie Concepts

### What is JWT (JSON Web Token)?
A JWT is a compact, URL-safe token used to represent secure session claims between a client and a server. It consists of three parts:
1. **Header**: Contains the algorithm used to sign the token (e.g., HMAC SHA256).
2. **Payload**: Contains encoded data claims (in this project, only the customer's MongoDB `_id`).
3. **Signature**: Cryptographically signs the token using the server's `JWT_SECRET` key to ensure it hasn't been tampered with.

> [!IMPORTANT]
> The JWT payload is only Base64 encoded, **not encrypted**. Anyone can decode it. Therefore, we never store sensitive data like passwords or hashes inside the JWT payload.

---

## 7. Security Implementations

* **Password Hashing (bcrypt)**: Plain-text passwords are never stored in the database. Bcrypt is used to hash them securely, safeguarding user credentials against database leaks.
* **HttpOnly Cookie**: The JWT is stored inside a cookie marked `httpOnly: true`. This prevents client-side JavaScript (e.g., `document.cookie`) from reading the token, mitigating Cross-Site Scripting (XSS) attacks.
* **Generic Login Failure**: We return a generic "Invalid email or password" error rather than disclosing whether the email or password was wrong to prevent enumeration.

---

## 8. Manual Postman Testing Guideline

We use Postman to send API requests and inspect responses:
1. **Successful Register**: Send a `POST` to `/customers/register` with all JSON parameters. Check for a `201` status and ensure the password field is missing.
2. **Duplicate Email**: Try registering again with the same email. Ensure it fails with a `409` status code.
3. **Missing Field**: Remove the `"fullName"` parameter and send registration. Ensure it returns `400`.
4. **Successful Login**: Send a `POST` to `/customers/login` with correct details. Check for `200` status and verify that the `token` cookie was added with `HttpOnly` checked in the Cookies tab.
5. **Incorrect Password**: Send login with a bad password. Check for `401`.
6. **Access Profile**: Send a `GET` to `/customers/me`. Ensure it returns `200` and displays the correct user details without password.
7. **Profile Without Token**: Clear the `token` cookie in Postman and send a `GET` to `/customers/me`. Ensure it returns `401`.
8. **Successful Logout**: Send a `POST` to `/customers/logout`. Verify you receive a `200` status code and that the cookie is removed.
9. **Access Profile After Logout**: Call `GET` to `/customers/me` after logout. Check that it yields `401`.

---

## 9. Key Viva Concepts

* **MVC**: Architecture splitting the application into: **Model** (Database definition), **View** (Client interfaces / API Responses), and **Controller** (Business logic).
* **Express**: A fast, minimal web application framework for Node.js.
* **Middleware**: Functions that intercept request/response cycles before hitting controllers (e.g., body parser, cookie parser, auth guard).
* **req.body**: Contains key-value data sent in the request body, parsed via `express.json()`.
* **req.cookies**: Contains parsed cookies, populated via `cookieParser()`.
* **next()**: Middleware callback instructing Express to pass execution control to the next handler.
* **Mongoose Schema**: Defines the structural blueprint and rules for documents in a MongoDB collection.
* **Mongoose Model**: Compiled schema wrapper providing database CRUD methods (like `.find()`, `.create()`).
* **bcrypt.hash()**: Cryptographically hashes plain text passwords using a salt.
* **bcrypt.compare()**: Compares incoming plain text against database hashes in a secure manner.
* **JWT**: Stateless token structure verifying client identity.
* **jwt.sign()**: Method that creates and signs a new token.
* **jwt.verify()**: Method that decodes and validates a token's signature.
* **HttpOnly Cookie**: Browser cookie blocked from JavaScript access (defends against XSS).
* **req.user**: Custom request attribute used to carry authenticated database user profiles across middlewares.
* **res.clearCookie()**: Express method sending an expired cookie headers to delete it from the browser.
* **HTTP Status Codes**:
  * `200` (OK), `201` (Created).
  * `400` (Bad Request), `401` (Unauthorized), `409` (Conflict).
  * `500` (Internal Server Error).
