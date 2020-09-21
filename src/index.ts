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
    console.log(ctx.req.headers)
    const query = 'SELECT * FROM session WHERE token = $1'
    const resposta = await db.query(query, [token])

    console.log(resposta.rows)

    if (resposta.rows.length === 0) {
        return ctx
    }

    return { ...ctx, userId: resposta.rows[0].user_id }
}

function authChecker(dados: any) {
    const context = dados.context

    return context.userId !== undefined
}

async function run() {
    const schema = await buildSchema({
        resolvers: [UserResolver, SessionResolver, ContactsResolver],
        authChecker })
    const server = new ApolloServer({ schema, context })

    return server.listen(3000)usuarios

run().then(() => {
    console.log('Servidor GraphQL rodando...')
}).catch(() => {
    console.log('Não foi possível conectar-se ao servidor...')
})
