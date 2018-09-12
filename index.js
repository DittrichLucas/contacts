var express = require('express');
var bodyParser = require('body-parser');

var server = express();

let proximoId = 1;
let agenda = [];

server.use(bodyParser.json());

// Buscar todos os contatos
server.get('/contatos', (req, res) => {
	res.send(agenda)
});

// Buscar um contato pelo id
server.get('/contatos/:id', (req, res) => {

	for(let i = 0; i < agenda.length; i++){
		if(Number(req.params.id) === agenda[i].id){
			res.send(agenda[i])
			return;
		}
	}

	res.send({message: 'Contato não encontrado!'})
});

// Criar um contato
server.post('/contatos', (req, res) => {
	let contato = req.body

	if (contato.nome === undefined || contato.email === undefined) {
		res.send({ message: 'Está faltando o nome ou o email' })
	} else {
		contato.id = proximoId++;
		agenda.push(contato)
		res.send({ message: 'Usuário criado!' })
	}
});

// Alterar um contato pelo id
server.put('/contatos/:id', (req, res) => {
	let contato = req.body

	if (contato.nome === undefined || contato.email === undefined) {
		res.send({ message: 'Está faltando o nome ou o email' })

	} else {

		for(let i = 0; i < agenda.length; i++){
			if(Number(req.params.id) === agenda[i].id){
				agenda[i].nome = contato.nome
				agenda[i].email = contato.email

				res.send({message: 'Usuário alterado!'})
				return;
			}
		}
		res.send({message: 'Contato não encontrado!'})
	}
});

// Deletar um contato pelo id
server.delete('/contatos/:id', (req, res) => {
	const id = Number(req.params.id)

	agendaFiltrada = agenda.filter(contato => contato.id !== id)

	if (agendaFiltrada.length === agenda.length) {
		res.send({message: 'Contato não encontrado!'})
	} else {
		res.send({message: 'Usuário deletado!'})
	}
});

server.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

