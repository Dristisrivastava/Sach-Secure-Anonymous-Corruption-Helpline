# CorruptWatch – Whistleblower & Incident Tracker

## APIs

### POST /api/incidents
Create an anonymous incident report.
**Body:**
```json
{
  "description": "Bribery in department",
  "region": "North",
  "department": "Transport"
}
```
### GET /api/incidents?region=North
Retrieve incidents filtered by region.

### PUT /api/incidents/:id/verified
Mark an incident as verified.

### GET /api/incidents/stats
Return count of incidents by region.

### Tech Stack
- Backend: Node.js, Express
- Database: MongoDB
- Frontend: React

### Setup
- backend
   - cd backend
   - npm init -y
   - npm install express mongoose cors dotenv
   - npm install --save-dev nodemon
   - node server.js (to start)
- Frontend
   - cd frontend
   - npm install
   - npm start

- git add .
- git commit -m "Your update message"
- git push