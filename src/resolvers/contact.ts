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
export class Contact {
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
    @Query(_ => Contact)
    async findContact(
        @Arg('id') id: number,
        @Ctx() context: Context
    ): Promise<Contact> {
        return this.contactService.findById(id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Contact)
    async createContact(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Ctx() context: Context
    ): Promise<Contact> {
        return this.contactService.create(context.userId, { name, email })
    }

    @Authorized()
    @Mutation(_ => Contact)
    async updateContact(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('id') id: number,
        @Ctx() context: Context
    ): Promise<Contact> {
        return this.contactService.update(context.userId, { name, email, id })
    }

    @Authorized()
    @Mutation(_ => Contact)
    async deleteContact(
        @Arg('id') id: number,
        @Ctx() context: Context
    ): Promise<Contact> {
        return this.contactService.remove(id, context.userId)
    }
}
