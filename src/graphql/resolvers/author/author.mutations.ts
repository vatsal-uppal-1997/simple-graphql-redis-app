import authorModel from '../../../mongo/schemas/author.schema'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../index'

export default {

  register: async (_: any, args: any) => {
    const { input } = args

    const author = new authorModel({
      ...input
    })

    return await author.save()
  },

  login: async (_: any, args: any) => {
    const { input } = args

    const result = await authorModel.verifyPassword(input.email, input.password)

    if (result) {
      const authToken = jwt.sign({ id: result.id }, JWT_SECRET)
      return { authToken }
    }

    throw new Error('Invalid email or password')
  },

}