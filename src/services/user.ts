import { pool as db } from '../db'

export async function create(name: string, email: string, password: string) {
    const text = `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3) RETURNING *`
        const values = [name, email, password]

    try {
        await db.query(text, values)

        return { message: 'Created user!' }
    } catch (err) {
        return { message: 'Name, email or password is missing!' }
    }
}

export async function update(
    id: number,
    name: string,
    email: string,
    password: string
    ) {
    const text = `UPDATE users
        SET name = $1, email = $2, password = $3
        WHERE id = $4 RETURNING *`
    const values = [name, email, password, id]

    try {
        await db.query(text, values)

        return { message: 'Updated user!' }
    } catch (err) {
        return { message: 'User not found!' }
    }
}

export async function remove(id: number) {
    const text = 'DELETE FROM users WHERE id = $1 RETURNING *'
    const value = [id]
    await db.query(text, value)

    return { message: 'Removed user!' }
}

export async function findAll() {
    const result = await db.query('SELECT * FROM users')

    return result.rows
}

export async function findById(id: number) {
    const text = 'SELECT * FROM users WHERE id = $1'
    const values = [id]

    try {
        await db.query(text, values)

        return text
    } catch (err) {
        return { message: 'Name, email or password is missing!' }
    }
}
