ImpactLink📌 Project Overview
ImpactLink is a secure and user-friendly crowdfunding platform designed to help users create, manage, and contribute to fundraising campaigns. The platform includes authentication, campaign management, and secure payment processing using Stripe.

🚀 Tech Stack
Frontend: React, React Router, Bootstrap
Backend: Express.js, Node.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Payment Gateway: Stripe
📂 Project Structure
php
Copy
Edit
root/
│── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/         # Page components (Home, Campaigns, Dashboard, etc.)
│   │   ├── assets/        # Images and static files
│   │   ├── App.js         # Main React entry
│   │   ├── index.js       # React root
│── backend/           # Express.js backend
│   ├── models/        # Database models (User, Campaign, Donation)
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── config/        # Config files (DB, JWT, etc.)
│   ├── index.js       # Express entry point
│── public/            # Static assets
│── package.json       # Dependencies
│── README.md
✅ Completed Features
📌 Home Page with an intuitive UI
📌 User Authentication (Signup, Login, Logout with JWT)
📌 Campaign Management (Create, Edit, View, Delete campaigns)
📌 Admin Dashboard (Manage all campaigns)
📌 Payment Integration using Stripe
📌 Dynamic Fund Calculation (Raised amount auto-updates based on successful donations)
📌 Real-time Search & Filtering for campaigns
📌 Fully Responsive Design with Bootstrap
🔄 Work In Progress
🔹 Enhanced UI improvements
🔹 Email notifications for campaign updates
🔹 AI-based campaign recommendations
🔹 Social media sharing options
🔹 Multi-currency support
🛠 How to Run the Project
Clone the Repository
sh
Copy
Edit
git clone https://github.com/atharvashivari/CrowdFundify.git
cd CrowdFundify
Backend Setup
sh
Copy
Edit
cd backend
npm install
Create a .env file with:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the backend:

sh
Copy
Edit
npm start
Frontend Setup
sh
Copy
Edit
cd ../frontend
npm install
npm start
💡 Future Enhancements
✅ User Profile & Activity Tracking
✅ AI-based campaign suggestions
✅ Dark Mode toggle
✅ Multi-language support
📌 Maintainer: Atharva Shivari
💎 Contact:
GitHub: @atharvashivari
Email: shivariatharva@gmail.com
