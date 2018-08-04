// dependencias
const express = require('express');
const app = express();
const _ = require('underscore'); 	

// middlewares
const { verificaToken,
		verificaAdmin_Role } 
= require('../middlewares/autenticacion')

// modelos
const Producto = require('../models/producto');

// crear un producto
app.post('/producto', verificaToken, (req, res) => {
	let body = req.body;

	let producto = new Producto({
		usuario: req.usuario._id,
		nombre: body.nombre,
		precioUni: body.precioUni,
		descripcion: body.descripcion,
		disponible: body.disponible,
		categoria: body.categoria
	});

	producto.save( (err, productoDB) => {

		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if( !productoDB ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.status(201).json({
			ok: true,
			producto: productoDB
		})
	})
})

// actualizar un producto por id
app.put('/producto/:id', verificaToken, (req, res) => {

	let id = req.params.id;
	let body = req.body;
	
	Producto.findById( id, (err, productoDB) => {
		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if( !productoDB ){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'El producto no existe'
				}
			});
		}

		productoDB.nombre = body.nombre;
		productoDB.precioUni = body.precioUni;
		productoDB.categoria = body.categoria;
		productoDB.disponible = body.disponible;
		productoDB.descripcion = body.descripcion;

		productoDB.save( (err,productoGuardado) => {

			if( err ){
				return res.status(500).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				producto: productoGuardado,
				message: 'Producto actualizado exitosamente'
			})

		})
	})
})

// borrar un producto por id
app.delete('/producto/:id', [verificaToken,verificaAdmin_Role], (req, res) => {
	
	let id = req.params.id;

	let cambiaDisponible = { disponible: false }

	Producto.findByIdAndUpdate( id, cambiaDisponible, { new: true }, (err, productoBorrado) => {
		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!productoBorrado){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Producto no encontrado'
				}
			});
		}

		res.json({
			ok: true,
			usuario: productoBorrado,
			message: 'Producto borrado'
		})

	})
})

// mostrar todos los productos paginado
app.get('/producto', verificaToken, (req, res) => {

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	Producto.find({disponible: true})
	.sort('nombre')
	.populate('usuario', 'nombre')
	.populate('categoria', 'descripcion')
	.skip(desde)
	.limit(limite)
	.exec((err, productos) => {		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			productos
		})

	})
})

// mostrar un producto por el id
app.get('/producto/:id', verificaToken, (req, res) => {
	
	let id = req.params.id;

	Producto.findById(id)
	.populate('categoria', 'descripcion')
	.populate('usuario', 'nombre')
	.exec((err, productoDB) => {		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if( !productoDB ){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Producto no existe'
				}
			});
		}

		res.json({
			ok: true,
			productoDB
		})
	})
})

// buscar productos ingresando un termino
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

	let termino = req.params.termino;
	let regex = new RegExp(termino, 'i');

	Producto.find({ nombre: regex })
	.populate('categoria', 'descripcion')
	.exec((err, productos) => {
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			productos
		})
	})
})	

module.exports = app;

