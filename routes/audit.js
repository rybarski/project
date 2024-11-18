const express = require('express');
const router = express.Router();
const { AuditLog } = require('../models');
const authMiddleware = require('../middleware/auth');

// Create audit log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const log = await AuditLog.create({
      userId: req.user.id,
      action: req.body.action,
      timestamp: new Date(),
      details: req.body.details,
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all audit logs
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await AuditLog.findAll();
    res.json(logs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
