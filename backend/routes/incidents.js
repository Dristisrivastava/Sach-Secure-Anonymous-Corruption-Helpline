const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const generateTrackingId = () =>
  'CW' + Math.random().toString(36).substring(2, 10).toUpperCase();

/**
 * @swagger
 * tags:
 *   name: Incidents
 *   description: Incident reporting and admin tools
 */

/**
 * @swagger
 * /incidents:
 *   post:
 *     summary: Submit an anonymous incident report
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, region]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report submitted successfully
 */
router.post('/', async (req, res) => {
  try {
    const incident = new Incident({
      ...req.body,
      trackingId: generateTrackingId(),
      date: new Date()
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

/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Get all incidents, optionally filtered by region
 *     tags: [Incidents]
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
 *     responses:
 *       200:
 *         description: List of incidents
 */
router.get('/', async (req, res) => {
  const filter = req.query.region ? { region: req.query.region } : {};
  const incidents = await Incident.find(filter);
  res.json(incidents);
});

/**
 * @swagger
 * /incidents/{id}/verified:
 *   put:
 *     summary: Mark an incident as verified by an admin
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Incident ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminNote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Incident marked as verified
 */
router.put('/:id/verified', async (req, res) => {
  const incident = await Incident.findByIdAndUpdate(
    req.params.id,
    { verified: true, adminNote: req.body.adminNote || '' },
    { new: true }
  );
  res.json(incident);
});

/**
 * @swagger
 * /incidents/stats:
 *   get:
 *     summary: Get count of incidents per region (heatmap)
 *     tags: [Incidents]
 *     responses:
 *       200:
 *         description: Heatmap data
 */
router.get('/stats', async (req, res) => {
  const stats = await Incident.aggregate([
    { $group: { _id: '$region', count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

/**
 * @swagger
 * /incidents/status/{trackingId}:
 *   get:
 *     summary: Get the status of an incident by tracking ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tracking ID of the incident
 *     responses:
 *       200:
 *         description: Incident found
 *       404:
 *         description: Not found
 */
router.get('/status/:trackingId', async (req, res) => {
  const incident = await Incident.findOne({ trackingId: req.params.trackingId });
  if (!incident) return res.status(404).json({ message: 'Not found' });
  res.json(incident);
});

/**
 * @swagger
 * /incidents/file:
 *   post:
 *     summary: Submit an incident with file upload
 *     tags: [Incidents]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               region:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Reported
 */
router.post('/file', upload.single('file'), async (req, res) => {
  const incident = new Incident({
    ...req.body,
    file: req.file ? req.file.path : null,
    trackingId: generateTrackingId()
  });
  await incident.save();
  res.json({ message: 'Reported', trackingId: incident.trackingId });
});

module.exports = router;
