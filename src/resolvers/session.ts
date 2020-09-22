import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql'

import { Context } from '..'
import * as service from '../services/session'

@ObjectType()
class Session {
    @Field()
    message: string
}

@Resolver()
export default class SessionResolver {
    @Mutation(_ => String)
    async create(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        return service.create(email, password)
    }

    @Mutation(_ => Session)
    async delete(
        @Arg('token') token: string,
        @Ctx() context: Context
    ) {
        return service.remove(token, context.userId)
    }

}
