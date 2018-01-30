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
            x= new CreateNewDepartment("Electonics", 1000000);
            x.isDepartmentInDB();
        default:
            break;
    }
    connection.end();
});

var viewProductsByDepartment = function () {
    connection.query(`
        SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, (over_head_costs - product_sales) as total_profit
        FROM departments INNER JOIN products
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
    })
}

// TODO:
// MAKE THIS A CLASS THAT TAKES IN PARAMETERS, 
// CHECKS IF THAT DEPARTMENT EXISTS, IF NOT, PUSH THAT DEPARTMENT TO THE DEB
var CreateNewDepartment = function (department_name, over_head_costs) {
    this.isDepartmentInDB = function (department_name) {
        // Check if department exists and return true or fasle:
        connection.query("SELECT department_name FROM departments", function (error, results, fields) {
            if(error) throw error;
            console.log(results);
        })
    }
    console.log("Create departments");
}