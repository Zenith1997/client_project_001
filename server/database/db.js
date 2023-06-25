const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Zenith1997",
  database: process.env.DB_NAME || "janajaya",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = db;
