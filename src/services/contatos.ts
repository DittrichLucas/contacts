import { pool as db } from '../db'

export async function listarContatos(userId: number) {
	const text = 'SELECT * FROM agenda WHERE user_id = $1;'
	const value = [userId]
	const res = await db.query(text, value)

	return res.rows
}

export async function listarContatosId(id: number, userId: number) {
	const text = 'SELECT * FROM agenda WHERE id = $1 user_id = $2;'
	const value = [id, userId]
	const res = await db.query(text, value)

	return res.rows
}

export async function criarContato(nome: string, email: string, userId: number) {
	const text = 'INSERT INTO agenda (nome, email, user_id) VALUES ($1, $2, $3) RETURNING *'
	const value = [nome, email,userId]

	await db.query(text, value)

	return { message: 'Usuário criado!'}
}

export async function alterarContato(nome: string, email: string, id: number, userId: number) {
	const text = 'UPDATE agenda SET nome = $1, email = $2 WHERE id = $3 AND user_id = $4;'
	const value = [nome, email, id, userId]

	await db.query(text, value)

	return { message: 'Usuário alterado!'}
}

export async function excluirContato(id: number, userId: number) {
	const text = 'DELETE FROM agenda WHERE id = $1 AND user_id = $2 RETURNING *'
	const value = [id, userId]
	const res = await db.query(text, value)

	if(res.rows.length === 0){
		return { message: 'Contato não encontrado!'}
	}

	return { message: 'Usuário deletado!'}
}