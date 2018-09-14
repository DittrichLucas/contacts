const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.119',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const createtable = `
	CREATE TABLE agenda (
		id serial PRIMARY KEY,
		nome text NOT NULL,
		email text NOT NULL
	);
`
const init = pool.query('DROP TABLE agenda;')
	.then(() => pool.query(createtable))
	.then(() => {
		console.log('Tabela criada com sucesso!')
	})
	.catch(err => {
		console.log(`Falha ao criar tabela: ${err.message}`)
	})

module.exports = { pool, init }
