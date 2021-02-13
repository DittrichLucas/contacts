import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from '../../context'
import SessionService from '../../services/session'
import { Logout, Session, UserSession } from '../dto/session'

@Resolver()
export default class SessionResolver {
    constructor(
        @Inject(() => SessionService)
        private readonly sessionService: SessionService
    ) { }

    @Mutation((_) => Session)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<Session> {
        return this.sessionService.login(email, password)
    }

    @Authorized()
    @Query((_) => UserSession)
    async whoami(@Ctx() context: Context): Promise<UserSession> {
        return context.session.user
    }

    @Mutation((_) => Logout)
    async logout(@Ctx() context: Context): Promise<{ message: string }> {
        return this.sessionService.logout(context.session.token)
    }
}
