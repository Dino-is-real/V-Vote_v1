# Secure Online Voting System

## Project Name & Overview

**Secure Online Voting System** is a full-stack web application designed to digitize the election process in a secure, transparent, and role-based manner. The platform supports four types of users: Voter, Candidate, Election Administrator, and Auditor.  

The system manages the complete election lifecycle — from user registration and election creation to voting, result publishing, and auditing. It uses MongoDB Atlas as the cloud database and Docker for containerized deployment, making the application scalable and production-ready.

---

## Problem It Solves

Traditional voting systems face several challenges:

- Manual processes are slow and error-prone  
- Lack of transparency in vote counting  
- Limited accessibility for remote voters  
- Difficulty in auditing election activities  
- High operational cost and logistics  
- Delayed result declaration  

This project solves these issues by providing:

- A digital voting platform  
- Automated vote counting  
- Role-based access control  
- Transparent audit logs  
- Faster and accessible elections  
- Centralized election management  

---

## Target Users (Personas)

### Voter  
A citizen who wants a secure and easy way to participate in elections online.

**Goals:**
- Register and log in securely  
- View active elections  
- Cast a vote (only once per election)  
- View results after they are published  

---

### Candidate  
An individual participating in an election.

**Goals:**
- Register as a candidate for elections  
- Submit required documents  
- Track election status  
- View results  

---

### Election Administrator  
The authority responsible for managing elections.

**Goals:**
- Create and configure elections  
- Open and close voting  
- Manage voters and candidates  
- Publish election results  
- Monitor election activity  

---

### Auditor  
An independent authority to verify the system’s integrity.

**Goals:**
- View election logs  
- Verify published results  
- Generate audit reports  
- Ensure transparency  

---

## Vision Statement

To build a secure, transparent, and scalable online voting platform that modernizes the election process, improves accessibility, and ensures fairness and accountability through technology.

---

## Key Features / Goals

- Role-based dashboards for Voter, Candidate, Admin, and Auditor  
- Secure authentication and authorization (JWT-based)  
- Election creation, configuration, and lifecycle management  
- Candidate registration for upcoming elections  
- One-person-one-vote enforcement  
- Open and close voting functionality  
- Automatic vote counting and result publishing  
- Audit logs and report generation  
- Modern, responsive UI  
- Cloud database integration (MongoDB Atlas)  
- Dockerized deployment  

---

## Installation & Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Optional, for containerized setup)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/Dino-is-real/V-Vote_v1.git
cd V-Vote_v1
```

### 2. Environment Setup

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Run with Docker (Recommended)

Make sure Docker Desktop is running, then execute:

```bash
docker-compose up --build
```

The application will be available at:
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`

### 4. Run Manually

If you prefer running without Docker:

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

---

## Success Metrics

The project will be considered successful if:

- Users can register and log in successfully  
- Elections can be created, opened, closed, and published  
- Votes are counted accurately and securely  
- Duplicate voting is prevented  
- Auditors can verify results and logs  
- The system handles multiple users reliably  
- The UI is responsive and user-friendly  
- Docker containers run without configuration issues  
- MongoDB Atlas connectivity is stable  

---

## Assumptions & Constraints

### Assumptions
- Users have access to the internet  
- Admin accounts are pre-authorized  
- Identity verification is simulated (no real biometric/KYC)  
- MongoDB Atlas is properly configured  
- Users use modern browsers  

### Constraints
- Not legally deployable for real elections  
- No real government ID verification  
- Security limited to application-level mechanisms  
- Performance depends on hosting infrastructure  
- Requires continuous internet connectivity  

---

## Conclusion

This project demonstrates a real-world online voting system using modern full-stack technologies with role-based access, secure workflows, and transparent auditing. It is suitable for academic projects, demonstrations, and portfolio showcases.
