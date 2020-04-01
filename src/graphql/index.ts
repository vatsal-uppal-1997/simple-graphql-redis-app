import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server'

import typeDefs from './schemas'
import resolvers from './resolvers'

import authorModel from '../mongo/schemas/author.schema'

export const JWT_SECRET = 'NOT_SO_SECURE_ISNT_IT'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context
    }

    const token = req.headers.authorization || "";

    if (!token) {
      return {}
    }

    const userId = (jwt.verify(token, JWT_SECRET) as any).id

    const userInfo = await authorModel.findById(userId)
    
    return {
      userInfo
    } 
  }
})

export default server