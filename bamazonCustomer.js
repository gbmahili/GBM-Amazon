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
// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.
// Query the DB
// Use the colunbify package to make columns the ssame sile in the terminal: (check the version in the package.json)
var columnify = require('columnify');
connection.query(`SELECT item_id, product_name, price FROM products`, function (error, results, fields) {
    if (error) throw error;
    // Let's use columnify
    console.log("| ------------------------------------------------------------------------------------------------|");
    console.log("|    Hi there! Welcome to Mahili's Amazon-like store. Here is a list of available items:          |");
    console.log("| ------------------------------------------------------------------------------------------------|");
    console.log(columnify(results, {columnSplitter: ' | '}));
    // // Log the row header
    // console.log(" | Item ID | Product Name | Price |");
    // console.log(" | ------- | ------------ | ----- |");
    // // Loop through the data and display it
    // results.forEach(element => {
    //     if (element.item_id < 10){
    //         element.item_id = `0${element.item_id}`;
    //         console.log(` |   ${element.item_id}    | ${element.product_name} | ${element.price} |`);
    //     }else{
    //         console.log(` |   ${element.item_id}    | ${element.product_name} | ${element.price} |`);
    //     };
    // }); 
    // Ask the user what they want to buy and add them to the cart:
    addToCart();      
});
// End the connection
connection.end();

// Le'ts prompt the user to chose an item and add them to the cart:
var addToCart = function () {
    var inquirer = require("inquirer");
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the ID of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units of the product would would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answers){
        console.log(`You would like to buy
        ITEM_ID: ${answers.item_id}
        QUANTITY: ${answers.quantity}`);
    });
};