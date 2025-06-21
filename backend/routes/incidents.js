const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// POST /api/incidents – Anonymous report
// Utility function to generate tracking ID
const generateTrackingId = () =>
  'CW' + Math.random().toString(36).substring(2, 10).toUpperCase();

router.post('/', async (req, res) => {
  try {
    const incident = new Incident({
      ...req.body,
      trackingId: generateTrackingId(),
      date: new Date() // Optional: Add a timestamp
    });

    await incident.save();

    res.status(201).json({
      message: "Report submitted successfully.",
      trackingId: incident.trackingId
    });

  } catch (error) {
    console.error("Error submitting incident:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});


// GET /api/incidents?region=xyz – Admin review
router.get('/', async (req, res) => {
  const filter = req.query.region ? { region: req.query.region } : {};
  const incidents = await Incident.find(filter);
  res.json(incidents);
});

// PUT /api/incidents/:id/verified – Mark as verified
router.put('/:id/verified', async (req, res) => {
  const incident = await Incident.findByIdAndUpdate(
    req.params.id,
    { verified: true, adminNote: req.body.adminNote || '' },
    { new: true }
  );
  res.json(incident);
});

// GET /api/stats – Heatmap data (e.g., count by region)
router.get('/stats', async (req, res) => {
  const stats = await Incident.aggregate([
    { $group: { _id: '$region', count: { $sum: 1 } } }
  ]);
  res.json(stats);
});
router.get('/status/:trackingId', async (req, res) => {
  const incident = await Incident.findOne({ trackingId: req.params.trackingId });
  if (!incident) return res.status(404).json({ message: 'Not found' });
  res.json(incident);
});
router.post('/incidents', upload.single('file'), async (req, res) => {
  const incident = new Incident({
    ...req.body,
    file: req.file ? req.file.path : null,
    trackingId: generateTrackingId()
  });
  await incident.save();
  res.json({ message: 'Reported', trackingId: incident.trackingId });
});
module.exports = router;
