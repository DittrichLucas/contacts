import { Inject, Service } from 'typedi'
import { pool as db } from '../db'
import ContactService, { Contact } from './contact'

interface User {
    id: number
    email: string
    name: string
    password: string
}

type UserPayload = Omit<User, 'id'>

@Service()
export default class UserService {
    constructor(
        @Inject(() => ContactService) private readonly contactService: ContactService
    ) {}

    async create({ name, email, password }: UserPayload): Promise<User> {
        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        const { rows }: { rows: User[] } = await db.query(query, [name, email, password])
        const [user] = rows

        return user
    }

    async update(id: number, { name, email, password }: UserPayload): Promise<User> {
        const query = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *'
        const { rows }: { rows: User[] } = await db.query(query, [name, email, password, id])
        const [user] = rows

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async remove(id: number): Promise<User> {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
        const { rows }: { rows: User[] } = await db.query(query, [id])
        const [user] = rows

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async findAll(): Promise<User[]> {
        const result = await db.query('SELECT * FROM users')
        return result.rows
    }

    async findByEmail(email: string): Promise<User> {
        const query = 'SELECT * FROM users WHERE email = $1'
        const { rows }: { rows: User[] } = await db.query(query, [email])
        const [user] = rows

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async findById(id: number): Promise<User> {
        const query = 'SELECT * FROM users WHERE id = $1'
        const { rows }: { rows: User[] } = await db.query(query, [id])
        const [user] = rows

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async findContacts(userId: number): Promise<Contact[]> {
        const query = 'SELECT * FROM contacts WHERE user_id = $1'
        const { rows }: { rows: Contact[] } = await db.query(query, [userId])

        return rows
    }
}
