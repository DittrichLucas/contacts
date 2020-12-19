import {
    Arg,
    Authorized,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver
} from 'type-graphql'
import { Inject } from 'typedi'
import { User } from '../../models/user'

import { Context } from '../../context'
import { Contact } from '../../models/contact'
import UserService from '../../services/user'
import { ContactObject } from '../dto/contact'
import { UserInput, UserObject, UserUpdate } from '../dto/user'

@Resolver()
export default class UserResolver {
    constructor(
        @Inject(() => UserService) private readonly userService: UserService
    ) {}

    @Query(_ => [UserObject])
    async findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Query(_ => [UserObject])
    async findById(@Arg('id') id: string): Promise<User> {
        return this.userService.findById(id)
    }

    @Authorized()
    @Query(_ => [ContactObject])
    async findContacts(@Ctx() context: Context): Promise<Contact[]> {
        return this.userService.findContacts(context.session.user.id)
    }

    @Mutation(_ => UserObject)
    async createUser(@Arg('user') user: UserInput): Promise<UserObject> {
        return this.userService.create(user)
    }

    @Authorized()
    @Mutation(_ => UserObject)
    async updateUser(@Arg('user') user: UserUpdate): Promise<UserObject> {
        return this.userService.update(user)
    }

    @Authorized()
    @Mutation(_ => UserObject)
    async removeUser(@Ctx() context: Context): Promise<UserObject> {
        return this.userService.remove(context.session.user.id)
    }
}
