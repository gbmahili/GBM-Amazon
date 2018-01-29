DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INTEGER(40) NOT NULL,
    PRIMARY KEY(item_id)
);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Galaxy S8", "Electronics", 800.99, 100),
("Samsung Monitor", "Electronics", 199.99, 50),
("Masala Chai", "Grocery", 3.99, 500),
("Eloquant JavaScript", "Education", 19.99, 6),
("PRPS Goods & Co. Men's Demon Slim Fit Jean", "Men's Clothing", 258.00, 1),
("Fc Barcelona Set Beanie Pom Pom Skull Cap Hat and Scarf Reversible New Season", "Sport's Fun Shop", 27.99, 11),
("King Arthur Flour 100% Organic Bread Flour , 2 Pound (Pack of 12)", "Grocery", 56.18, 4),
("Beigel's Braided Challahs - Pack of 2 Challahs", "Grocery", 18.98, 58),
("Understanding JavaScript", "Education", 25.99, 9),
("Beats Solo3 Wireless On-Ear Headphones - Neighborhood Collection - Asphalt Gray", "Electronics", 299.95, 1000);


-- Department Table
USE bamazon;
CREATE TABLE departments(
    department_id INTEGER AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DECIMAL(6,2) NOT NULL,
    PRIMARY KEY(department_id)
);

-- Add New Column
ALTER TABLE products
ADD COLUMN product_sales DECIMAL(6,2) AFTER stock_quantity;