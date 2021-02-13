import { Inject } from 'typedi'
import * as Redis from 'ioredis'
import { v4 } from 'uuid'

const EXPIRATION_TIME = 1200

export default class SessionStore implements SessionStore {
    constructor(
        @Inject(() => Redis.default) private readonly redis: Redis.Redis
    ) { }

    async create(userId: string) {
        const token = v4()
        await this.redis.set(token, userId, 'ex', EXPIRATION_TIME)
        return token
    }

    async find(token: string): Promise<string | null> {
        return this.redis.get(token)
    }

    async delete(token: string) {
        const deleted = await this.redis.del(token)
        return deleted
            ? { message: 'Token removed!' }
            : { message: 'Token not found' }
    }
}
