import fs from 'fs'
import { v4 } from 'uuid'
import { SessionStore } from './session-store'

const SESSION_JSON = './session.json'

export class FileSessionStore implements SessionStore {
    async create(userId: string): Promise<string> {
        if (!fs.existsSync(SESSION_JSON)) {
            fs.writeFileSync(SESSION_JSON, '{}')
        }

        const sessions = JSON.parse(fs.readFileSync(SESSION_JSON, { encoding: 'utf-8' }))
        const token = v4()
        sessions[token] = userId

        fs.writeFileSync(SESSION_JSON, JSON.stringify(sessions, null, 4))

        return token
    }

    async find(token: string): Promise<string | null> {
        const sessions = JSON.parse(fs.readFileSync(SESSION_JSON, { encoding: 'utf-8' }))
        return sessions[token] || null
    }

    async delete(token: string): Promise<{ message: string }> {
        const sessions = JSON.parse(fs.readFileSync(SESSION_JSON, { encoding: 'utf-8' }))
        const userId = sessions[token]
        delete sessions[token]
        fs.writeFileSync(SESSION_JSON, JSON.stringify(sessions, null, 4))
        return userId ? { message: 'Token removed!' } : { message: 'Token not found' }
    }
}
