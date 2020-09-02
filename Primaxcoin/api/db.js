require('dotenv').config();
var mysql = require('mysql');

let db;

async function connectToDb() {
  var connection = await mysql.createConnection({
    host: 'localhost',
    user: 'valentyne',
    password: '#Valentyne101',
    database: 'db_primaxcoin',
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
