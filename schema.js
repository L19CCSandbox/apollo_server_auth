const {gql} = require('apollo-server');

const typeDefs = gql `
    type User {
        name: String!
        username: String!
        id: Int
    }

    type Query {
        users: [User]
    }

    type Mutation {
        register(data: registerInput!) : AuthPayLoad!
        login(data: loginInput!) : AuthPayLoad!
    }

    input registerInput {
        username: String!
        name: String!
        password: String!
    }

    input loginInput {
        username: String!
        password: String!
    }

    type AuthPayLoad {
        token: String!
    }
`;

module.exports = typeDefs;