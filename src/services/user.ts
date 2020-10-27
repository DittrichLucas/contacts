import { Service } from 'typedi'
import { pool as db } from '../db'

type MessagePromise = Promise<{ message: string }>

@Service()
export default class UserService {
    async create(name: string, email: string, password: string): MessagePromise {
        const text = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        const { rows } = await db.query(text, [name, email, password])
        const message = rows.length === 0 ? 'Name, email or password is missing!' : 'Created user!'
        return { message }
    }

    async update(id: number, name: string, email: string, password: string): MessagePromise {
        const text = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *'
        const { rows } = await db.query(text, [name, email, password, id])
        const message = rows.length === 0 ? 'User not found!' : 'Updated user!'
        return { message }
    }

    async remove(id: number): MessagePromise {
        const text = 'DELETE FROM users WHERE id = $1 RETURNING *'
        await db.query(text, [id])
        return { message: 'Removed user!' }
    }

    async findAll(): Promise<unknown[]> {
        const result = await db.query('SELECT * FROM users')
        return result.rows
    }

    async findById(id: number): Promise<typeof text | MessagePromise> {
        const text = 'SELECT * FROM users WHERE id = $1'
        const { rows } = await db.query(text, [id])
        const message = 'Name, email or password is missing!'
        return rows.length === 0 ? { message } : text
    }
}
