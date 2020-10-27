import * as crypto from 'crypto'
import { Service } from 'typedi'

import { pool as db } from '../db'

@Service()
export default class SessionService {
    async login(email: string, password: string) {
        const query = 'SELECT * FROM users WHERE email = $1'
        const resUser = await db.query(query, [email])
        const user = resUser.rows[0]

        if (user && user.password === password) {
            const query = 'INSERT INTO session (token, user_id) VALUES ($1, $2)'
            const token = crypto.randomBytes(32).toString('hex')
            await db.query(query, [token, user.id])

            return token
        } else {
            throw new Error('Incorrect username or password!')
        }
    }

    async logout(token: string, userId: number) {
        const text = `DELETE FROM session WHERE token = $1 AND user_id = $2 RETURNING *`
        const res = await db.query(text, [token, userId])
        const message = res.rows.length === 0 ? 'Contact not found!' : 'Closed session!'
        return { message }
    }
}

