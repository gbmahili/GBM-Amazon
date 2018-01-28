// Get the environment to collect the dbpassword
require("dotenv").config();
// Let's get the password module
var mysql_credentials = require("./keys.js");

// Create a connection
// DB Password
db_password = mysql_credentials.db_password;

// INSERT INTO products SET ?
//     {
//         product_name: "Galaxy S8",
//         department_name: "Electronics",
//         price: 800.99,
//         stock_quantity: 100
//     },
//     {
//         product_name: "Samsung Monitor",
//         department_name: "Electronics",
//         price: 199.99,
//         stock_quantity: 50
//     },
//     {
//         product_name: "Masala Chai",
//         department_name: "Grocery",
//         price: 3.99,
//         stock_quantity: 500
//     },
//     {
//         product_name: "Eloquant JavaScript",
//         department_name: "Education",
//         price: 19.99,
//         stock_quantity: 6
//     },
//     {
//         product_name: "PRPS Goods & Co. Men's Demon Slim Fit Jean",
//         department_name: "Men's Clothing",
//         price: 258.00,
//         stock_quantity: 1
//     },
//     {
//         product_name: "Fc Barcelona Set Beanie Pom Pom Skull Cap Hat and Scarf Reversible New Season",
//         department_name: "Sport's Fun Shop",
//         price: 27.99,
//         stock_quantity: 11
//     },
//     {
//         product_name: "King Arthur Flour 100% Organic Bread Flour , 2 Pound (Pack of 12)",
//         department_name: "Grocery",
//         price: 56.18,
//         stock_quantity: 4
//     },
//     {
//         product_name: "Beigel's Braided Challahs - Pack of 2 Challahs",
//         department_name: "Grocery",
//         price: 18.98,
//         stock_quantity: 58
//     },
//     {
//         product_name: "Understanding JavaScript",
//         department_name: "Education",
//         price: 25.99,
//         stock_quantity: 9
//     },
//     {
//         product_name: "Beats Solo3 Wireless On-Ear Headphones - Neighborhood Collection - Asphalt Gray",
//         department_name: "Electronics",
//         price: 299.95,
//         stock_quantity: 1000
//     }

// SELECT * FROM products;