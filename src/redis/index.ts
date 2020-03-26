import Redis from 'ioredis'

const REDIS_URL = process.env.REDIS || undefined

export default new Redis(REDIS_URL)