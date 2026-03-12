# ImpactLink — Crowdfunding Platform

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-072654?style=flat-square&logo=razorpay)](https://razorpay.com/)

**ImpactLink** is a full-stack crowdfunding web application that empowers individuals and organisations to launch campaigns, raise funds, and make a real-world impact — securely and at scale.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Getting Started](#-getting-started) · [API Overview](#-api-overview) · [Security](#-security) · [Deployment](#-deployment)

</div>

---

## ✨ Features

### For Users
- 🔐 **Secure Authentication** — JWT-based login, signup, password reset via email OTP, and token refresh
- 🚀 **Campaign Management** — Create, edit, and delete fundraising campaigns with rich details, goals, and deadlines
- 💳 **Integrated Payments** — Donate to campaigns via Razorpay (UPI, card, netbanking) with server-side payment verification
- 📊 **Personal Dashboard** — Track your campaigns, donations made, and funds raised in real time
- 👤 **User Profile & Settings** — Manage profile details, avatar, and account preferences
- 🔍 **Search & Filter** — Discover campaigns by category, goal, and progress

### For Admins
- 🛡️ **Admin Dashboard** — Overview of platform-wide statistics (users, campaigns, donations)
- 📋 **Campaign Moderation** — View and manage all campaigns across the platform
- 👥 **User Management** — View and manage registered users
- 📬 **Contact Submissions** — Review and respond to contact form messages

### Platform
- 📧 **Automated Email Notifications** — Transactional emails via Nodemailer with asynchronous processing via BullMQ + Redis
- 📅 **Scheduled Jobs** — Automated campaign status management via node-cron
- 📈 **Error Monitoring** — Real-time error tracking via Sentry (v10)
- 📝 **Structured Logging** — HTTP and application logs via Morgan + Winston

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Framer Motion + GSAP** | Animations & micro-interactions |
| **Axios** | HTTP client |
| **Recharts** | Data visualisation (dashboard charts) |
| **Lucide React + React Icons** | Icon libraries |
| **Bootstrap 5** | Component styling base |
| **React Toastify** | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | REST API server |
| **MongoDB + Mongoose** | Primary database (ODM) |
| **Redis + BullMQ** | Job queue for async email delivery |
| **JWT** | Authentication & session management |
| **Razorpay** | Payment gateway integration |
| **Nodemailer** | Transactional email delivery |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | Rate limiting (auth + general routes) |
| **express-mongo-sanitize** | NoSQL injection prevention |
| **Winston + Morgan** | Application & HTTP logging |
| **Sentry** | Real-time error tracking & performance |
| **node-cron** | Scheduled background jobs |
| **bcryptjs** | Password hashing |
| **envalid** | Environment variable validation |

---

## 📂 Project Structure

```
crowdfunding/
├── impactlink-frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── pages/                # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   ├── CampaignDetails.jsx
│   │   │   ├── CreateCampaign.jsx
│   │   │   ├── EditCampaign.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Donations.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminDonations.jsx
│   │   │   ├── Login.jsx / Signup.jsx
│   │   │   ├── ForgotPassword.jsx / ResetPassword.jsx
│   │   │   ├── About.jsx / Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── components/           # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── context/              # React Context providers (Auth, etc.)
│   │   ├── services/             # API service layer
│   │   ├── utils/                # Utility functions & Axios instance
│   │   └── assets/               # Static assets
│   ├── index.html
│   └── vite.config.js
│
├── impactlink-backend/           # Node.js + Express REST API
│   ├── server.js                 # App entry point & middleware setup
│   ├── routes/                   # Route definitions
│   │   ├── auth.js               # /api/auth
│   │   ├── campaign.js           # /api/campaigns
│   │   ├── donation.js           # /api/donations
│   │   ├── payment.js            # /api/payments (Razorpay)
│   │   ├── dashboard.js          # /api/dashboard
│   │   ├── admin.js              # /api/admin
│   │   ├── admindash.js          # /api/admin/dashboard
│   │   ├── user.js               # /api/user
│   │   └── contact.js            # /api/contact
│   ├── controllers/              # Business logic handlers
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Campaign.js
│   │   ├── Donation.js
│   │   ├── Token.js
│   │   ├── Contact.js
│   │   └── Admin.js
│   ├── middleware/               # Auth & error middleware
│   ├── config/                   # DB, Redis, env validation
│   ├── jobs/                     # node-cron scheduled tasks
│   ├── queues/                   # BullMQ queue definitions
│   ├── workers/                  # BullMQ worker processes (email)
│   ├── utils/                    # Winston logger & helpers
│   └── scripts/                  # Database seed scripts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://cloud.mongodb.com/))
- [Redis](https://redis.io/) (optional — for email job queue)
- A [Razorpay](https://razorpay.com/) account (for payment features)

### 1. Clone the Repository

```sh
git clone https://github.com/atharvashivari/ImpactLink.git
cd ImpactLink
```

### 2. Backend Setup

```sh
cd impactlink-backend
npm install
```

Create a `.env` file in `impactlink-backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

REDIS_URL=redis://localhost:6379       # Optional
SENTRY_DSN=your_sentry_dsn             # Optional
CLIENT_URL=http://localhost:5173
```

Start the backend:

```sh
# Development (with hot reload)
npm run dev

# Production
npm start
```

### 3. Frontend Setup

```sh
cd impactlink-frontend
npm install
```

Create a `.env` file in `impactlink-frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:

```sh
npm run dev
```

The app will be available at **http://localhost:5173**.

### 4. Seed the Database (Optional)

To populate the database with demo campaigns, users, and donations:

```sh
cd impactlink-backend
node scripts/seedDatabase.js
```

---

## 📡 API Overview

All API routes are prefixed with `/api`.

| Route | Description |
|---|---|
| `POST /api/auth/signup` | Register a new user |
| `POST /api/auth/login` | Login and receive JWT tokens |
| `POST /api/auth/logout` | Invalidate refresh token |
| `POST /api/auth/forgot-password` | Send password reset OTP |
| `POST /api/auth/reset-password` | Reset password with OTP |
| `GET /api/campaigns` | List all campaigns |
| `POST /api/campaigns` | Create a new campaign (auth required) |
| `GET /api/campaigns/:id` | Get campaign details |
| `PUT /api/campaigns/:id` | Update a campaign (owner only) |
| `DELETE /api/campaigns/:id` | Delete a campaign (owner only) |
| `POST /api/payments/create-order` | Create Razorpay payment order |
| `POST /api/payments/verify` | Verify payment & record donation |
| `GET /api/donations` | List user's donations (auth required) |
| `GET /api/dashboard` | Get user dashboard statistics |
| `GET /api/admin/dashboard` | Admin platform statistics |
| `POST /api/contact` | Submit a contact form message |

---

## 🔒 Security

ImpactLink implements a multi-layered security approach:

| Measure | Implementation |
|---|---|
| **HTTP Security Headers** | `helmet` — sets CSP, HSTS, X-Frame-Options, etc. |
| **NoSQL Injection Prevention** | `express-mongo-sanitize` |
| **Rate Limiting** | Auth routes: 15 req/15 min · General: 100 req/15 min |
| **Password Hashing** | `bcryptjs` with salt rounds |
| **JWT Authentication** | Access token + refresh token rotation |
| **Payment Verification** | Razorpay signature verification server-side |
| **Input Validation** | Server-side validation on all sensitive inputs |
| **Environment Validation** | `envalid` — prevents startup with missing env vars |
| **Error Monitoring** | Sentry for real-time exception tracking |

---

## ☁️ Deployment

The project is configured for deployment on:

- **Frontend** — [Vercel](https://vercel.com/) (`vercel.json` included)
- **Backend** — [Render](https://render.com/) (`render.yaml` included)
- **Database** — [MongoDB Atlas](https://cloud.mongodb.com/)
- **Cache / Queue** — [Redis Cloud](https://redis.com/redis-enterprise-cloud/) or [Upstash](https://upstash.com/)

---

## 📄 Documentation

| File | Description |
|---|---|
| [`docs/PRD.md`](./docs/PRD.md) | Product Requirements Document — features, data models, user roles & roadmap |
| [`docs/TECH_STACK.md`](./docs/TECH_STACK.md) | Full tech stack reference with package versions & key design decisions |

---

## 👤 Author

**Atharva Shivari**

- GitHub: [@atharvashivari](https://github.com/atharvashivari)
- Email: [shivariatharva@gmail.com](mailto:shivariatharva@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ by Atharva Shivari</sub>
</div>
