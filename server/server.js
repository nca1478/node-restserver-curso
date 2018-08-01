// config
require('./config/config');

// dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');	// path de la app

// Using Node.js `require()`
const mongoose = require('mongoose');

// midlewares - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use( express.static( path.resolve( __dirname, '../public' )));

// configuracion global de rutas
app.use(require('./routes/index'));

// conectando a la base de datos
mongoose.connect(process.env.URL_DB,
	{ useNewUrlParser: true }, (err, res) => {

	if( err ) throw err;

	console.log('Base de datos ONLINE');
});

// escucha por el puerto 3000
app.listen(process.env.PORT,() => {
	console.log('Escuchando puerto:', process.env.PORT);
});