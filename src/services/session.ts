import crypto from 'crypto'
import { Inject, Service } from 'typedi'

import { pool as db } from '../db'
import UserService from './user'

@Service()
export default class SessionService {
    constructor(
        @Inject(() => UserService) private readonly userService: UserService
    ) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.findByEmail(email)

        if (user.password !== password) {
            throw new Error('Incorrect username or password!')
        }

        const query = 'INSERT INTO session (token, user_id) VALUES ($1, $2)'
        const token = crypto.randomBytes(32).toString('hex')
        await db.query(query, [token, user.id])

        return token
    }

    async logout(token: string, userId: number): Promise<{ message: string }> {
        const query = `DELETE FROM session WHERE token = $1 AND user_id = $2 RETURNING *`
        const { rows } = await db.query(query, [token, userId])
        if (rows.length === 0) {
            throw new Error('Session not found!')
        }

        return { message: 'Closed session!' }
    }
}
