const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db.js');

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

async function get(_, { username }) {
  const db = getDb();
  var sql =
    'SELECT username, firstName, lastName, Address, country, phoneNumber, gender, email, referralID, referrerID, passwordHash, secretQ, secret, dp, wallet, date, admin FROM t_users WHERE username=?';
  return new Promise((resolve, reject) => {
    res = db.query(sql, [username], function (err, result, fields) {
      if (err) throw err;
      var r = Object.assign({}, result[0]);
      resolve(r);
    });
  });
}

module.exports = {
  get,
};
