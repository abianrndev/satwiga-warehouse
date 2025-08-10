const pool = require('../config/db');
const bcrypt = require('bcrypt');

const getUserByUsername = async (username) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?', 
      [username]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, full_name, role, created_at FROM users WHERE id = ?', 
      [id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const [result] = await pool.query(
      'INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)',
      [userData.username, hashedPassword, userData.full_name, userData.role || 'admin']
    );
    
    return { id: result.insertId, ...userData, password: undefined };
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, full_name, role, created_at FROM users'
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  getAllUsers
};