import { Inject } from 'typedi'
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver
} from 'type-graphql'

import { Context } from '../../context'
import ContactService from '../../services/contact'
import { ContactInput, ContactObject, ContactUpdate } from '../dto/contact'

@Resolver()
export default class ContactsResolver {
    constructor(
        @Inject(() => ContactService)
        private readonly contactService: ContactService
    ) { }

    @Authorized()
    @Query((_) => ContactObject)
    async findContact(
        @Arg('id') id: string,
        @Ctx() context: Context
    ): Promise<ContactObject> {
        return this.contactService.findById(id, context.session.user.id)
    }

    @Authorized()
    @Mutation((_) => ContactObject)
    async createContact(
        @Arg('contact') contact: ContactInput, @Ctx() context: Context
    ): Promise<ContactObject> {
        return this.contactService.create(context.session.user.id, contact)
    }

    @Authorized()
    @Mutation((_) => ContactObject)
    async updateContact(
        @Arg('contact') contact: ContactUpdate, @Ctx() context: Context
    ): Promise<ContactObject> {
        return this.contactService.update(context.session.user.id, contact)
    }

    @Authorized()
    @Mutation((_) => ContactObject)
    async deleteContact(
        @Arg('id') id: string,
        @Ctx() context: Context
    ): Promise<ContactObject> {
        return this.contactService.remove(id, context.session.user.id)
    }
}
