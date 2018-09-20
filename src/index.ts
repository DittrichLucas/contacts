import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import UserResolver from './resolvers/usuarios'
import SessionResolver from './resolvers/sessoes'
import ContactsResolver from './resolvers/contatos'
import { pool as db } from './db'

export type Context = { userId: number }

async function context(ctx: any): Promise<Context> {
	const token = ctx.req.headers['authorization'] || ''
	console.log(ctx.req.headers)
	const resposta = await db.query('SELECT * FROM session WHERE token = $1', [token])

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
	const schema = await buildSchema({ resolvers: [UserResolver, SessionResolver, ContactsResolver], authChecker })
	const server = new ApolloServer({ schema, context });
	return server.listen(3000)
}

run().then(() => {
	console.log('Servidor GraphQL rodando...')
})





