const pool = require('./db');

// SQL Queries to create tables
const createTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category_id INT,
        quantity INT DEFAULT 0,
        min_stock INT DEFAULT 5,
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_id INT NOT NULL,
        user_id INT NOT NULL,
        quantity INT NOT NULL,
        type ENUM('in', 'out') NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        borrow_date DATETIME,
        return_date DATETIME,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create inventory table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_id INT NOT NULL,
        quantity_change INT NOT NULL,
        action_type ENUM('restock', 'borrow', 'return', 'adjustment') NOT NULL,
        transaction_id INT,
        note TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Create reports table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type ENUM('monthly', 'stock', 'transaction', 'custom') NOT NULL,
        period VARCHAR(20),
        data JSON,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('All tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Insert some initial data
const seedData = async () => {
  try {
    // Insert default admin user (password: admin123)
    await pool.query(`
      INSERT INTO users (username, password, full_name, role)
      VALUES ('admin', '$2b$10$7JWHnSLZMBiJ2J4UfFL9qOcQ7Gh1eBzl0UC4hqscQzIgc6wiDHCZO', 'Admin Gudang', 'admin')
    `);

    // Insert some categories
    await pool.query(`
      INSERT INTO categories (name, description)
      VALUES 
        ('Elektronik', 'Peralatan elektronik seperti laptop, proyektor, dll'),
        ('Perkakas', 'Alat-alat seperti obeng, palu, gergaji, dll'),
        ('Furniture', 'Meja, kursi, lemari, dll')
    `);

    // Insert some items
    await pool.query(`
      INSERT INTO items (name, description, category_id, quantity, min_stock, location)
      VALUES 
        ('Laptop Dell XPS', 'Laptop untuk keperluan desain dan programming', 1, 5, 2, 'Rak A1'),
        ('Proyektor Epson', 'Proyektor untuk meeting room', 1, 3, 1, 'Rak A2'),
        ('Obeng Set', 'Set obeng berbagai ukuran', 2, 10, 3, 'Rak B1'),
        ('Kursi Kantor', 'Kursi ergonomis untuk kantor', 3, 15, 5, 'Gudang C')
    `);

    console.log('Initial data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Run setup
const setupDatabase = async () => {
  await createTables();
  
  // Check if users table is empty before seeding
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
  if (rows[0].count === 0) {
    await seedData();
  } else {
    console.log('Database already has data, skipping seed');
  }
  
  console.log('Database setup completed!');
  process.exit();
};

setupDatabase();