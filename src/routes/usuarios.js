const express = require('express')
const { pool: db } = require('../db')

const router = new express.Router()

// Buscar todos os usuários
router.get('/', (req, res) => {
	db.query('SELECT * FROM users;')
		.then((db) => {
			res.send(db.rows)
		})
		.catch(err => {
			res.status(500).send(`Falha ao conectar o banco de dados: ${err.message}`)
		})
});

// TODO: Selecionar usuário pelo ID
// TODO: Alterar usuário
// TODO: Excluir usuário

// Cadastrar um usuário
router.post('/', (req, res) => {
	const text = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *'
	const values = [req.body.nome, req.body.email, req.body.senha]

	db.query(text, values)
		.then(() =>{
			res.send({ message: 'Usuário criado!' })
		})
		.catch(err =>{
			console.log(err.message)
			res.status(400).send({ message: 'Está faltando o nome, o email ou a senha!' })
		})
});


module.exports = router