var conn = require("./connection.js");
var connection = conn.connection;
conn.connectToDB();
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
    // Ask the user what they want to buy and add them to the cart:
    addToCart();      
});

// Le'ts prompt the user to chose an item and add them to the cart:
var addToCart = function () {
    var inquirer = require("inquirer");
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the 'ITEM_ID' of the product you would like to buy?",
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
        var item_id = answers.item_id;
        var quantity = answers.quantity;
        connection.query(`SELECT stock_quantity, price, product_sales FROM products WHERE \`item_id\` = ${item_id}`, (err, results) => {
            if (err) throw err;
            if(results[0].stock_quantity >= quantity){
                // Update database to reflect the remaining quantity and update the products_sales as well...
                connection.query(
                    "UPDATE products SET ?, ? WHERE ?",
                    [
                        {
                            stock_quantity: results[0].stock_quantity - quantity
                        },
                        {
                            product_sales: results[0].product_sales + (quantity * results[0].price)         
                        },
                        {
                            item_id: item_id
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log(`Your total is :US$${quantity * results[0].price}`);
                        // Update products table so that the total is 'ADDED' to the current amount in the 'products_sales columns'.
                    }
                );
            }else{
                console.log("Insufficient quantity!");
            }; 
            connection.end();           
        });        
    });
};