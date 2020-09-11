const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const GraphQLDate = require('./graphql_date.js');
const { setMessage, getMessage } = require('./about.js');
const users = require('./users.js');
const resetTokens = require('./resetTokens.js');

let aboutMessage = 'Issue Tracker API v1.0';

const resolvers = {
  Query: {
    about: () => aboutMessage,
    user: users.get,
    auth: users.auth,
    userList: users.userList,
    getResetToken: resetTokens.get,
    getResetTokenWithToken: resetTokens.getWithToken,
  },
  Mutation: {
    signUp: users.signUp,
    setAboutMessage: setMessage,
    updateUser: users.update,
    createResetToken: resetTokens.create,
    deleteResetToken: resetTokens.clear,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('api/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
