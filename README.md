# 🗳️ V-Vote - Modern Online Voting System

V-Vote is a secure, role-based online voting web application built with the MERN stack (MongoDB, Express, React, Node.js). It supports 4 user roles: **Voter**, **Candidate**, **Admin**, and **Auditor**.

## 🚀 Features
- **Role-Based Access Control (RBAC)**: Secure access for different user types.
- **Secure Authentication**: JWT-based login with hashed passwords.
- **Vote Integrity**: One-vote-per-person policy using unique database constraints.
- **Real-time Results**: Instant publishing and viewing of election results.
- **Auditing**: Comprehensive logs for all critical system actions.
- **Responsive UI**: Built with React, Tailwind CSS, and Framer Motion.
- **Docker Ready**: Easy deployment with Docker Compose.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Cloud) or Local MongoDB.
- **DevOps**: Docker, Docker Compose.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Docker & Docker Compose
- MongoDB Atlas Account (Connection String)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd v2
```

### 2. Configure Environment
Update `server/.env` with your MongoDB Atlas connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/v-vote?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
```

### 3. Run with Docker (Recommended)
```bash
docker-compose up --build
```
The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### 4. Manual Setup (Without Docker)
**Backend:**
```bash
cd server
npm install
npm start
# To seed dummy data:
npm run seed
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## 🔐 User Roles & Dummy Credentials
(Password for all: `password123`)

| Role | Email | Permissions |
|------|-------|-------------|
| **Admin** | `admin@vvote.com` | Create/Manage Elections, Publish Results |
| **Voter** | `voter1@vvote.com` | View Elections, Cast Vote |
| **Candidate** | `alice@vvote.com` | Register for Election, View Campaign |
| **Auditor** | `auditor@vvote.com` | View Logs, Generate Reports |

## 📜 License
MIT License
