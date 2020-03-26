import Redis from 'ioredis'

const REDIS_URL = process.env.REDISCLOUD_URL || undefined

export default new Redis(REDIS_URL)