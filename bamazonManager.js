var conn = require("./connection.js");
var connection = conn.connection;
conn.connectToDB();
var columnify = require('columnify');

// View all products:
var viewCurrentInventory = function() {    
    connection.query(`SELECT * FROM products`, function (error, results, fields) {
        if (error) throw error;
        console.log(columnify(results, { columnSplitter: ' | ' }));
        connection.end();
    });
};

// View LowInventory:
var viewLowInventory = function() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (error, results, fields) {
        if (error) throw error;
        console.log(columnify(results, { columnSplitter: ' | ' }));
        connection.end();
    });
};


// Add to inventory:
var addToInventory = function() {
    connection.query(`SELECT product_name, stock_quantity  FROM products`, function (error, results, fields) {
        if (error) throw error;
        // get a list
        var productName = [];        
        results.forEach(element => {
            productName.push(element.product_name);
        });
        // Ask which product to add to:
        inquirer.prompt([
            {
                type: "list",
                name: "productName",
                message: "You got i! Please select item to add to:",
                choices: productName
            },
            {
                type: "input",
                name: "quantity",
                message: "Perfect, now how many?",
                validate: function (value) {
                    var positiveValue = parseInt(value);
                    // Only continue if a position value and greater than 0 has been entered
                    if (!(positiveValue <= 0)) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (itemToAddDetails) {
            var additionItemName = itemToAddDetails.productName;
            var additionItemQuantity = parseInt(itemToAddDetails.quantity);

            // Get Current quantity:
            //var cunnrentItemQuantity;
            connection.query(`SELECT stock_quantity  FROM products WHERE ?`, 
                { 
                    product_name: additionItemName
                },
                function (error, results, fields) {
                    if (error) throw error;
                    var cunnrentItemQuantity = parseInt(results[0].stock_quantity);
                    //console.log(cunnrentItemQuantity);
                    // Update DB:            
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: cunnrentItemQuantity + additionItemQuantity
                            },
                            {
                                product_name: additionItemName
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("You have added more of the selected item! Quantity Updated!");
                        }                        
                    );
                    connection.end();
                }
            );
            // // Update DB:            
            // connection.query(
            //     "UPDATE products SET ? WHERE ?",
            //     [
            //         {
            //             stock_quantity: cunnrentItemQuantity + additionItemQuantity
            //         },
            //         {
            //             product_name: additionItemName
            //         }
            //     ],
            //     function (error) {
            //         if (error) throw error;
            //         console.log("Quantity Updated!");
            //     }
            // );
            // connection.end();
            
        });
        
    });
 };











var inquirer = require("inquirer");
inquirer.prompt([
    {
        type: "list",
        name : "action",
        message: "Okay boss, what would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(toDoChoices){
    let action = toDoChoices.action;
    switch (action) {
        case "View Products for Sale":
            console.log("| --------------------------------------------------|");
            console.log("|    Here is what we currently have in stock:       |");
            console.log("| --------------------------------------------------|");
            viewCurrentInventory();
            break;
        case "View Low Inventory":
            console.log("| --------------------------------------------------|");
            console.log("|    Hmmm...We are low on the following items:      |");
            console.log("| --------------------------------------------------|");
            viewLowInventory();
        case "Add to Inventory":
            addToInventory();
        default:
            break;
    }
});