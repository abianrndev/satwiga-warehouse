const pool = require('../config/db');

//get all items
const getAllItems = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      LEFT JOIN categories c ON i.category_id = c.id
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

//get item by id
const getItemById = async (id) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.id = ?
    `, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const createItem = async (itemData) => {
  try {
    const [result] = await pool.query(`
      INSERT INTO items (name, description, category_id, quantity, min_stock, location) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      itemData.name, 
      itemData.description, 
      itemData.category_id,
      itemData.quantity || 0,
      itemData.min_stock || 5,
      itemData.location
    ]);
    
    return { id: result.insertId, ...itemData };
  } catch (error) {
    throw error;
  }
};

const updateItem = async (id, itemData) => {
  try {
    const [result] = await pool.query(`
      UPDATE items 
      SET name = ?, 
          description = ?, 
          category_id = ?, 
          quantity = ?, 
          min_stock = ?, 
          location = ?
      WHERE id = ?
    `, [
      itemData.name, 
      itemData.description, 
      itemData.category_id,
      itemData.quantity,
      itemData.min_stock,
      itemData.location,
      id
    ]);
    
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// delete item
const deleteItem = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

//update item quantity
const updateItemQuantity = async (id, quantityChange) => {
  try {
    const [result] = await pool.query(`
      UPDATE items 
      SET quantity = quantity + ? 
      WHERE id = ?
    `, [quantityChange, id]);
    
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Get low stock items
const getLowStockItems = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.quantity <= i.min_stock
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
	getAllItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
	updateItemQuantity,
	getLowStockItems
}