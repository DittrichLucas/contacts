import { Service } from 'typedi'

import { pool as db } from '../db'

export interface Contact {
    id: number
    name: string
    email: string
    userId: number
}

type ContactCreate = Omit<Contact, 'id' | 'userId'>
type ContactUpdate = Omit<Contact, 'userId'>

// TODO:
// - Use *Payload types for method signature DONE
// - Create interface in this file for the contacts DONE
// - Get rid of MessagePromise. Return Promise<Contact> when necessary DONE
// - Invert knowledge domain: a user should know what a contact is, but a
//   contact doesn't need to know a user. Add method findContacts
// - Add types for the return of methods in resolvers DONE
// - Spike TypeOrm configuration if you have some free time!
@Service()
export default class ContactService {
    async create(userId: number, { name, email }: ContactCreate): Promise<Contact> {
        const query = 'INSERT INTO contacts (name, email, user_id) VALUES ($1, $2, $3) RETURNING *'
        const { rows }: { rows: Contact[] } = await db.query(query, [name, email, userId])
        const [contact] = rows

        return contact
    }

    async update(userId: number, { name, email, id }: ContactUpdate): Promise<Contact> {
        const query = 'UPDATE contacts SET name = $1, email = $2 WHERE id = $3 AND user_id = $4'
        const { rows }: { rows: Contact[] } = await db.query(query, [name, email, id, userId])
        const [contact] = rows

        if (!contact) {
            throw new Error('Contact not found')
        }

        return contact
    }

    async remove(id: number, userId: number): Promise<Contact> {
        const query = 'DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING *'
        const { rows }: { rows: Contact[] } = await db.query(query, [id, userId])
        const [contact] = rows

        if (!contact) {
            throw new Error('Contact not found')
        }

        return contact
    }

    async findById(id: number, userId: number): Promise<Contact> {
        const query = 'SELECT * FROM contacts WHERE id = $1 user_id = $2'
        const { rows }: { rows: Contact[] } = await db.query(query, [id, userId])
        const [contact] = rows

        if (!contact) {
            throw new Error('Contact not found')
        }

        return contact
    }
}
