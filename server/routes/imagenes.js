// dependencias
const express = require('express');
const fs = require('fs');
const path = require('path');
let app = express();

// middlewares verificacion token
const { verificaToken, 
		verificaTokenImg } 
= require('../middlewares/autenticacion');

// nota: probar: localhost:3000/imagen/tipo/img 
// para proteger imagen por postman, verificarToken
// para proteger imagen por url, verificarTokenImg
app.get('/imagen/:tipo/:img', verificaTokenImg, (req,res) => {

	let tipo = req.params.tipo;
	let img = req.params.img;

	let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

	if( fs.existsSync( pathImagen )){
		res.sendFile( pathImagen );
	}
	else{
		let noImageImg = path.resolve(__dirname,'../assets/no-image.jpg');
		res.sendFile(noImageImg);
	}

})

// exportacion
module.exports = app;
