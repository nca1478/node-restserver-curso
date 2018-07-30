// config
require('./config/config');

// dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Using Node.js `require()`
const mongoose = require('mongoose');

// midlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// rutas de usuario
app.use( require('./routes/usuario') );

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