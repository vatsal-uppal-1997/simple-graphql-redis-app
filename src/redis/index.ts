import Redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || undefined
console.log('REDIS_URL', REDIS_URL)
export default new Redis(REDIS_URL)