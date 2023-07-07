const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "randcopf_zenith",
//   password: process.env.DB_PASSWORD || "Zenith123",
//   database: process.env.DB_NAME || "randcopf_janajaya",
//   port: process.env.DB_PORT || 3306,
// });
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "by5x23mw",
  database: process.env.DB_NAME || "randcopf_janajaya",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = db;
