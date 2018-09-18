const express = require('express')
var { propEq, find, pick } = require('ramda')
const { pool: db } = require('../db')

const router = new express.Router()

let filtrarEntrada = pick(['nome', 'email'])

// Buscar todos os contatos
router.get('/', (req, res) => {
	db.query('SELECT * FROM agenda WHERE user_id = $1;', [req.userId])
		.then((db) => {
			res.send(db.rows)
		})
		.catch(err => {
			res.status(500).send(`Falha ao conectar o banco de dados: ${err.message}`)
		})
});

// Buscar um contato pelo id
router.get('/:id', (req, res) => {
	const text = 'SELECT * FROM agenda WHERE id = $1 AND user_id = $2'
	const values = [req.params.id, req.userId]

	db.query(text, values)
		.then(db =>{
			if(db.rows.length === 0){
				res.status(404).send({message: 'Contato não encontrado!'})
			} else {
				res.send(db.rows[0])
			}
		})
		.catch(err =>{
			res.status(500).send(err.message)
		})

});

// Criar um contato
router.post('/', (req, res) => {
	const text = 'INSERT INTO agenda (nome, email, user_id) VALUES ($1, $2, $3) RETURNING *'
	const values = [req.body.nome, req.body.email, req.userId]

	db.query(text, values)
		.then(() =>{
			res.send({ message: 'Usuário criado!' })
		})
		.catch(err =>{
			console.log(err.message)
			res.status(400).send({ message: 'Está faltando o nome ou o email' })
		})

});

// Alterar um contato pelo id
router.put('/:id', (req, res) => {
	const text = 'UPDATE agenda SET nome = $1, email = $2 WHERE id = $3 AND user_id = $4;'
	const values = [req.body.nome, req.body.email, req.params.id, req.userId]

	db.query(text, values)
		.then(() =>{
			res.send({message: 'Usuário alterado!'})
		})
		.catch(err =>{
			if (err.runtime === 'ExecConstraints') {
				res.status(400).send(err.message)
			} else {
				res.status(500).send(err.message)
			}
		})

});

// Deletar um contato pelo id
router.delete('/:id', (req, res) => {
	const text = 'DELETE FROM agenda WHERE id = $1 AND user_id = $2 RETURNING *'
	const values = [req.params.id, req.userId]

	db.query(text, values)
		.then(db =>{
			if(db.rows.length === 0){
				res.status(404).send({message: 'Contato não encontrado!'})
			} else {
				res.send({message: 'Usuário deletado!'})
			}
		})
		.catch(err =>{
			res.status(500).send(err.message)
		})

});

module.exports = router