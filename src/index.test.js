const request = require('supertest')
const server = require('./index')
const { init } = require('./db')


let Authorization = ''

beforeAll(async done =>  {
	await init

	await request(server)
		.post('/usuarios')
		.send({ email: 'lucas@ngi.com.br', senha: '123456', nome: 'Lucas' })

	const res = await request(server)
		.post('/sessoes')
		.send({ email: 'lucas@ngi.com.br', senha: '123456' })

	Authorization = res.body.token
	done()
})


describe('Agenda', async() => {
	test('Deve estar inicialmente vazia', () => {
		return request(server)
			.get('/contatos')
			.set({ Authorization })
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual([])
			})
	})

	test('Deve cadastrar um contato', () => {
		return request(server)
			.post('/contatos')
			.set({ Authorization })
			.send({ nome: 'Lucas', email: 'lucas.oliveira@ngi.com.br' })
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual({message: 'Usuário criado!'})
				return request(server)
					.get('/contatos')
					.set({ Authorization })
			})
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual([{nome: 'Lucas', email: 'lucas.oliveira@ngi.com.br', id: 1, user_id: 1}])
			})
	})

	test('Deve dar mensagem de erro por falta do email', () => {
		return request(server)
			.post('/contatos')
			.set({ Authorization })
			.send({ nome: 'Lucas'})
			.then(res => {
				expect(res.status).toBe(400)
				expect(res.body).toEqual({message: 'Está faltando o nome ou o email'})
			})
	})

	test('Deve alterar o nome e o email de um contato', () => {
		return request(server)
			.put(`/contatos/${1}`)
			.set({ Authorization })
			.send({nome: 'João da Silva', email: 'joao@ngi.com.br'})
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual({message: 'Usuário alterado!'})
				return request(server)
					.get('/contatos')
					.set({ Authorization })
			})
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual([{nome: 'João da Silva', email: 'joao@ngi.com.br', id: 1, user_id: 1}])
			})
	})

	test('Deve excluir um contato', () => {
		return request(server)
			.delete(`/contatos/${1}`)
			.set({ Authorization })
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual({message: 'Usuário deletado!'})
				return request(server)
					.get('/contatos')
					.set({ Authorization })
			})
			.then(res => {
				expect(res.status).toBe(200)
				expect(res.body).toEqual([])
			})
	})

})