// Get the environment to collect the dbpassword
require("dotenv").config();
// Let's get the password module
var mysql_credentials = require("./keys.js");
// DB Password
db_password = mysql_credentials.db_password;