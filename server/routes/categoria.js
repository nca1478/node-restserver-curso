// dependencias
const express = require('express');
const app = express();

// middlewares
const { verificaToken,
		verificaAdmin_Role } 
= require('../middlewares/autenticacion')

// modelos
const Categoria = require('../models/categoria');

// crear categoria
app.post('/categoria', verificaToken, (req, res) => {
	let body = req.body;

	let categoria = new Categoria({
		descripcion: body.descripcion,
		usuario: req.usuario._id
	});

	categoria.save( (err, categoriaDB) => {

		// error de base de datos
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		// si no se crea la categoria
		if( !categoriaDB ){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		// creo la categoria, muestra la categoria
		res.json({
			ok: true,
			categoria: categoriaDB
		})
	})
})

// actualizar la categoria
app.put('/categoria/:id', verificaToken, (req, res) => {

	let id = req.params.id;
	let body = req.body;
	let descripcion = {
		descripcion: body.descripcion
	}
	
	Categoria.findByIdAndUpdate( id, descripcion, { new: true, runValidators: true }, (err, categoriaDB) => {
		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			categoria: categoriaDB
		})

	})
})

// borrar categoria
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role],(req, res) => {
	
	let id = req.params.id;

	// eliminacion fisica de registros
	Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaBorrada){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Categoria no encontrada'
				}
			});
		}

		res.json({
			ok: true,
			message: 'Categoria Borrada'
		})

	})

})

// mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {

	Categoria.find({})
	.sort('descripcion')
	.populate('usuario', 'nombre email')
	.exec((err, categorias) => {		
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		Categoria.countDocuments((err, conteo) => {
			res.json({
				ok: true,
				categorias,
				conteo
			})
		})

	})
})

// mostrar una categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {
	
	let id = req.params.id;

	Categoria.findById(id, (err, categoriaDB) => {
		if( err ){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaDB){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Categoria no encontrada'
				}
			});
		}

		res.json({
			ok: true,
			categoria: categoriaDB
		})
	});
})

module.exports = app;

