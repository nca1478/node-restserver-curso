// dependencias
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');	// libreria para encriptar
const _ = require('underscore'); 	// filtrar campos de la bd

// modelos
const Usuario = require('../models/usuario');

// rutas
app.get('/', (req, res) => {
  	res.send('Para ver usuario, ingrese /usuario');
})

app.get('/usuario', (req, res) => {

	// obtiene via parametro, comienzo del listado
	let desde = req.query.desde || 0;
	desde = Number(desde);

	// obtiene via parametro, limite del listado
	let limite = req.query.limite || 5;
	limite = Number(limite);

	// funcion para listar todos los registro - mostrar campos consulta
	// estado: true muestra los usuarios activos
	Usuario.find({ estado: true }, 'id nombre email estado google role')
	.skip(desde)		// desde
	.limit(limite)		// hasta
	.exec((err, usuarios) => {		// ejecutar funcion listar
		if( err ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		// Contar la cantidad de registros
		// estado: true cuenta los usuarios activos
		Usuario.count({ estado: true }, (err, conteo) => {
			res.json({
				ok: true,
				usuarios,
				conteo
			})
		})

	})
})

app.post('/usuario', (req, res) => {
	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),	// encriptando password
		role: body.role
	})

	usuario.save( (err, usuarioDB) => {

		if( err ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		})
	})
	
})

app.put('/usuario/:id', (req, res) => {
	// id via parametro
	let id = req.params.id;
	// lista de campos permitidos para actualizar - libreria underscore
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

	Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
		
		if( err ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		})

	})

})

app.delete('/usuario/:id', (req, res) => {
	
	let id = req.params.id;

	let cambiaEstado = { estado: false }

	// Eliminacion logica de registros
	Usuario.findByIdAndUpdate( id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
		
		if( err ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if(!usuarioBorrado){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario no encontrado'
				}
			});
		}

		res.json({
			ok: true,
			usuario: usuarioBorrado
		})

	})
})

module.exports = app;