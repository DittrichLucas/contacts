var express = require('express');
var bodyParser = require('body-parser');
var { propEq, find, pick } = require('ramda')
var { pool: db } = require('./db')

var server = express();

let filtrarEntrada = pick(['nome', 'email'])

server.use(bodyParser.json());

// Buscar todos os contatos
server.get('/contatos', (req, res) => {
	db.query('SELECT * FROM agenda;')
		.then((db) => {
			res.send(db.rows)
		})
		.catch(err => {
			res.status(500).send(`Falha ao conectar o banco de dados: ${err.message}`)
		})
});

// Buscar um contato pelo id
server.get('/contatos/:id', (req, res) => {
	const text = 'SELECT * FROM agenda WHERE id = $1'
	const values = [req.params.id]

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
server.post('/contatos', (req, res) => {
	const text = 'INSERT INTO agenda (nome, email) VALUES ($1, $2) RETURNING *'
	const values = [req.body.nome, req.body.email]

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
server.put('/contatos/:id', (req, res) => {
	const text = 'UPDATE agenda SET nome = $1, email = $2 WHERE id = $3;'
	const values = [req.body.nome, req.body.email, req.params.id]

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
server.delete('/contatos/:id', (req, res) => {
	const text = 'DELETE FROM agenda WHERE id = $1 RETURNING *'
	const values = [req.params.id]

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

server.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

module.exports = server