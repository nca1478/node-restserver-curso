// dependencias
const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = (req, res, next) => {

	// leyendo los headers del request
	let token = req.get('token');

	jwt.verify( token, process.env.SEED, (err, decoded) => {
		
		if(err){
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token no válido'
				}
			})
		}

		// req va ser igual a la informacion del payload (info del usuario)
		req.usuario = decoded.usuario;

		// ejecutar lo que sigue
		next();

	})

}

// verificar ADMIN_ROLE
let verificaAdmin_Role = (req, res, next) => {

	let usuario = req.usuario;

	if( usuario.role === 'ADMIN_ROLE'){
		next();
	}
	else{
		return res.json({
			ok: false,
			err: {
				message: 'el usuario no es administrador'
			}
		})
	}

}

// verificar token imagenes
let verificaTokenImg = (req, res, next) => {

	// leyendo el token por url
	let token = req.query.token;

	jwt.verify( token, process.env.SEED, (err, decoded) => {
		
		if(err){
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token no válido'
				}
			})
		}

		req.usuario = decoded.usuario;
		next();

	})

}

module.exports = { verificaToken, verificaAdmin_Role, verificaTokenImg };