// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Ruta de la Base de datos
let urlDB;

// Vencimiento del token
// 60 seg, 60 min, 24 horas, 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

if( process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}
else{
	urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;

// Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '921717354975-7itt7gub4apvtj7jciuhscu7hatvkeit.apps.googleusercontent.com';
