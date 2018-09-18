const express = require('express')
const crypto = require('crypto')
const { pool: db } = require('../db')

const router = new express.Router()

// login
router.post('/', async (req, res) => {
	const { email, senha } = req.body
	const resUsuario = await db.query('SELECT * FROM users WHERE email = $1', [email])
	const usuario =resUsuario.rows[0]

	if (usuario && usuario.senha === senha) {
		const token = crypto.randomBytes(32).toString('hex')
		await db.query('INSERT INTO session (token, user_id) VALUES ($1, $2)', [token, usuario.id])

		res.send({ token })
	} else {
		res.status(401).send({ message: 'Login ou senha incorretos' })
	}
});

// logout
router.delete('/:token', (req, res) => {
});


module.exports = router