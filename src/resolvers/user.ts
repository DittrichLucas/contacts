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
import { Contact } from '../services/contact'
import UserService from '../services/user'

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
    async findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Query(_ => [User])
    async findById(@Arg('id') id: number): Promise<User> {
        return this.userService.findById(id)
    }

    @Authorized()
    @Query(_ => User)
    async findContacts(@Ctx() context: Context): Promise<Contact[]> {
        return this.userService.findContacts(context.userId)
    }

    @Mutation(_ => User)
    async createUser(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<Omit<User, 'id'>> {
        return this.userService.create({ name, email, password })
    }

    @Authorized()
    @Mutation(_ => User)
    async updateUser(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: Context
    ): Promise<User> {
        return this.userService.update(context.userId, { name, email, password })
    }

    @Authorized()
    @Mutation(_ => User)
    async removeUser(@Ctx() context: Context): Promise<User> {
        return this.userService.remove(context.userId)
    }
}
