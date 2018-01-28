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
