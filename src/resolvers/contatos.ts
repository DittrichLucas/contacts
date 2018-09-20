import { Query, ObjectType, Field, Ctx, Resolver, Authorized, Arg, Mutation } from 'type-graphql';
import { Context } from '..';
import * as service from '../services/contatos'

@ObjectType()
class Ret {
	@Field()
	message: string
}

@ObjectType()
class Contato {
	@Field()
	id: number

	@Field()
	nome: string

	@Field()
	email: string

	@Field()
	user_id: number
}

@Resolver()
export default class ContactsResolver {

	@Authorized()
	@Query(_ => [Contato])
	async contatos(@Ctx() context: Context) {
		return service.listarContatos(context.userId)
	}

	@Authorized()
	@Query(_ => [Contato])
	async contatosId(
		@Arg('id') id: number,
		@Ctx() context: Context
	) {
		return service.listarContatosId(id, context.userId)
	}

	@Authorized()
	@Mutation(_ => Ret)
	async criarContatos(
		@Arg('nome') nome: string,
		@Arg('email') email: string,
		@Ctx() context: Context
	) {
		return service.criarContato(nome, email, context.userId)
	}

	@Authorized()
	@Mutation(_ => Ret)
	async alterarContatos(
		@Arg('nome') nome: string,
		@Arg('email') email: string,
		@Arg('id') id: number,
		@Ctx() context: Context
	) {
		return service.alterarContato(nome, email, id, context.userId)
	}

	@Authorized()
	@Mutation(_ => Ret)
	async excluirContatos(
		@Arg('id') id: number,
		@Ctx() context: Context
	) {
		return service.excluirContato(id, context.userId)
	}

}