import authorModel from '../../../mongo/schemas/author.schema'
import redis from '../../../redis'
import { authed } from '../../guards/authed.guard'

export const CACHE_KEYS = {
  AUTHORS_ARR: 'authors_arr',
  AUTHORS_OBJ: 'authors_obj'
} as const


export default {

  getProfiles: async (_: any, __: any, context: any) => {
    authed(context)
    const isCached = await redis.get(CACHE_KEYS.AUTHORS_ARR)
    if (isCached) {
      return JSON.parse(isCached)
    }

    const authors = await authorModel.find({}).lean()
    redis.set(CACHE_KEYS.AUTHORS_ARR, JSON.stringify(authors))

    return authors
  },

  getProfile: async (_: any, args: any, context: any) => {
    authed(context)

    const { id } = args
    const isCached = await redis.get(CACHE_KEYS.AUTHORS_OBJ)
    if (isCached) {
      const parsed = JSON.parse(isCached)

      if (parsed[id]) {
        return parsed[id]
      }
    }

    const author = await authorModel.findById(id)

    if (isCached) {
      const parsed = JSON.parse(isCached)

      redis.set(CACHE_KEYS.AUTHORS_OBJ, JSON.stringify({ ...parsed, [id]: author }))
    }

    return author
  }
}