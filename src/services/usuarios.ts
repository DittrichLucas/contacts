import { pool as db } from '../db'

export async function users() {
	const result = await db.query('SELECT * FROM users')
	return result.rows
}

export async function usersId(id: number) {
	const text = 'SELECT * FROM users WHERE id = $1'
	const values = [id]

	try {
		await db.query(text, values)
		return text
	} catch (err) {
		return { message: 'Está faltando o nome, o email ou a senha!' }
	}
}

export async function criarUsuario(nome: string, email: string, senha: string) {
	const text = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *'
	const values = [nome, email, senha]

	try {
		await db.query(text, values)
		return { message: 'Usuário criado!' }
	} catch (err) {
		return { message: 'Está faltando o nome, o email ou a senha!' }
	}
}

export async function alterarUsuario(id: number, nome: string, email: string, senha: string){
	const text = 'UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *'
	const values = [nome, email, senha, id]

	try {
		await db.query(text, values)
		return { message: 'Usuário alterado!' }
	} catch (err) {
		return { message: 'Usuário não encontrado!' }
	}
}

export async function excluirUsuario(id: number) {
	const text = 'DELETE FROM users WHERE id = $1 RETURNING *'
	const value = [id]
	await db.query(text, value)

	return { message: 'Usuário deletado!'}

}