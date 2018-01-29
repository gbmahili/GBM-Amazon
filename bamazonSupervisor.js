// Get Required files such as the connection, and mysql:
var conn = require("./connection.js");
var connection = conn.connection;
conn.connectToDB();
var columnify = require('columnify');

var inquirer = require("inquirer");
inquirer.prompt([
    {
        type: "list",
        name: "supervisorAction",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
]).then(function (toDoChoices) {    
    let supervisorAction = toDoChoices.supervisorAction;
    switch (supervisorAction) {
        case "View Product Sales by Department":
            console.log("| --------------------------------------------------|");
            console.log("|    Here is where we stand by department:          |");
            console.log("| --------------------------------------------------|");
            viewProductsByDepartment();
            break;
        case "Create New Department":
            console.log("| --------------------------------------------------|");
            console.log("|    Creating new department for you boss           |");
            createNewDepartment();
        default:
            break;
    }
    connection.end();
});

var viewProductsByDepartment = function () {
    console.log("GET ALL PRODUCTS BY DEPARTMENTS");
}

var createNewDepartment = function () {
    console.log("Create departments");
}