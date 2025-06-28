// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();

const setupSwagger = require('./swagger'); // <-- ✅ Add this line

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
setupSwagger(app); // <-- ✅ Add this line

// Routes
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

module.exports = app;
