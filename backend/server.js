const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User'); // Make sure this path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/auth', require('./routes/auth'));

// MongoDB Atlas connection string (✔️ yours looks correct)
mongoose.connect('mongodb+srv://corruptadmin:Dristi_2003@cluster0.orc9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ MongoDB connected");

  

  // Start server
  app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
