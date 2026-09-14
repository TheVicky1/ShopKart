# Development Guide

This document covers developer workflows, npm scripts, code formatting standards, and testing procedures for **ShopKart**.

---

## Workspace Setup

Ensure you have completed workspace initialization as described in [GETTING_STARTED.md](GETTING_STARTED.md).

```bash
git clone https://github.com/TheVicky1/ShopKart.git
cd ShopKart
```

---

## Available Scripts

### Backend (`/backend`)

Run these commands inside the `backend/` folder:

- **`node index.js`**: Launches the Express server and establishes a connection to MongoDB (`mongodb://127.0.0.1:27017/shopkart`).

---

### Frontend (`/frontend`)

Run these commands inside the `frontend/` folder:

- **`npm run dev`**: Starts the local Vite development server with Hot Module Replacement (HMR) at `http://localhost:5173`.
- **`npm run build`**: Compiles and bundles production static assets into `frontend/dist/`.
- **`npm run lint`**: Runs `oxlint` static code analysis across JavaScript and React JSX files.
- **`npm run preview`**: Serves the compiled production build from `dist/` locally.

---

## Code Quality Standards

- **Static Analysis**: All frontend code must pass `npm run lint` with 0 warnings or errors.
- **Error Handling**: Use structured `try-catch` blocks and return informative JSON error objects from backend API endpoints (`{ success: false, message: '...' }`).
- **Security Scoping**: Passwords must always be hashed using `bcrypt` prior to saving to MongoDB, and excluded from queries using `.select('-password')`.
