const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  description: String,
  region: String,
  department: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  trackingId: { type: String, unique: true },
adminNote: { type: String, default: "" },
date: { type: Date, default: Date.now },
file: String
});

module.exports = mongoose.model('Incident', incidentSchema);
