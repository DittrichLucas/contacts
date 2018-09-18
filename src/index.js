var express = require('express');
var bodyParser = require('body-parser');
var contatosRouter = require('./routes/contatos')
var usuariosRouter = require('./routes/usuarios')
var sessoesRouter = require('./routes/sessoes')
const { pool: db } = require('./db')

var server = express();
server.use(bodyParser.json());

async function verificarAuth(req, res, next) {
	// TODO: pegar o token e ver se ta registrado
	const token = req.get('Authorization')
	const resSession = await db.query('SELECT * FROM session WHERE token = $1', [token])
	const session = resSession.rows[0]

	if (!session) {
		res.status(403).send({ message: 'Usuário não logado' })
	} else {
		req.userId = session.user_id
		next()
	}
}

server.use('/contatos', verificarAuth, contatosRouter)
server.use('/usuarios', usuariosRouter)
server.use('/sessoes', sessoesRouter)

server.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

module.exports = server