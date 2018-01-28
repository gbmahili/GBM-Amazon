// Get the environment to collect the dbpassword
require("dotenv").config();
// Let's get the password module
var mysql_credentials = require("./keys.js");
// DB Password
db_password = mysql_credentials.db_password;
// Create a connection
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port : "3306",
    user: 'root',
    password: db_password,
    database: 'bamazon'
});

// Connect to DB
connection.connect();
// These are the items we inserted in the DB:
// var valuesToInstert = `("Galaxy S8", "Electronics", 800.99, 100),
//     ("Samsung Monitor", "Electronics", 199.99, 50),
//     ("Masala Chai", "Grocery", 3.99, 500),
//     ("Eloquant JavaScript", "Education", 19.99, 6),
//     ("PRPS Goods & Co. Men's Demon Slim Fit Jean", "Men's Clothing", 258.00, 1),
//     ("Fc Barcelona Set Beanie Pom Pom Skull Cap Hat and Scarf Reversible New Season", "Sport's Fun Shop", 27.99, 11),
//     ("King Arthur Flour 100% Organic Bread Flour , 2 Pound (Pack of 12)", "Grocery", 56.18, 4),
//     ("Beigel's Braided Challahs - Pack of 2 Challahs", "Grocery", 18.98, 58),
//     ("Understanding JavaScript", "Education", 25.99, 9),
//     ("Beats Solo3 Wireless On-Ear Headphones - Neighborhood Collection - Asphalt Gray", "Electronics", 299.95, 1000)`;

// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.

// Query the DB
connection.query(`SELECT item_id, product_name, price FROM products`, function (error, results, fields) {
    if (error) throw error;
    // console.log(results); 
       
});
// End the connection
connection.end();