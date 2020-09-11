const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db.js');
const { escape } = require('mysql');
const crypto = require('crypto');

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

/*
query getResetToken($email: String!){
  getResetToken(email: $email){email, token, expiration, used}
}

{"email": "efagenevalentine@gmail.com"}
*/
async function get(_, { email }) {
  const db = getDb();
  var sql = 'SELECT * FROM resettokens WHERE email=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email], function (err, result, fields) {
      if (err) reject(err);
      let r = Object.assign({}, result[0]);
      resolve(r);
    });
  });
}

/*
query getResetTokenWithToken($token: String!){
  getResetTokenWithToken(token: $token){email, token, expiration, used}
}

{"token": "MLyK2JqUh5vd1Czq12qEi/PdyqznWraTEhn+c1bXp1bwE4IowcozVjpvFMelhWXVhw+u/SykP27CiAdVmuKyYw=="}
*/

async function getWithToken(_, { token }) {
  console.log('api ' + token);
  const db = getDb();
  var sql = 'SELECT * FROM resettokens WHERE token=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [token], function (err, result, fields) {
      if (err) reject(err);
      let r = Object.assign({}, result[0]);
      console.log(r);
      resolve(r);
    });
  });
}

/*
mutation createResetToken($email: String!){
  createResetToken(email: $email)
}

{"email": "efagenevalentine@gmail.com"}
*/
async function create(_, { email }) {
  const token = crypto.randomBytes(64).toString('hex');
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 1 / 24);
  console.log('email ' + email);
  const db = getDb();
  var sql =
    'INSERT INTO resettokens (email, token, expiration) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email, token, expiration.toISOString()], function (
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

/*
mutation deletResetToken($email: String!){
  deleteResetToken(email: $email)
}

{"email": "efagenevalentine@gmail.com"}
*/

async function clear(_, { email }) {
  const db = getDb();
  var sql = 'DELETE FROM resettokens WHERE email=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [email], function (err, result, fields) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
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
  create,
  get,
  getWithToken,
  clear,
};
