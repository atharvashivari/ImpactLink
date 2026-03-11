# ImpactLink — Product Requirements Document (PRD)

**Version:** 1.0  
**Author:** Atharva Shivari  
**Last Updated:** March 2026  

---

## 1. Overview

ImpactLink is a full-stack crowdfunding web platform designed to enable individuals and organisations to create fundraising campaigns, accept donations securely, and track their impact. The platform is built with a focus on security, performance, and a premium user experience.

---

## 2. Goals & Objectives

| Goal | Description |
|---|---|
| **Accessibility** | Allow any registered user to browse, create, and donate to campaigns without friction |
| **Trust & Security** | Ensure all payments are verified server-side; protect user data at every layer |
| **Transparency** | Provide real-time fund tracking and donation history for all stakeholders |
| **Scalability** | Support async background jobs and scheduled tasks to handle platform growth |
| **Admin Control** | Give administrators visibility and control over all platform activity |

---

## 3. User Roles

### 3.1 Guest (Unauthenticated User)
- Browse all active campaigns
- View campaign details and progress
- Access About and Contact pages
- Register / Log in

### 3.2 Authenticated User
- All guest permissions
- Create, edit, and delete own campaigns
- Make donations via Razorpay
- View personal dashboard (campaigns, donations, funds raised)
- Manage profile, settings, and change password
- Request password reset via email OTP

### 3.3 Admin
- All user permissions (via separate admin login)
- View platform-wide statistics (users, campaigns, total donations)
- Manage all campaigns across the platform
- View all users and donations
- Review contact form submissions

---

## 4. Functional Requirements

### 4.1 Authentication
- [x] User signup with email and password
- [x] Login with JWT access token + refresh token rotation
- [x] Logout (invalidates refresh token in DB)
- [x] Forgot password: sends a time-limited OTP to registered email
- [x] Reset password: verifies OTP then updates hashed password
- [x] Token-based protected routes on both frontend and backend

### 4.2 Campaign Management
- [x] Create a campaign with: title, description, goal amount, deadline, category, cover image URL
- [x] Edit a campaign (owner only)
- [x] Delete a campaign (owner only)
- [x] List all campaigns with search and category filtering
- [x] View individual campaign details with donation progress bar
- [x] Automatic campaign status updates via scheduled cron job (active → completed/expired)

### 4.3 Donation & Payments
- [x] Create a Razorpay payment order (server-side)
- [x] Accept donation via Razorpay checkout (UPI, card, netbanking)
- [x] Verify payment signature server-side before recording donation
- [x] Record donation in DB and update campaign's `raisedAmount` atomically
- [x] User can view full donation history with amounts and campaign names

### 4.4 User Dashboard
- [x] Display total funds raised across user's campaigns
- [x] Display total number of campaigns created
- [x] Display total donations made by the user
- [x] List user's campaigns with status and progress

### 4.5 Admin Dashboard
- [x] Platform-level statistics: total users, campaigns, donations, revenue
- [x] Paginated list of all campaigns
- [x] Paginated list of all users
- [x] Paginated list of all donations
- [x] Separate admin login (not shared with regular user auth)

### 4.6 Profile & Settings
- [x] View and update display name, bio, and avatar URL
- [x] Change password (requires current password confirmation)
- [x] View account information (email, member since)

### 4.7 Contact
- [x] Authenticated and guest users can submit a contact form
- [x] Contact submissions are stored in DB for admin review

### 4.8 Email Notifications
- [x] Password reset OTP email sent asynchronously via BullMQ + Redis queue
- [x] Transactional emails delivered via Nodemailer (SMTP)

---

## 5. Non-Functional Requirements

### 5.1 Security
- Passwords hashed using `bcryptjs` (salt rounds ≥ 10)
- JWTs signed with a strong secret; refresh tokens stored and validated in DB
- All auth routes protected by a stricter rate limiter (15 req / 15 min)
- General API routes limited to 100 req / 15 min per IP
- HTTP headers hardened via `helmet`
- Inputs sanitized against NoSQL injection via `express-mongo-sanitize`
- Payment amounts verified server-side — never trusted from the client
- Environment variables validated at startup via `envalid`

### 5.2 Performance
- Background email jobs processed asynchronously (BullMQ / Redis) — never blocking request cycle
- Database queries use indexed fields (email, campaign owner, status)
- Frontend built with Vite for fast HMR in development and optimised production bundles
- Animations restricted to GPU-composited properties (opacity, transform) for 60fps target

### 5.3 Reliability
- Graceful server shutdown (handles `SIGTERM` / `SIGINT`) — drains connections before exit
- Sentry captures and reports unhandled exceptions and performance traces in real time
- Winston logger writes structured logs; Morgan streams HTTP logs through Winston
- BullMQ workers restart automatically on failure

### 5.4 Usability
- Fully responsive layout (mobile, tablet, desktop)
- Toast notifications for all user-facing actions (success, error, info)
- Loading states on all async operations
- 404 page for unmatched routes
- Consistent color palette and typography system across all pages

---

## 6. Pages & Routes

### Frontend Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/campaigns` | Campaign Listing | No |
| `/campaigns/:id` | Campaign Details | No |
| `/campaigns/create` | Create Campaign | Yes |
| `/campaigns/edit/:id` | Edit Campaign | Yes |
| `/donations` | My Donations | Yes |
| `/dashboard` | User Dashboard | Yes |
| `/profile` | User Profile | Yes |
| `/settings` | Account Settings | Yes |
| `/about` | About Page | No |
| `/contact` | Contact Page | No |
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/forgot-password` | Forgot Password | No |
| `/reset-password` | Reset Password | No |
| `/admin` | Admin Dashboard | Admin |
| `/admin/users` | Manage Users | Admin |
| `/admin/donations` | Manage Donations | Admin |
| `*` | 404 Not Found | No |

---

## 7. Data Models

### User
| Field | Type | Notes |
|---|---|---|
| `name` | String | Display name |
| `email` | String | Unique, indexed |
| `password` | String | bcrypt hash |
| `bio` | String | Optional |
| `avatar` | String | URL |
| `createdAt` | Date | Auto |

### Campaign
| Field | Type | Notes |
|---|---|---|
| `title` | String | |
| `description` | String | |
| `goal` | Number | Target amount (INR) |
| `raisedAmount` | Number | Updated on donation |
| `deadline` | Date | |
| `category` | String | Enum |
| `status` | String | active / completed / expired |
| `owner` | ObjectId | Ref: User |
| `coverImage` | String | URL |

### Donation
| Field | Type | Notes |
|---|---|---|
| `campaign` | ObjectId | Ref: Campaign |
| `donor` | ObjectId | Ref: User |
| `amount` | Number | INR, verified server-side |
| `razorpayPaymentId` | String | |
| `razorpayOrderId` | String | |
| `createdAt` | Date | Auto |

### Token
| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref: User |
| `token` | String | Refresh or OTP token |
| `type` | String | `refresh` / `reset` |
| `expiresAt` | Date | TTL enforced |

---

## 8. Out of Scope (Current Version)

- Social login (Google, GitHub OAuth)
- Multi-currency support
- Campaign comment threads / discussion boards
- AI-based campaign recommendations
- Dark mode toggle
- Multi-language / i18n support
- Native mobile application

---

## 9. Future Roadmap

| Feature | Priority |
|---|---|
| Social login (OAuth) | High |
| Email notifications for campaign milestones | High |
| Admin ability to fetch full user/donation/campaign data | High |
| Campaign comments & updates | Medium |
| Multi-currency support | Medium |
| AI-based campaign discovery | Low |
| Dark mode | Low |
