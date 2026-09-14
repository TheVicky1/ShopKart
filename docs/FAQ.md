# Frequently Asked Questions (FAQ)

### What is ShopKart?
**ShopKart** is a full-stack e-commerce customer portal and authentication system featuring a Node.js + Express backend, MongoDB database, and React 19 + Vite frontend.

### Why does ShopKart use HttpOnly Cookies instead of `localStorage` for JWT tokens?
`localStorage` is unencrypted and readable by any client-side JavaScript script, making stored tokens vulnerable to Cross-Site Scripting (XSS) attacks. `HttpOnly` cookies are unreadable by JavaScript (`document.cookie`), preventing client scripts from stealing session tokens.

### How does Axios transmit authentication cookies?
In [`frontend/src/services/api.js`](../frontend/src/services/api.js), the Axios instance is configured with `withCredentials: true`. This causes the browser to automatically include the `HttpOnly` session cookie with every HTTP request sent to `http://localhost:5000`.

### What technology stack is used?
- **Backend**: Node.js, Express 5, MongoDB / Mongoose, bcrypt, jsonwebtoken, cookie-parser, CORS.
- **Frontend**: React 19, Vite 8, React Router 7, Axios, Oxlint, Vanilla CSS.
