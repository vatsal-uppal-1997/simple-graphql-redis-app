import { gql } from 'apollo-server'


export default gql`
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
`