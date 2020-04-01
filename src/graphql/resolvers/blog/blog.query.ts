import blogModel from '../../../mongo/schemas/blog.schema'
import authorModel from '../../../mongo/schemas/author.schema'
import redis from '../../../redis'
import { authed } from '../../guards/authed.guard'

export const CACHE_KEYS = {
  BLOGS_ARR: 'blogs_arr',
  BLOGS_OBJ: 'blogs_obj',
  BLOGS_AUTHOR: 'blogs_author',
} as const

export default {

  getBlogs: async (_: any, __: any, context: any) => {
    authed(context)
    const isCached = await redis.get(CACHE_KEYS.BLOGS_ARR)
    if (isCached) {
      console.log('cache hit for getBlogs')
      return JSON.parse(isCached)
    }

    const blogs = await blogModel.find({}).lean()
    let withAuthors = []

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i]
      const author = await authorModel.findById(blog.authorID)
      withAuthors.push({ ...blog, author })
    }

    redis.set(CACHE_KEYS.BLOGS_ARR, JSON.stringify(withAuthors))

    return withAuthors
  },

  getBlog: async (_: any, args: any, context: any) => {
    authed(context)

    const { id } = args
    const isCached = await redis.get(CACHE_KEYS.BLOGS_OBJ)
    if (isCached) {
      const parsed = JSON.parse(isCached)

      if (parsed[id]) {
        console.log('cache hit for getBlog')
        return parsed[id]
      }
    }

    const blog = await blogModel.findById(id).lean()
    const author = await authorModel.findById(blog?.authorID).lean()

    if (isCached) {
      const parsed = JSON.parse(isCached)

      redis.set(CACHE_KEYS.BLOGS_OBJ, JSON.stringify({ ...parsed, [id]: { ...blog, author } }))
    } else {
      redis.set(CACHE_KEYS.BLOGS_OBJ, JSON.stringify({ [id]: { ...blog, author } }))
    }

    return { ...blog, author }
  },

  getBlogsByAuthor: async (_: any, args: any, context: any) => {
    authed(context)

    const { authorID } = args
    const isCached = await redis.get(CACHE_KEYS.BLOGS_AUTHOR)
    if (isCached) {
      const parsed = JSON.parse(isCached)

      if (parsed[authorID]) {
        console.log('cache hit for getBlog')
        return parsed[authorID]
      }
    }

    const blogs = await blogModel.find({ authorID }).lean()
    const author = await authorModel.findById(authorID).lean()
    const withAuthor = blogs.map(blog => ({ ...blog, author }))

    if (isCached) {
      const parsed = JSON.parse(isCached)

      redis.set(CACHE_KEYS.BLOGS_AUTHOR, JSON.stringify({ ...parsed, [authorID]: withAuthor }))
    } else {
      redis.set(CACHE_KEYS.BLOGS_OBJ, JSON.stringify({ [authorID]: withAuthor }))
    }

    return withAuthor
  }
}