var conn = require("./connection.js");
var connection = conn.connection;
conn.connectToDB();
var columnify = require('columnify');
// View all products
var viewCurrentInventory = function() {    
    connection.query(`SELECT * FROM products`, function (error, results, fields) {
        if (error) throw error;
        console.log(columnify(results, { columnSplitter: ' | ' }));
        connection.end();
    });
};

var viewLowInventory = function() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (error, results, fields) {
        if (error) throw error;
        console.log(columnify(results, { columnSplitter: ' | ' }));
        connection.end();
    });
}

// View Products For Sales
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
            console.log("|    Here is what we current have in stock:          |");
            console.log("| --------------------------------------------------|");
            viewCurrentInventory();
            break;
        case "View Low Inventory":
            console.log("| --------------------------------------------------|");
            console.log("|    Hmmm...We are low on the following itms:       |");
            console.log("| --------------------------------------------------|");
            viewLowInventory();    
        default:
            break;
    }
});