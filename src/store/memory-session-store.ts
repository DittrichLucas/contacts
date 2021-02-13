import { v4 } from 'uuid'
import { SessionStore } from './session-store'

const SPACE = 2

export default class MemorySessionStore implements SessionStore {
    private readonly sessions: { [key: string]: string } = {}

    async create(userId: string): Promise<string> {
        console.log('creating session', { userId })
        const token = v4()
        this.sessions[token] = userId
        return token
    }

    async find(token: string): Promise<string | null> {
        console.log('all sessions', JSON.stringify(this.sessions, null, SPACE))
        console.log('finding user by token', { token })
        return this.sessions[token] || null
    }

    async delete(token: string): Promise<{ message: string }> {
        console.log('deleting session', { token })
        const userId = this.sessions[token]
        delete this.sessions[token]
        return userId
            ? { message: 'Token removed!' }
            : { message: 'Token not found' }
    }
}
