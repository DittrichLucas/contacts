const request = require('supertest')
const server = require('./index')

describe('Agenda', () => {
	test('Deve estar inicialmente vazia', () => {
		return request(server)
			.get('/contatos')
			.then(res => {
				expect(res.body).toEqual([])
			})
	})

	test('Deve cadastrar um contato', () => {
		return request(server)
			.post('/contatos')
			.send({ nome: 'Lucas', email: 'lucas.oliveira@ngi.com.br' })
			.then(res => {
				expect(res.body).toEqual({message: 'Usuário criado!'})
				return request(server)
				.get('/contatos')
			})
			.then(res => {
				expect(res.body).toEqual([{nome: 'Lucas', email: 'lucas.oliveira@ngi.com.br', id: 1}])
			})
	})

	test('Deve dar mensagem de erro por falta do email', () => {
		return request(server)
			.post('/contatos')
			.send({ nome: 'Lucas'})
			.then(res => {
				expect(res.body).toEqual({message: 'Está faltando o nome ou o email'})
			})
	})

	test('Deve alterar o nome e o email de um contato', () => {
		return request(server)
			.put(`/contatos/${1}`)
			.send({ id: 1, nome: 'João da Silva', email: 'joao@ngi.com.br'})
			.then(res => {
				expect(res.body).toEqual({message: 'Usuário alterado!'})
			})
	})

	test('Deve excluir um contato', () => {
		return request(server)
			.delete(`/contatos/${1}`)
			.then(res => {
				expect(res.body).toEqual({message: 'Usuário deletado!'})
			})
	})

})