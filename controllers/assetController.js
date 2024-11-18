// controllers/assetController.js
const { Asset, User } = require('../models');
const { Op } = require('sequelize');
const { Status, Type, Location, Warranty } = require('../models');

// Get all assets
exports.getAssets = async (req, res) => {
  const { page = 1, limit = 10, search = '', sort = 'id', order = 'asc' } = req.query;

  try {
    const offset = (page - 1) * limit;
    const assets = await Asset.findAndCountAll({
      where: {
        [Op.or]: [
          { type: { [Op.iLike]: `%${search}%` } },
          { model: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } },
          { status: { [Op.iLike]: `%${search}%` } },
          { serialNumber: { [Op.iLike]: `%${search}%` } }, // Ensure camelCase matches Sequelize model
        ],
      },
      order: [[sort, order]], // Ensure this receives camelCase columns like `createdAt`, `serialNumber`
      limit,
      offset,
    });

    res.status(200).json({
      totalCount: assets.count,
      totalPages: Math.ceil(assets.count / limit),
      currentPage: parseInt(page),
      assets: assets.rows,
    });
  } catch (err) {
    console.error('Error fetching assets:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Asset
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Log the asset details to verify status field
    console.log('Single asset returned:', {
      id: asset.id,
      type: asset.type,
      status: asset.status
    });

    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new asset
exports.createAsset = async (req, res) => {
  const { type, model, serialNumber, purchaseDate, warrantyStatus, assignedUserId, location, status, usageHours } = req.body;

  try {
    const newAsset = await Asset.create({
      type,
      model,
      serialNumber,
      purchaseDate,
      warrantyStatus,
      assignedUserId,
      location,
      status,
      usageHours
    });
    res.status(201).json({ message: 'Asset created successfully', asset: newAsset });
  } catch (err) {
    console.error('Error creating asset:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller method to get dropdown values for add asset form
exports.getDropdownValues = async (req, res) => {
  try {
    const assetTypes = await Type.findAll();
    const warrantyStatuses = await WarrantyStatus.findAll();
    const statuses = await Status.findAll();

    res.status(200).json({
      assetTypes: assetTypes.map((type) => type.name),
      warrantyStatuses: warrantyStatuses.map((status) => status.name),
      statuses: statuses.map((status) => status.name),
    });
  } catch (error) {
    console.error("Error fetching dropdown values:", error);
    res.status(500).json({ message: "Failed to fetch dropdown data" });
  }
};

// Update an asset
exports.updateAsset = async (req, res) => {
  const { id } = req.params;
  const { type, model, serialNumber, purchaseDate, warrantyStatus, assignedUserId, location, status, usageHours } = req.body;

  try {
    const asset = await Asset.findByPk(id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });

    await asset.update({
      type,
      model,
      serialNumber,
      purchaseDate,
      warrantyStatus,
      assignedUserId,
      location,
      status,
      usageHours
    });
    res.status(200).json({ message: 'Asset updated successfully', asset });
  } catch (err) {
    console.error('Error updating asset:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an asset
exports.deleteAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const asset = await Asset.findByPk(id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });

    await asset.destroy();
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (err) {
    console.error('Error deleting asset:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
