import { pool as db } from '../db'

export async function create(
    name: string,
    email: string,
    userId: number
    ) {
        const text = `INSERT INTO contacts (name, email, user_id)
            VALUES ($1, $2, $3) RETURNING *`
        const value = [name, email, userId]

        await db.query(text, value)

    return { message: 'Contact created!' }
}

export async function update(
    name: string,
    email: string,
    id: number,
    userId: number
) {
    const text = `UPDATE contacts
        SET name = $1, email = $2
        WHERE id = $3 AND user_id = $4;`
    const value = [name, email, id, userId]

    await db.query(text, value)

    return { message: 'Contact updated!' }
}

export async function remove(id: number, userId: number) {
    const text = `DELETE FROM contacts
        WHERE id = $1 AND user_id = $2 RETURNING *`
    const value = [id, userId]
    const res = await db.query(text, value)

    if (res.rows.length === 0) {
        return { message: 'Contact not found!' }
    }

    return { message: 'Contact removed!' }
}

export async function findByUserId(userId: number) {
    const text = 'SELECT * FROM contacts WHERE user_id = $1;'
    const value = [userId]
    const res = await db.query(text, value)

    return res.rows
}

export async function findById(id: number, userId: number) {
    const text = 'SELECT * FROM contacts WHERE id = $1 user_id = $2;'
    const value = [id, userId]
    const res = await db.query(text, value)

    return res.rows
}
