"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Author {
    _id: String!
    firstName: String!
    lastName:  String!
    email: String!
    userName: String!
  }

  type Tokens {
    authToken:  String!
  }

  input RegisterInput {
    firstName:  String!
    lastName: String!
    email:  String!
    userName: String!
    password: String!
  }

  input LoginInput {
    email:  String!
    password: String!
  }

  type Query {

    getProfiles: [Author]!
    getProfile(id: String!): Author!

  }

  type Mutation {

    register(input: RegisterInput!): Author!
    login(input: LoginInput!):  Tokens!

  }
`;
//# sourceMappingURL=author.schema.js.map