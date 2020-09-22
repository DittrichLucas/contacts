import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { pool as db } from './db'
import ContactsResolver from './resolvers/contact'
import SessionResolver from './resolvers/session'
import UserResolver from './resolvers/user'

export type Context = { userId: number }

async function context(ctx: any): Promise<Context> {
    const token = ctx.req.headers.authorization || ''
    const query = 'SELECT * FROM session WHERE token = $1'
    const response = await db.query(query, [token])

    if (response.rows.length === 0) {
        return ctx
    }

    return { ...ctx, userId: response.rows[0].user_id }
}

function authChecker(data: any) {
    const context = data.context

    return context.userId !== undefined
}

async function run() {
    const schema = await buildSchema({
        resolvers: [UserResolver, SessionResolver, ContactsResolver],
        authChecker })
    const server = new ApolloServer({ schema, context })

    return server.listen(3000)
}

run().then(() => {
    console.log('GraphQL server running...')
}).catch(() => {
    console.log('Could not connect to the server...')
})
