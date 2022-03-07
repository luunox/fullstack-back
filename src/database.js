const mysql = require('mysql');

const conexion = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DB,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
});

conexion.connect(function (error) {
	if (error) throw error;
	console.log('Conexión exitosa');
});

module.exports = conexion;
