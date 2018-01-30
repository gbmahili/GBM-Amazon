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
            createNewDepartment();
        default:
            break;
    }    
});

// View a list of products for each deparment
var viewProductsByDepartment = function () {
    connection.query(`
        SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales, (over_head_costs - product_sales) as total_profit
        FROM departments LEFT JOIN products
        ON departments.department_name = products.department_name
        GROUP BY (department_name)
        ORDER BY (department_id);
    `, function(error, results, fields){
        if(error) throw error;
        // Log the results using the columnify npm package
        console.log(columnify(results, 
            { 
                columnSplitter: ' | ', 
                config: { 
                    department_id: {align: 'center'},
                    over_head_costs: { align: 'center' },
                    product_sales: { align: 'center' },
                    total_profit: { align: 'center' }
                } 
            }
        ));//End of console.log(results)
        // Close DB connection
        connection.end();
    })
};

// Create new department
var createNewDepartment = function () {
    // Ask for the deparment and over_head_cost
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartmentName",
            message: "What is the name of the new deparment?",
            validate: function (value) {
                if (value != "") {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "overHeadCost",
            message: "What is the over head cost of the new department?",
            validate: function (value) {
                // Check if a number is greater than zero and it is a number
                if (Math.sign(value) == 1 && !(Math.sign(value) == NaN)) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(newDepartmentDetails) {
        // Check if department exists:
        var newDepartmentName = newDepartmentDetails.newDepartmentName;
        var overHeadCost = newDepartmentDetails.overHeadCost;
        // Query the database to see if we already have that department name:
        connection.query("SELECT department_name FROM departments", function (error, results, fields) {
            if (error) throw error;
            let currentDepartmentNames = [];
            results.forEach(element => {
                currentDepartmentNames.push(element.department_name);
            });
            // If we find that index is minus one, means it does not exist, we add it
            if (currentDepartmentNames.indexOf(newDepartmentName) == -1){
                // INSERT NEW DEPARTMENT IN THE DB
                connection.query("INSERT INTO departments SET ?, ?",
                [{
                    department_name: newDepartmentName
                },
                {
                    over_head_costs: overHeadCost
                }],                
                function(error, results, fields){
                    if(error) throw error;
                    console.log("| -----------------------------------------------------------------|");
                    console.log("| S U C C E S S F U L L Y    A D D E D   T O   D E P A R T M E N T |");
                    console.log("|    The new department has been created and added! Thank you.     |");
                    console.log("| -----------------------------------------------------------------|");
                });
            }else{
                // This means the department name already exists
                console.log("| --------------------------------------------------------|");
                console.log("| D E P A R T M E N T   A L R E A D Y   E X I S T   S I R |");
                console.log("|   We already have that deparment in our database! :)    |");
                console.log("| --------------------------------------------------------|");
            }
            // Close DB connection
            connection.end();
        });
        
    });
};