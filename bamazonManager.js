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
    connection.query(`SELECT product_name FROM products`, function (error, results, fields) {
        if (error) throw error;
        // get a list
        var productName = [];        
        results.forEach(element => {
            productName.push(element.product_name);
        });
        // Ask which product to add to the db:
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
            // Get the items to be entered into db.
            var additionItemName = itemToAddDetails.productName;
            var additionItemQuantity = parseInt(itemToAddDetails.quantity);

            // Query the db to check how many of the selected item there are in the store:
            connection.query(`SELECT stock_quantity  FROM products WHERE ?`, 
                { 
                    product_name: additionItemName
                },
                function (error, results, fields) {
                    if (error) throw error;
                    var cunnrentItemQuantity = parseInt(results[0].stock_quantity);
                    // Update DB and add the new amount:
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
            
        });
        
    });
 };

 // Add New Product:
var viewLowInventory = function () {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (error, results, fields) {
        if (error) throw error;
        console.log(columnify(results, { columnSplitter: ' | ' }));
        connection.end();
    });
};

// Add to inventory:
var addNewProduct = function () {
    connection.query(`SELECT stock_quantity FROM products`, function (error, results, fields) {
        if (error) throw error;
        // get a list
        var productName = [];
        results.forEach(element => {
            productName.push(element.product_name);
        });
        // Ask which product to add to the db:
        inquirer.prompt([
            {
                type: "input",
                name: "newProductName",
                message: "What is the name of the new product?",
                validate: function (value) {
                    if (value != "") {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "departmentName",
                message: "Which department does it belong to?",
                validate: function (value) {
                    if (value != "") {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "newProductPrice",
                message: "Now, how much does it cost?",
                validate: function (value) {
                    // Check if a number is greater than zero and it is a number
                    if (Math.sign(value) == 1 && !(Math.sign(value) == NaN)) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "newProductQuantity",
                message: "Finally, how many items are you trying to add?",
                validate: function (value) {
                    // Check if a number is greater than zero and it is a number
                    if (Math.sign(value) == 1 && !(Math.sign(value) == NaN)) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (newProductToAddDetails) {
            // Get the items to be entered into db.
            var newProductName = newProductToAddDetails.newProductName;
            var departmentName = newProductToAddDetails.departmentName
            var newProductPrice = newProductToAddDetails.newProductPrice;
            var newProductQuantity = newProductToAddDetails.newProductQuantity;

            // Query the db to check how many of the selected item there are in the store:
            connection.query(`SELECT product_name  FROM products`, function (error, results, fields) {
                if (error) throw error;

                var product_list = [];
                results.forEach(element => {
                    product_list.push(element.product_name);
                });
                // Check if we already that type of item
                if (product_list.indexOf(newProductName) != -1) {
                    // Product already exisit, ask the manager to update the quanity if needs be:
                    console.log("| --------------------------------------------------------|");                    
                    console.log("| P R O D O C T   A L R E A D Y   I N   I N V E N T O R Y |");
                    console.log("|   Please use the 'Add To Inventory' selection instead!  |");
                    console.log("| --------------------------------------------------------|");
                }else{
                    // Add the new product to the DB if it does not exist:
                    connection.query(
                        "INSERT INTO products SET ?",
                        {
                            product_name: newProductName,
                            department_name: departmentName,
                            price: newProductPrice,
                            stock_quantity: newProductQuantity
                        },
                        function (error) {
                            if (error) throw error;
                            console.log("| ---------------------------------------------------------------|");
                            console.log("| S U C C E S S F U L L Y    A D D E D   T O   I N V E N T O R Y |");
                            console.log("|   The new product has been added to the inventory. Thank you.  |");
                            console.log("| ---------------------------------------------------------------|");
                        }
                    );
                }
                // End Connection                
                connection.end();
            });

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
        case "Add New Product":
            addNewProduct();
        default:
            break;
    }
});