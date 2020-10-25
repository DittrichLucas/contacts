import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import type { Request } from 'express'
import { Container } from 'typedi'
import { buildSchema, ResolverData } from 'type-graphql'

import { init, pool as db } from './db'
import ContactResolver from './resolvers/contact'
import SessionResolver from './resolvers/session'
import UserResolver from './resolvers/user'

export type Context = { userId: number }

type OptionalUserContext = Partial<Context>

async function context(context: { req: Request }): Promise<typeof context & OptionalUserContext> {
    const token = context.req.headers.authorization || ''
    const query = 'SELECT * FROM session WHERE token = $1'
    const response = await db.query(query, [token])

    const [firstRow]: { user_id: number }[] = response.rows

    return firstRow === undefined
        ? context
        : { ...context, userId: firstRow.user_id }
}

function authChecker({ context }: ResolverData<OptionalUserContext>) {
    return context.userId !== undefined
}

async function run() {
    const schema = await buildSchema({
        resolvers: [ContactResolver, SessionResolver, UserResolver],
        authChecker,
        container: Container
    })

    const server = new ApolloServer({ schema, context })

    return server.listen(3000)
}

init().then(run).then(() => {
    console.log('GraphQL server running...')
}).catch((error: Error) => {
    console.error('Could not connect to the server', error)
})
