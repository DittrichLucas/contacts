import { ApolloServer } from 'apollo-server'
import { Container, Inject, Service } from 'typedi'
import { buildSchema, ResolverData } from 'type-graphql'

import ContextHandler, { OptionalSessionContext } from './context'

function authChecker({ context }: ResolverData<OptionalSessionContext>) {
    return context.session !== undefined
}

@Service()
export default class Server {
    constructor(
        @Inject(() => ContextHandler) private readonly contextHandler: ContextHandler
    ) {}

    async start() {
        const schema = await buildSchema({
            container: Container,
            resolvers: [`${__dirname}/resolvers/*`],
            authChecker,
            validate: false
        })
        const server = new ApolloServer({
            playground: true,
            schema,
            context: this.contextHandler.getContext.bind(this.contextHandler)
        })

        await server.listen(3000)
    }
}
