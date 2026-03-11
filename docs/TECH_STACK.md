# ImpactLink — Tech Stack Reference

**Version:** 1.0  
**Last Updated:** March 2026  

---

## Architecture Overview

ImpactLink is a **MERN-stack** web application with additional infrastructure for job queuing, email delivery, error monitoring, and structured logging. The frontend is decoupled from the backend and communicates entirely via a REST API.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                               │
│         React 19 + Vite  ·  Framer Motion + GSAP            │
│         React Router v7  ·  Axios  ·  Recharts              │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTPS / REST API
┌─────────────────────────────▼───────────────────────────────┐
│                      API SERVER                             │
│           Node.js + Express.js (CommonJS)                   │
│   Helmet · Rate Limiter · Mongo Sanitize · Morgan           │
└──────────┬──────────────────┬───────────────┬──────────────┘
           │                  │               │
┌──────────▼───┐   ┌──────────▼────┐   ┌─────▼──────────────┐
│   MongoDB    │   │     Redis     │   │   Razorpay API     │
│  (Mongoose)  │   │   (BullMQ)    │   │  (Payments)        │
└──────────────┘   └──────────┬────┘   └────────────────────┘
                              │
                   ┌──────────▼────┐
                   │  Email Worker │
                   │  (Nodemailer) │
                   └───────────────┘
```

---

## Frontend

### Core
| Package | Version | Role |
|---|---|---|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | DOM rendering |
| `react-router-dom` | ^7.2.0 | Client-side routing |
| `vite` | ^6.1.0 | Build tool & dev server |

### Data Fetching
| Package | Version | Role |
|---|---|---|
| `axios` | ^1.8.1 | HTTP client with interceptors |

### Animations
| Package | Version | Role |
|---|---|---|
| `framer-motion` | ^12.34.4 | Declarative animations & layout transitions |
| `gsap` | ^3.14.2 | Timeline-based imperative animations |
| `@gsap/react` | ^2.1.2 | GSAP React hooks integration |

### UI & Styling
| Package | Version | Role |
|---|---|---|
| `bootstrap` | ^5.3.3 | Base grid & utility classes |
| `lucide-react` | ^0.576.0 | Feather-style icon set |
| `react-icons` | ^5.5.0 | Extended icon library (Font Awesome, etc.) |
| `react-toastify` | ^11.0.5 | Toast notification system |

### Data Visualisation
| Package | Version | Role |
|---|---|---|
| `recharts` | ^3.7.0 | Chart components for dashboard stats |

### Build & Linting
| Package | Version | Role |
|---|---|---|
| `@vitejs/plugin-react` | ^4.3.4 | Vite React plugin (Babel transform) |
| `eslint` | ^9.19.0 | Static code analysis |
| `eslint-plugin-react` | ^7.37.4 | React-specific lint rules |
| `eslint-plugin-react-hooks` | ^5.0.0 | Hooks lint rules |

---

## Backend

### Core
| Package | Version | Role |
|---|---|---|
| `express` | ^4.21.2 | HTTP server & routing |
| `dotenv` | ^16.4.7 | Environment variable loading |
| `envalid` | ^8.1.1 | Env variable validation at startup |
| `express-async-handler` | ^1.2.0 | Async error propagation wrapper |

### Database
| Package | Version | Role |
|---|---|---|
| `mongoose` | ^8.11.0 | MongoDB ODM with schema validation |

### Authentication
| Package | Version | Role |
|---|---|---|
| `jsonwebtoken` | ^9.0.2 | JWT signing & verification |
| `bcryptjs` | ^3.0.2 | Password hashing (salt rounds ≥ 10) |

### Security
| Package | Version | Role |
|---|---|---|
| `helmet` | ^8.1.0 | HTTP security headers (CSP, HSTS, etc.) |
| `express-rate-limit` | ^8.2.1 | IP-based rate limiting |
| `express-mongo-sanitize` | ^2.2.0 | NoSQL injection prevention |
| `cors` | ^2.8.5 | Cross-Origin Resource Sharing |

### Payments
| Package | Version | Role |
|---|---|---|
| `razorpay` | ^2.9.6 | Payment order creation & signature verification |

### Email & Job Queue
| Package | Version | Role |
|---|---|---|
| `nodemailer` | ^8.0.1 | SMTP email delivery |
| `bullmq` | ^5.70.4 | Redis-backed job queue for async email |
| `ioredis` | ^5.10.0 | Redis client |

### Scheduling
| Package | Version | Role |
|---|---|---|
| `node-cron` | ^4.2.1 | Cron-based scheduled tasks (campaign status updates) |

### Logging & Monitoring
| Package | Version | Role |
|---|---|---|
| `winston` | ^3.19.0 | Structured application logging |
| `morgan` | ^1.10.1 | HTTP request logging (streams to Winston) |
| `@sentry/node` | ^10.43.0 | Real-time error tracking & performance |
| `@sentry/tracing` | ^7.120.4 | Distributed tracing |

### Dev Tools
| Package | Version | Role |
|---|---|---|
| `nodemon` | ^3.1.9 | Hot reload in development |

---

## Infrastructure & Deployment

| Service | Provider | Notes |
|---|---|---|
| **Frontend Hosting** | [Vercel](https://vercel.com/) | `vercel.json` configured for SPA routing |
| **Backend Hosting** | [Render](https://render.com/) | `render.yaml` configured with env var definitions |
| **Database** | [MongoDB Atlas](https://cloud.mongodb.com/) | M0 free tier or higher |
| **Job Queue / Cache** | [Redis Cloud](https://redis.com/) / [Upstash](https://upstash.com/) | Redis 6+ required for BullMQ |
| **Error Monitoring** | [Sentry](https://sentry.io/) | DSN set via `SENTRY_DSN` env var |
| **Email Delivery** | Gmail SMTP / Any SMTP | Configured via `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` |

---

## Key Design Decisions

### Why Razorpay instead of Stripe?
Razorpay is purpose-built for the Indian market and natively supports UPI, which is the dominant payment method in India. This provides frictionless donations for the primary target demographic.

### Why BullMQ for emails?
Email delivery via SMTP can be slow or unreliable. By queuing email jobs in Redis and processing them in a worker, the API response is never blocked by email latency or SMTP failures.

### Why JWT with refresh tokens?
Short-lived access tokens reduce the risk surface of token theft. Refresh tokens stored in the database can be explicitly revoked on logout, preventing token replay attacks.

### Why Vite over Create React App?
Vite uses native ES modules for near-instant HMR and produces significantly faster production builds than webpack-based CRA. React 19 also requires a modern build toolchain.

### Why separate Admin model?
Admin authentication is completely decoupled from the regular user auth flow. This ensures privilege escalation via the user model is not possible, and admin credentials can be managed independently.
