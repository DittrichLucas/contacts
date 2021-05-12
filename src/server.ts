import { ApolloServer } from 'apollo-server'
import Logger from '../logger'
import { Container, Inject, Service } from 'typedi'
import { buildSchema, ResolverData } from 'type-graphql'

import ContextHandler, { OptionalSessionContext } from './context'

const PORT = 3000

function authChecker({ context }: ResolverData<OptionalSessionContext>) {
    return context.session !== undefined
}

@Service()
export default class Server {
    constructor(
        @Inject(() => ContextHandler)
        private readonly contextHandler: ContextHandler
    ) { }

    async start() {
        const schema = await buildSchema({
            container: Container,
            resolvers: [`${__dirname}/graphql/resolvers/*`],
            authChecker,
            validate: true
        })
        const server = new ApolloServer({
            playground: true,
            schema,
            context: this.contextHandler.getContext.bind(this.contextHandler)
        })

        await server.listen(PORT, () => {
            Logger.info(`Server running on port ${PORT}`)
        })
    }
}
