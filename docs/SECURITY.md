# Security Policy for ShopKart

Security and session safety are foundational principles of the ShopKart platform.

---

## Supported Versions

Security fixes are actively applied to the `main` branch.

| Version | Supported |
| :--- | :--- |
| `1.0.0` (main branch) | :white_check_mark: Yes |
| Older commits / forks | :x: No |

---

## Reporting a Vulnerability

If you discover a security vulnerability in ShopKart, please **DO NOT** open a public issue.

Report vulnerabilities directly to the maintainer:
- **Maintainer**: `@TheVicky1` via GitHub.

Include:
- Summary of the vulnerability
- Reproduction steps or proof of concept
- Affected components or API endpoints

---

## Session Security Safeguards

- **`HttpOnly` Cookie Storage**: JWT tokens are issued with `httpOnly: true`. This prevents client-side JavaScript (`document.cookie`) from reading session tokens, mitigating Cross-Site Scripting (XSS) credential theft.
- **Bcrypt Salt Factor**: User passwords are saved as bcrypt hashes using 10 salt rounds. Plain-text passwords are never logged or stored.
- **Password Exclusion**: Database queries explicitly exclude password hashes (`.select('-password')`).
- **CORS Credentials Control**: Cross-origin requests require explicit origin matching and `credentials: true`.
