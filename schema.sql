
CREATE DATABASE IF NOT EXISTS stockroom_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stockroom_db;

CREATE TABLE IF NOT EXISTS users (
  username      VARCHAR(50) PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
  approved      TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(100) PRIMARY KEY
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS products (
  pk       INT AUTO_INCREMENT PRIMARY KEY,
  id       VARCHAR(64) NOT NULL UNIQUE,
  name     VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  price    DECIMAL(10,2) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  expiry   DATE NULL,
  CONSTRAINT chk_quantity_nonnegative CHECK (quantity >= 0),
  CONSTRAINT chk_price_positive CHECK (price > 0),
  CONSTRAINT fk_product_category FOREIGN KEY (category) REFERENCES categories(name)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;


INSERT INTO users (username, email, password_hash, role, approved) VALUES
  ('admin', 'admin@stockroom.com', '$2y$10$svW/gHZ/KuBB/c0t3MEks.MuV8fYMAX4Brt.JCQcm3nVummHJOfWm', 'admin', 1);

INSERT INTO categories (name) VALUES
  ('Beverages'),
  ('Snacks'),
  ('Electronics'),
  ('Stationery'),
  ('Dairy');

INSERT INTO products (id, name, category, quantity, price, supplier, expiry) VALUES
  ('PRD-0001', 'Bottled Water 500ml', 'Beverages', 240, 15.00, 'AquaPure Distributors', '2027-03-01'),
  ('PRD-0002', 'Wireless Mouse', 'Electronics', 8, 395.00, 'TechLink Supplies', NULL),
  ('PRD-0003', 'Ballpoint Pen (Box of 12)', 'Stationery', 60, 85.00, 'OfficeWorks Co.', NULL),
  ('PRD-0004', 'Potato Chips 150g', 'Snacks', 0, 45.00, 'CrunchFoods Inc.', '2026-11-15'),
  ('PRD-0005', 'Fresh Milk 1L', 'Dairy', 5, 78.00, 'DairyBest Farms', '2026-09-14'),
  ('PRD-0006', 'USB-C Cable 1m', 'Electronics', 35, 120.00, 'TechLink Supplies', NULL);
