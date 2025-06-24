🛡️ SACH - Secure Anonymous Corruption Helpline
SACH is a full-stack web application that allows users to report corruption anonymously and securely. It features a robust backend API, user authentication, and a clean, responsive frontend built with React.

📁 Project Structure
bash
Copy
Edit
corruptwatch/
├── backend/   # Node.js + Express backend
├── frontend/  # React frontend
├── README.md
🛠️ Backend (API Server)
🔧 Technologies Used
Node.js, Express.js

MongoDB with Mongoose

JWT for authentication

bcrypt for password hashing

🔐 Authentication Routes
POST /api/auth/signup
Registers a new user.

Request:

json
Copy
Edit
{
  "username": "john_doe",
  "password": "securePassword"
}
Response:

json
Copy
Edit
{
  "message": "User created successfully"
}
POST /api/auth/login
Logs in a user and returns a JWT token.

Request:

json
Copy
Edit
{
  "username": "john_doe",
  "password": "securePassword"
}
Response:

json
Copy
Edit
{
  "token": "jwt_token_here",
  "user": {
    "_id": "...",
    "username": "john_doe"
  }
}
📢 Report Routes
POST /api/report
Submits an anonymous corruption report.

Request:

json
Copy
Edit
{
  "location": "City Name",
  "description": "Bribery at local office"
}
Response:

json
Copy
Edit
{
  "message": "Report submitted successfully"
}
GET /api/report (Admin Only)
Returns all submitted reports.

💾 Database Schema
Using MongoDB Atlas (cloud-hosted):

Collections:

users: Stores usernames and hashed passwords.

reports: Stores anonymous corruption reports.

▶️ Running the Application
🔙 Backend Server
bash
Copy
Edit
cd backend
npm install
npm start
Runs on: http://localhost:5000

🖥️ Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
Runs on: http://localhost:3000

