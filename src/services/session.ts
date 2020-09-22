import * as crypto from 'crypto'

import { pool as db } from '../db'

export async function criarSessao(email: string, senha: string) {
    const query = 'SELECT * FROM users WHERE email = $1'
    const resUsuario = await db.query(query, [email])
    const usuario = resUsuario.rows[0]

    if (usuario && usuario.senha === senha) {
        const query = 'INSERT INTO session (token, user_id) VALUES ($1, $2)'
        const token = crypto.randomBytes(32).toString('hex')
        await db.query(query, [token, usuario.id])

        return token
    } else {
        throw new Error('Usuário ou senha incorretos')
    }
}

export async function excluirSessao(token: string, userId: number) {
    const text = `DELETE FROM session
        WHERE token = $1 AND user_id = $2 RETURNING *`
    const value = [token, userId]
    const res = await db.query(text, value)

    if (res.rows.length === 0) {
        return { message: 'Contato não encontrado!' }
    }

    return { message: 'Sessão encerrada!' }
}
