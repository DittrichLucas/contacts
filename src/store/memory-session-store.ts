import Logger from '../../logger'
import { v4 } from 'uuid'
import { SessionStore } from './session-store'

const SPACE = 2

export default class MemorySessionStore implements SessionStore {
    private readonly sessions: { [key: string]: string } = {}

    async create(userId: string): Promise<string> {
        Logger.info('creating session', { userId })

        const token = v4()

        this.sessions[token] = userId

        return token
    }

    async find(token: string): Promise<string | null> {
        Logger.info('all sessions', JSON.stringify(this.sessions, null, SPACE))
        Logger.info('finding user by token', { token })

        return this.sessions[token] || null
    }

    async delete(token: string): Promise<{ message: string }> {
        Logger.info('deleting session', { token })

        const userId = this.sessions[token]

        delete this.sessions[token]

        return userId
            ? { message: 'Token removed!' }
            : { message: 'Token not found' }
    }
}
