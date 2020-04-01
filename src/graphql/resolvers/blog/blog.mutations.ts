import blogModel from '../../../mongo/schemas/blog.schema'
import redis from '../../../redis'
import { pubsub, EVENTS } from './blog.subscriptions'
import { CACHE_KEYS } from './blog.query'
import { authed } from '../../guards/authed.guard'

export default {

  addBlog: async (_: any, args: any, context: any) => {
    const userInfo = authed(context)
    const { input } = args

    const blog = new blogModel({
      ...input,
      authorID: userInfo.id || userInfo._id,
    })

    await blog.save()

    // invalidate the cache
    redis.del(CACHE_KEYS.BLOGS_ARR, CACHE_KEYS.BLOGS_OBJ)
    const withAuthor = { ...blog.toObject(), author: userInfo }
    pubsub.publish(EVENTS.BLOG_ADDED, { blogAdded: withAuthor });
    return withAuthor
  },

  updateBlog: async (_: any, args: any, context: any) => {
    const userInfo = authed(context)
    const { input } = args

    const blog = await blogModel.findOne({
      _id: input.id,
      authorID: userInfo.id || userInfo._id,
    })
    if (!blog) {
      throw new Error('No such blog exists')
    }

    let update: { title?: string, body?: string } = {}

    if (input.title) {
      update.title = input.title
    }
    if (input.body) {
      update.body = input.body
    }
    if (Object.keys(update).length === 0) {
      return blog
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(input.id, {
      $set: {
        ...update
      }
    }, { new: true }).lean()

    // invalidate the cache
    redis.del(CACHE_KEYS.BLOGS_ARR, CACHE_KEYS.BLOGS_OBJ)
    const withAuthor = { ...updatedBlog, author: userInfo }
    pubsub.publish(EVENTS.BLOG_UPDATED, { blogUpdated: withAuthor })
    return withAuthor
  },

  deleteBlog: async (_: any, args: any, context: any) => {
    const userInfo = authed(context)
    const { id } = args

    const blog = await blogModel.findOne({
      _id: id,
      authorID: userInfo.id || userInfo._id,
    })
    if (!blog) {
      throw new Error('No such blog exists')
    }

    await blogModel.findByIdAndDelete(id)

    // invalidate the cache
    redis.del(CACHE_KEYS.BLOGS_ARR, CACHE_KEYS.BLOGS_OBJ)
    const withAuthor = { ...blog, author: userInfo }
    pubsub.publish(EVENTS.BLOG_UPDATED, { blogDeleted: withAuthor })
    return withAuthor
  }
}