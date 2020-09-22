import {
    Arg,
    Authorized,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver
} from 'type-graphql'

import { Context } from '..'
import * as service from '../services/contact'

@ObjectType()
class Response {
    @Field()
    message: string
}

@ObjectType()
class Contact {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    userId: number
}

@Resolver()
export default class ContactsResolver {

    @Authorized()
    @Query(_ => [Contact])
    async contact(@Ctx() context: Context) {
        return service.findByUserId(context.userId)
    }

    @Authorized()
    @Query(_ => [Contact])
    async contactId(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.findById(id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Ctx() context: Context
    ) {
        return service.create(name, email, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async update(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.update(name, email, id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async delete(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.remove(id, context.userId)
    }

}
