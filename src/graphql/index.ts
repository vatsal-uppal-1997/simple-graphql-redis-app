import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server'

import typeDefs from './schemas'
import resolvers from './resolvers'

import authorModel from '../mongo/schemas/author.schema'

export const JWT_SECRET = 'NOT_SO_SECURE_ISNT_IT'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const userId = (jwt.verify(token, JWT_SECRET) as any).id

    const userInfo = await authorModel.findById(userId)
    
    return {
      userInfo
    } 
  }
})

export default server