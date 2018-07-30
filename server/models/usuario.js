// dependencias
const mongoose = require('mongoose');

// libreria para validaciones unique
const uniqueValidator = require('mongoose-unique-validator');

// cargando el schema
let Schema = mongoose.Schema;

// cargar los roles validos
let rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido'
}

// configurando el schema
let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password: {
		type: String,
		required: [true, 'La contrasena es obligatoria']
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos		// roles validos
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

// quitando la contrasena en la respuesta
usuarioSchema.methods.toJSON = function(){
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
}

// utilizando plugin uniqueValidator
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'} );

// exportando el modelo
module.exports = mongoose.model( 'Usuario', usuarioSchema );
