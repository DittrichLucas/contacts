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

import { Context } from '../index'
import * as service from '../services/user'

@ObjectType()
class Status {
    @Field()
    message: string
}

@ObjectType()
class User {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string
}

@Resolver()
export default class UserResolver {
    @Query(_ => [User])
    async findAll() {
        return service.findAll()
    }

    @Query(_ => [User])
    async findById(@Arg('id') id: number) {
        return service.findById(id)
    }

    @Mutation(_ => Status)
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        return service.create(name, email, password)
    }

    @Authorized()
    @Mutation(_ => Status)
    async update(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: Context
        ) {
        return service.update(context.userId, name, email, password)
    }

    @Authorized()
    @Mutation(_ => Status)
    async remove(@Ctx() context: Context) {
        return service.remove(context.userId)
    }

}
