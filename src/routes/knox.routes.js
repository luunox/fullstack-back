const moment = require('moment');
const db = require('../database');

moment.locale('es-mx');

module.exports = function (app) {
	app.get('/', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write('<h1>Server Knox REST FULL API</h1><br />');
		res.end();
	});

	///////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////// CREAR CLIENTE ////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////

	app.post('/crear_cliente', async (req, res) => {
		const { nombres, apellidos, nacimiento } = req.body;
		const user = { nombres, apellidos, nacimiento };

		db.query('insert into users set ?', user, function (error, rows, fields) {
			if (error) return res.json({ code: error.code, message: error.message });

			res.json({
				data: rows,
				title: 'Cliente creado',
				message: 'Se agregaron los datos',
			});
		});
	});

	///////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////// PROMEDIA EDADES ///////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////

	app.get('/promedio_edades', async (req, res) => {
		const hoy = moment(new Date());

		db.query('select nacimiento from users', null, function (error, rows, fields) {
			if (error) return res.json({ code: error.code, message: error.message });

			let suma = 0;
			rows.forEach((dat) => hoy.diff(dat.nacimiento, 'years') >= 1 && (suma += hoy.diff(dat.nacimiento, 'years')));

			res.json({
				data: +(Math.round(suma / rows.length + 'e+0') + 'e-0'),
				title: 'Cliente creado',
				message: 'Se agregaron los datos',
			});
		});
	});

	///////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////// MUESTRA TODOS LOS CLIENTES /////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////

	app.get('/clientes', async (req, res) => {
		const id = req.query.id;

		db.query('select * from users', null, function (error, rows, fields) {
			if (error) return res.json({ code: error.code, message: error.message });

			res.json({
				data: rows,
				title: 'Clientes listados',
				message: 'Se obtuvo la lista de clientes',
			});
		});
	});

	///////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// MUESTRA 1 CLIENTE //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////

	app.get('/clientes/:id', async (req, res) => {
		const id = req.params.id;

		db.query('select * from users where id = ?', id, function (error, rows, fields) {
			if (error) return res.json({ code: error.code, message: error.message });

			res.json({
				data: rows,
				title: 'Cliente creado',
				message: 'Se agregaron los datos',
			});
		});
	});
};
