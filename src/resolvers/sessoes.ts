import { Arg, Ctx, Resolver, Mutation, ObjectType, Field } from 'type-graphql'
import * as service from '../services/sessoes'
import { Context } from '..';

@ObjectType()
class Sessao {
	@Field()
	message: string
}

@Resolver()
export default class SessionResolver {
	@Mutation(_ => String)
	async criarSessao(
		@Arg('email') email: string,
		@Arg('senha') senha: string
	) {
		return service.criarSessao(email, senha)
	}

	@Mutation(_ => Sessao)
	async excluirSessao(
		@Arg('token') token: string,
		@Ctx() context: Context
	) {
		return service.excluirSessao(token, context.userId)
	}

}