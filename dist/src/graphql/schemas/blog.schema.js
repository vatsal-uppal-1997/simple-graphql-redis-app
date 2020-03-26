"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `

  type Blog {

    _id: String!
    title: String!
    author:  Author!
    body: String!

  }

  input AddBlogInput {
    title:  String!
    body: String!
  }

  input UpdateBlogInput {
    id: String!
    title:  String
    body: String
  }

  extend type Query {

    getBlogs: [Blog]!
    getBlog(id: String): Blog!

  }

  extend type Mutation {

    addBlog(input: AddBlogInput!): Blog!
    updateBlog(input: UpdateBlogInput!): Blog!
    deleteBlog(id: String!): Blog!

  }

  type Subscription {

    blogAdded:  Blog!
    blogDeleted:  Blog!
    blogUpdated:  Blog!

  }

`;
//# sourceMappingURL=blog.schema.js.map