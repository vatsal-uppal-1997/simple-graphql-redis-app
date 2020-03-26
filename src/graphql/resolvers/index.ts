import blobSubscriptions from './blog/blog.subscriptions'

import authorQueries from './author/author.query'
import blogQueries from './blog/blog.query'

import authorMutations from './author/author.mutations'
import blogMutations from './blog/blog.mutations'




export default {
  Subscription: {
    ...blobSubscriptions,
  },
  Query: {
    ...authorQueries,
    ...blogQueries,
  },
  Mutation: {
    ...authorMutations,
    ...blogMutations,
  },
};