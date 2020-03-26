import { gql } from 'apollo-server'


export default gql`

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

`