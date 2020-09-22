import { any } from 'bluebird'
import { Pool } from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432
})

const createtable = `
	-- users table
	CREATE TABLE users (
		id serial PRIMARY KEY,
		name text NOT NULL,
		email text NOT NULL,
		password text NOT NULL
	);

	-- contact table
	CREATE TABLE contacts (
		id serial PRIMARY KEY,
		name text NOT NULL,
		email text NOT NULL,
		user_id integer NOT NULL REFERENCES users("id") ON DELETE CASCADE
	);

	-- session table
	CREATE TABLE session (
		token text PRIMARY KEY NOT NULL,
		user_id integer NOT NULL REFERENCES users("id") ON DELETE CASCADE
	);
`
export const init = any([
    pool.query('DROP TABLE contacts'),
    pool.query('DROP TABLE users'),
    pool.query('DROP TABLE session')
    ])
    .catch(() => { /*withou error handling*/ })
    .then(() => pool.query(createtable))
    .then(() => {
        console.log('Tables created successfully!')
    })
    .catch((err: Error) => {
        console.log(`Failed to create tables: ${err.message}`)
    })
