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
import { Inject } from 'typedi'

import { Context } from '../index'
import UserService from '../services/user'

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
    constructor(
        @Inject(() => UserService) private readonly userService: UserService
    ) {}

    @Query(_ => [User])
    async findAll() {
        return this.userService.findAll()
    }

    @Query(_ => [User])
    async findById(@Arg('id') id: number) {
        return this.userService.findById(id)
    }

    @Mutation(_ => Status)
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        return this.userService.create(name, email, password)
    }

    @Authorized()
    @Mutation(_ => Status)
    async update(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: Context
        ) {
        return this.userService.update(context.userId, name, email, password)
    }

    @Authorized()
    @Mutation(_ => Status)
    async remove(@Ctx() context: Context) {
        return this.userService.remove(context.userId)
    }

}
