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
    port: "3306",
    user: 'root',
    password: db_password,
    database: 'bamazon'
});
// Connect to DB
var connectToDB = function(){
    connection.connect()
};

module.exports = {
    connection : connection,
    connectToDB: connectToDB
}