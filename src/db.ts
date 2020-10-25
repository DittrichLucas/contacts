import { Pool } from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432
})

const createTable = `
    -- users table
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        password text NOT NULL
    );

    -- contact table
    CREATE TABLE IF NOT EXISTS contacts (
        id serial PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        user_id integer NOT NULL REFERENCES users("id") ON DELETE CASCADE
    );

    -- session table
    CREATE TABLE IF NOT EXISTS session (
        token text PRIMARY KEY NOT NULL,
        user_id integer NOT NULL REFERENCES users("id") ON DELETE CASCADE
    );
`

export async function init(): Promise<void> {
    try {
        await pool.query(createTable)
        console.log('Tables created successfully!')
    } catch (error) {
        console.log('Failed to create tables', error)
    }
}
