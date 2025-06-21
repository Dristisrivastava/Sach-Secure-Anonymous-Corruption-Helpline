# SACH - Secure Anonymous Corruption Helpline

SACH is a full-stack web application that allows users to **report corruption anonymously**. It features a secure backend API, user authentication, and a user-friendly frontend built with React.

---

## 📁 Project Structure

corruptwatch/
├── backend/ # Node.js + Express backend
├── frontend/ # React frontend
├── README.md

yaml
Copy
Edit

---

## 🛠 Backend (API Server)

### 📦 Technologies Used:
- **Node.js**, **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing

---

### 📌 API Endpoints

#### **Auth Routes**

- `POST /api/auth/signup`
  - Registers a new user.
  - **Request:**
    ```json
    {
      "username": "john_doe",
      "password": "securePassword"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User created successfully"
    }
    ```

- `POST /api/auth/login`
  - Logs in a user.
  - **Request:**
    ```json
    {
      "username": "john_doe",
      "password": "securePassword"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "...",
        "username": "john_doe"
      }
    }
    ```

---

#### **Report Routes**

- `POST /api/report`
  - Submits a corruption report (anonymous).
  - **Request:**
    ```json
    {
      "location": "City Name",
      "description": "Bribery at local office"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Report submitted successfully"
    }
    ```

- `GET /api/report`
  - Admin-only. Returns all reports.

---

## 💾 Database

- **MongoDB Atlas** (cloud-based MongoDB)
- Connected using **Mongoose**
- Collections:
  - `users`: Stores usernames & hashed passwords.
  - `reports`: Stores anonymous corruption reports.

---

## ▶️ Running the Backend

```bash
cd backend
npm install
npm start
The server will run at http://localhost:5000
```
## ▶️ Running the Frontend
```bash
cd frontend
npm install
npm start
The React app runs at http://localhost:3000
