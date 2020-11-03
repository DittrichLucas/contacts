import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from '..'
import SessionService from '../services/session'

@ObjectType()
class Session {
    @Field()
    message: string
}

@Resolver()
export default class SessionResolver {
    constructor(
        @Inject(() => SessionService) private readonly sessionService: SessionService
    ) {}

    @Mutation(_ => String)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<string> {
        return this.sessionService.login(email, password)
    }

    @Mutation(_ => Session)
    async logout(
        @Arg('token') token: string,
        @Ctx() context: Context
    ): Promise<{ message: string }> {
        return this.sessionService.logout(token, context.userId)
    }
}
