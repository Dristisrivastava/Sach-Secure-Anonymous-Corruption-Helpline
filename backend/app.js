// backend/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

module.exports = app;
