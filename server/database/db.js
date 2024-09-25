const mysql = require("mysql");
require('dotenv').config();
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "randcopf_zenith",
//   password: process.env.DB_PASSWORD || "Zenith123",
//   database: process.env.DB_NAME || "randcopf_janajaya",
//   port: process.env.DB_PORT || 3306,
// });
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME ,
  port: process.env.DB_PORT ,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = db;
