import { Service } from 'typedi'

import { pool as db } from '../db'

type MessagePromise = Promise<{ message: string }>

@Service()
export default class ContactService {
    async create(name: string, email: string, userId: number): MessagePromise {
        const text = 'INSERT INTO contacts (name, email, user_id) VALUES ($1, $2, $3) RETURNING *'
        await db.query(text, [name, email, userId])
        return { message: 'Contact created!' }
    }

    async update(name: string, email: string, id: number, userId: number): MessagePromise {
        const text = 'UPDATE contacts SET name = $1, email = $2 WHERE id = $3 AND user_id = $4;'
        await db.query(text, [name, email, id, userId])
        return { message: 'Contact updated!' }
    }

    async remove(id: number, userId: number): MessagePromise {
        const text = 'DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING *'
        const result = await db.query(text, [id, userId])
        const message = result.rows.length === 0 ? 'Contact not found!' : 'Contact removed!'
        return { message }
    }

    async findByUserId(userId: number): Promise<unknown[]> {
        const text = 'SELECT * FROM contacts WHERE user_id = $1;'
        const { rows } = await db.query(text, [userId])
        console.log(rows)
        return rows
    }

    async findById(id: number, userId: number): Promise<unknown[]> {
        const text = 'SELECT * FROM contacts WHERE id = $1 user_id = $2;'
        const { rows } = await db.query(text, [id, userId])
        return rows
    }
}
