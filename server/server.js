// config
require('./config/config');

// dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// midlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// rutas 
app.get('/', (req, res) => {
  	res.send('Para ver usuario, ingrese /usuario');
})

app.get('/usuario', (req, res) => {
	res.send('get Usuario Local');
})

app.post('/usuario', (req, res) => {
	let body = req.body;

	if( body.nombre === undefined ){
		res.status(400).json({
			ok: false,
			mensaje: 'El nombre es necesario'		
		});
	}
	else{
		res.json({
			persona: body
		})
	}
})

app.put('/usuario/:id', (req, res) => {
	let id = req.params.id;

	//res.send('put Usuario');

	res.json({
		id
	})
})

app.delete('/usuario', (req, res) => {
	res.send('delete Usuario');
})

// escucha por el puerto 3000
app.listen(process.env.PORT,() => {
	console.log('Escuchando puerto:', process.env.PORT);
});