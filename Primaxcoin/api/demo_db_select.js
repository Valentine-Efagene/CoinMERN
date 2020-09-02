var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'valentyne',
  password: '#Valentyne101',
  database: 'db_primaxcoin',
});

con.connect(function (err) {
  if (err) throw err;
  con.query('SELECT * FROM t_users', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
