const http = require('http');
const app = require('./app');
const path = require('path');
///const mysql = require('mysql');
//require('dotenv').config()
//const { Sequelize } = require('sequelize');

//const db = mysql.createConnection({
//	hosts: process.env.DB_HOST,
//	user: process.env.DB_USER,	
//	password: process.env.DB_PASS,
//	database: process.env.DB_NAME
//});

//db.connect(function(err) {
//	if (err) throw err;
//	console.log("Connecté à la base de données MySQL!");
//});


//const sequelize = new Sequelize(
//	process.env.DB_NAME,
//	process.env.DB_USER,	
//	process.env.DB_PASS,
//	{
//		host: process.env.DB_HOST,
//		dialect: 'mysql'
//	});

//let normalizedPath = require('path').join(__dirname, "models")
//require('fs').readdirSync(normalizedPath).forEach((file) => {
//	console.log(file);
//	sequelize.import('./models/' + file)
//})

//let {User} = sequelize.models

const normalizePort = val => {
	const port = parseInt(val, 10);

	if(isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
	console.log('Listening on ' + bind);
});

server.listen(port);
