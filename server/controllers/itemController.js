const itemModel = require('../models/itemModel');

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Error in getAllItems:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await itemModel.getItemById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error in getItemById:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    // Validation
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required'
      });
    }
    
    const newItem = await itemModel.createItem(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    console.error('Error in createItem:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    // Check if item exists
    const item = await itemModel.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    const updated = await itemModel.updateItem(req.params.id, req.body);
    
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Item not updated'
      });
    }
    
    // Get updated item
    const updatedItem = await itemModel.getItemById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    console.error('Error in updateItem:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    // Check if item exists
    const item = await itemModel.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }
    
    const deleted = await itemModel.deleteItem(req.params.id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Item not deleted'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteItem:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get low stock items
const getLowStockItems = async (req, res) => {
  try {
    const items = await itemModel.getLowStockItems();
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Error in getLowStockItems:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getLowStockItems
};