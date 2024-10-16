const mysql = require('mysql2');require('dotenv').config();
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"janajaya",
  port:3306,
});
// const db = mysql.createConnection({
//   host: process.env.DB_HOST ,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME ,
//   port: process.env.DB_PORT ,
// });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = db;
