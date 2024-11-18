const express = require('express');
const router = express.Router();
const { MaintenanceSchedule, Asset } = require('../models');
const authMiddleware = require('../middleware/auth');

// Create maintenance schedule
router.post('/', authMiddleware, async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.create(req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all maintenance schedules
router.get('/', authMiddleware, async (req, res) => {
  try {
    const schedules = await MaintenanceSchedule.findAll({
      include: [{ model: Asset }],
    });
    res.json(schedules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update maintenance schedule
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findByPk(req.params.id);
    if (!maintenance) return res.status(404).json({ error: 'Maintenance schedule not found' });
    await maintenance.update(req.body);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete maintenance schedule
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findByPk(req.params.id);
    if (!maintenance) return res.status(404).json({ error: 'Maintenance schedule not found' });
    await maintenance.destroy();
    res.json({ message: 'Maintenance schedule deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
