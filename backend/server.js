// backend/server.js
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://corruptadmin:Dristi_2003@cluster0.orc9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
