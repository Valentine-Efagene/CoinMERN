require('dotenv').config();
var mysql = require('mysql');

let db;

async function connectToDb() {
  var connection = await mysql.createConnection({
    host: process.env.SQL_HOSTNAME,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
  });

  console.log('Connected to MYSQL at', 'localhost');
  connection.connect(function (err) {
    if (err) throw err;
  });
  db = connection;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
