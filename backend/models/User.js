const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // TODO: Hash password here (e.g., bcrypt)
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in POST /api/users:', error); // 👈 for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Omit password field
    res.status(200).json(users);
  } catch (err) {
    console.error('Error in GET /api/users:', err); // 👈 for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
