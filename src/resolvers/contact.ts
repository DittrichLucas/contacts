import { Inject, Service } from 'typedi'
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
import ContactService from '../services/contact'

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

@Service()
@Resolver()
export default class ContactsResolver {
    constructor(
        @Inject(() => ContactService) private readonly contactService: ContactService
    ) {}

    @Authorized()
    @Query(_ => [Contact])
    async findContacts(@Ctx() context: Context) {
        return this.contactService.findByUserId(context.userId)
    }

    @Authorized()
    @Query(_ => [Contact])
    async findContact(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return this.contactService.findById(id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async createContact(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Ctx() context: Context
    ) {
        return this.contactService.create(name, email, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async updateContact(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return this.contactService.update(name, email, id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async deleteContact(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return this.contactService.remove(id, context.userId)
    }
}
