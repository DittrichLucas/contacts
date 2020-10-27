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
        @Inject(() => SessionService) private readonly session: SessionService
    ) {}

    @Mutation(_ => String)
    async createSession(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        return this.session.login(email, password)
    }

    @Mutation(_ => Session)
    async deleteSession(
        @Arg('token') token: string,
        @Ctx() context: Context
    ) {
        return this.session.logout(token, context.userId)
    }
}
