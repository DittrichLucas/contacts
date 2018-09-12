var express = require('express');
var test = express();

let agenda = [];

// Buscar todos os contatos
test.get('/contatos', (req, res) => {
});

// Buscar um contato pelo id
test.get('/contatos/:id', (req, res) => {
});

// Criar um contato
test.post('/contatos', (req, res) => {
});

// Alterar um contato pelo id
test.put('/contatos/:id', (req, res) => {
});

// Deletar um contato pelo id
test.delete('/contatos/:id', (req, res) => {
});

test.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

