import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { validate } from 'uuid'

import { User } from './models/user'
import { SessionStore } from './store/session-store'
import RedisSessionStore from './store/redis-session-store'

export interface Session {
    token: string
    user: User
}

type RequestContext = {
    req: {
        headers: {
            [key: string]: string | undefined
        }
    }
}

export type Context = RequestContext & {
    session: Session
}

export type OptionalSessionContext = RequestContext & {
    session?: Session
}

@Service()
export default class ContextHandler {
    constructor(
        @Inject(() => RedisSessionStore)
        private readonly sessionStore: SessionStore,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getContext(context: RequestContext): Promise<OptionalSessionContext> {
        const { authorization: token } = context.req.headers
        if (token === undefined || !validate(token)) {
            return context
        }

        const userId = await this.sessionStore.find(token)
        if (!userId) {
            return context
        }

        const user = await this.userRepository.findOneOrFail(userId)

        return { ...context, session: { token, user } }
    }
}
