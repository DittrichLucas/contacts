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
class Usuario {
    @Field()
    id: number

    @Field()
    nome: string

    @Field()
    email: string

    @Field()
    senha: string
}

@Resolver()
export default class UserResolver {
    @Query(_ => [Usuario])
    async users() {
        return service.users()
    }

    @Query(_ => [Usuario])
    async usersId(@Arg('id') id: number) {
        return service.usersId(id)
    }

    @Mutation(_ => Status)
    async criarUsuario(
        @Arg('nome') nome: string,
        @Arg('email') email: string,
        @Arg('senha') senha: string
    ) {
        return service.criarUsuario(nome, email, senha)
    }

    @Authorized()
    @Mutation(_ => Status)
    async alterarUsuario(
        @Arg('nome') nome: string,
        @Arg('email') email: string,
        @Arg('senha') senha: string,
        @Ctx() context: Context
        ) {
        return service.alterarUsuario(context.userId, nome, email, senha)
    }

    @Authorized()
    @Mutation(_ => Status)
    async excluirUsuario(@Ctx() context: Context) {
        return service.excluirUsuario(context.userId)
    }

}
