// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).send("User already exists");

  const user = new User({ username, password, role: 'user' });
  await user.save();
  res.send("User created");
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid username or password");
  }

  res.json({ username: user.username, role: user.role });
});

module.exports = router;
