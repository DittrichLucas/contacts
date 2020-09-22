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
        return service.listarContatos(context.userId)
    }

    @Authorized()
    @Query(_ => [Contact])
    async contactId(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.listarContatosId(id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Ctx() context: Context
    ) {
        return service.criarContato(name, email, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async update(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.alterarContato(name, email, id, context.userId)
    }

    @Authorized()
    @Mutation(_ => Response)
    async delete(
        @Arg('id') id: number,
        @Ctx() context: Context
    ) {
        return service.excluirContato(id, context.userId)
    }

}
