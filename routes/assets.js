const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
//const { predictFailures } = require('../services/predictiveMaintenance'); // Import predictFailures

// Get all assets (accessible to all authenticated users)
router.get('/', authMiddleware, assetController.getAssets);
router.get('/:id', authMiddleware, assetController.getAssetById);

// Add a new asset (restricted to Asset Manager and Admin)
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['Asset Manager', 'Admin']),
    assetController.createAsset
);

// Update an asset (restricted to Asset Manager and Admin)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Asset Manager', 'Admin']),
  assetController.updateAsset
);

// Delete an asset (restricted to Admin only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin', 'Asset Manager']),
  assetController.deleteAsset
);

// Predict asset failures (restricted to Asset Manager and Admin)
router.get('/predict/:hours', authMiddleware, roleMiddleware(['Asset Manager', 'Admin']), async (req, res) => {
  try {
    const failures = await predictFailures(req.params.hours);
    res.json({ predictedFailures: failures });
  } catch (err) {
    res.status(500).json({ error: 'Prediction error' });
  }
});

module.exports = router;
