import { Inject, Service } from 'typedi'
import { validate } from 'uuid'

import Session from './models/session'
import SessionService from './services/session'

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
        @Inject(() => SessionService) private readonly sessionService: SessionService
    ) {}

    async getContext(context: RequestContext): Promise<OptionalSessionContext> {
        const { authorization: token } = context.req.headers
        if (token === undefined || !validate(token)) {
            return context
        }

        const session = await this.sessionService.find(token)

        return { ...context, session }
    }
}
