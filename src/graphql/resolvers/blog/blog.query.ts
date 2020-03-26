import blogModel from '../../../mongo/schemas/blog.schema'
import redis from '../../../redis'
import { authed } from '../../guards/authed.guard'

export const CACHE_KEYS = {
  BLOGS_ARR: 'blogs_arr',
  BLOGS_OBJ: 'blogs_obj',
} as const

export default {

  getBlogs: async (_: any, __: any, context: any) => {
    authed(context)
    const isCached = await redis.get(CACHE_KEYS.BLOGS_ARR)
    if (isCached) {
      return JSON.parse(isCached)
    }

    const blogs = await blogModel.find({}).lean()
    redis.set(CACHE_KEYS.BLOGS_ARR, JSON.stringify(blogs))

    return blogs
  },

  getBlog: async (_: any, args: any, context: any) => {
    authed(context)

    const { id } = args
    const isCached = await redis.get(CACHE_KEYS.BLOGS_OBJ)
    if (isCached) {
      const parsed = JSON.parse(isCached)

      if (parsed[id]) {
        return parsed[id]
      }
    }

    const blog = await blogModel.findById(id)

    if (isCached) {
      const parsed = JSON.parse(isCached)

      redis.set(CACHE_KEYS.BLOGS_OBJ, JSON.stringify({ ...parsed, [id]: blog }))
    }

    return blog
  }
}