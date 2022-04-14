const http = require('http');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Sockets = require('./sockets');
// const { Server: servidor } = require('socket.io');

// const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const whitelist = ['.*', '.*dominio-regex.com']; //urls permitidas a interactuar con el api
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, //limitar a cada IP a 100 peticiones por windowMs
});

Array.prototype.match = function (stringToMatch = '') {
	return this.filter(function (item) {
		return typeof item == 'string' && stringToMatch.match(new RegExp(item));
	});
};

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;

		// Http Server
		this.server = http.createServer(this.app);

		// Configuración del Socket Server
		// this.io = new servidor(this.server);
	}

	middlewares() {
		// Seguridad
		this.app.use(limiter);
		// this.app.use(helmet());
		this.app.options('*', cors());
		this.app.use(function (req, res, next) {
			const isAccept = whitelist.match(req.header('host')).length;
			isAccept ? next() : res.destroy();
		});
		this.app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS');
			next();
		});

		// Configs
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));

		// Desplegar el directorio público
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	}

	// configurarSockets() {
	// 	new Sockets(this.io);
	// }

	execute() {
		// Inicializar Middlewares
		this.middlewares();

		// Inicializar Sockets
		// this.configurarSockets();

		// Routes
		require('../routes/knox.routes')(this.app);

		// Inicializar Server
		this.server.listen(this.port, () => {
			console.log('Server corriendo en puerto:', this.port);
		});
	}
}

module.exports = Server;
