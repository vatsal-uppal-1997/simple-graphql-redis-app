import { PubSub } from 'apollo-server'

export const pubsub = new PubSub()

export const EVENTS = {
  BLOG_ADDED: 'BLOG_ADDED',
  BLOG_UPDATED: 'BLOG_UPDATED',
  BLOG_DELETED: 'BLOG_DELETED',
} as const

export default {

  blogAdded: {
    subscribe: () => pubsub.asyncIterator([EVENTS.BLOG_ADDED]),
  },

  blogDeleted: {
    subscribe: () => pubsub.asyncIterator([EVENTS.BLOG_DELETED]),
  },

  blogUpdated: {
    subscribe: () => pubsub.asyncIterator([EVENTS.BLOG_UPDATED]),
  },

}