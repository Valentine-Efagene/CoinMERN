const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db.js');
const { escape } = require('mysql');

// function validate(issue) {
//   const errors = [];
//   if (issue.title.length < 3) {
//     errors.push('Field "title" must be at least 3 characters long.');
//   }
//   if (issue.status === 'Assigned' && !issue.owner) {
//     errors.push('Field "owner" is required when status is "Assigned"');
//   }
//   if (errors.length > 0) {
//     throw new UserInputError('Invalid input(s)', { errors });
//   }
// }

async function get(_, { email }) {
  const db = getDb();
  var sql =
    'SELECT firstName, lastName, Address, country, phoneNumber, gender, email, referralID, referrer, passwordHash, dp, wallet, date, admin FROM users WHERE email=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email], function (err, result, fields) {
      if (err) reject(err);
      let r = Object.assign({}, result[0]);
      resolve(r);
    });
  });
}

async function auth(_, { email, passwordHash }) {
  const db = getDb();
  var sql =
    'SELECT COUNT(*) as total FROM users WHERE email=? AND passwordHash=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email, passwordHash], function (err, result, fields) {
      if (err) reject(err);
      resolve(Boolean(result[0].total));
    });
  });
}

async function signUp(_, { email, passwordHash }) {
  const db = getDb();
  const date = new Date().toISOString();
  var sql = 'INSERT INTO users (email, passwordHash, date) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email, passwordHash, date], function (
      err,
      result,
      fields,
    ) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

async function userList(_, { offset, count, order = true }) {
  const db = getDb();
  var orderString = 'DESC';

  if (order) {
    orderString = 'ASC';
  }

  if (count) {
    var sql =
      'SELECT username, firstName, lastName, Address, country, phoneNumber, gender, email, referralID, referrerID, passwordHash, secretQ, secret, dp, wallet, date, admin FROM t_users ORDER BY date ' +
      orderString +
      ' LIMIT ?, ?';
    return new Promise((resolve, reject) => {
      res = db.query(sql, [offset, count], function (err, result, fields) {
        if (err) throw err;
        var graphqlResult = [];
        result.forEach((element) => {
          graphqlResult.push(element);
        });
        resolve(graphqlResult);
      });
    });
  } else {
    var sql =
      'SELECT username, firstName, lastName, Address, country, phoneNumber, gender, email, referralID, referrerID, passwordHash, secretQ, secret, dp, wallet, date, admin FROM t_users ORDER BY date ' +
      orderString;
    return new Promise((resolve, reject) => {
      res = db.query(sql, [offset, count], function (err, result, fields) {
        if (err) throw err;
        var graphqlResult = [];
        result.forEach((element) => {
          graphqlResult.push(element);
        });
        resolve(graphqlResult);
      });
    });
  }
}

async function update(_, { username, changes }) {
  const db = getDb();
  let updates = '';
  Object.keys(changes).forEach((key) => {
    updates += key + '=?';
  });
  var sql = 'UPDATE t_users SET ' + updates + 'WHERE username=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [...Object.values(changes), username], function (
      err,
      result,
      fields,
    ) {
      if (err) reject(err);
      resolve(true);
    });
  });
}

module.exports = {
  signUp,
  get,
  auth,
  userList,
  update,
};
