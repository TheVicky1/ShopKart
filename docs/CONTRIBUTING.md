# Contributing to ShopKart

Thank you for your interest in contributing to **ShopKart**! We welcome bug fixes, feature proposals, documentation improvements, and API enhancements.

---

## Code of Conduct

Please maintain a supportive, inclusive, and collaborative atmosphere. Respect all contributors regardless of experience level.

---

## How to Contribute

### 1. Identify or Create an Issue
Before starting work, browse existing [GitHub Issues](https://github.com/TheVicky1/ShopKart/issues) or submit a new issue to discuss your planned changes.

### 2. Fork & Create a Feature Branch
Fork the repository and create a descriptive feature branch off `main`:

```bash
git checkout -b feature/my-new-feature
```

### 3. Make & Validate Changes
Implement your changes and run validation scripts:

```bash
# In frontend directory:
npm run lint
npm run build
```

### 4. Commit Message Conventions
Use clear, descriptive commit messages:
- `feat: add refresh token rotation`
- `fix: correct cookie maxAge calculation`
- `docs: update setup guide`

### 5. Submit a Pull Request
Push your branch to GitHub and open a Pull Request targeting `main`. Fill in the [Pull Request Template](../.github/PULL_REQUEST_TEMPLATE.md).
