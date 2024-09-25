const mysql = require('mysql');
require('dotenv').config();


// Configure the db to RDS
const db = mysql.createConnection({
  host     : process.env.DB_HOST, // RDS endpoint
  user     : process.env.DB_USER, // Your RDS master username
  password : process.env.DB_PASS, // Your RDS master password
  database : process.env.DB_NAME, // Your database name
  port     : process.env.DB_PORT, // MySQL port, default is 3306
});

// Connect to RDS MySQL instance
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err.stack);
    return;
  }
  console.log('Connected to RDS as id ' + db.threadId);
});

// Example query
db.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
  if (err) {
    console.error('Error executing query: ', err.stack);
    return;
  }
  console.log('Query result: ', results[0].solution);
});

// Close the db
db.end();
module.exports =db;