// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if( process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}
else{
	urlDB = 'mongodb://cafe-user:14006016nca@ds031865.mlab.com:31865/cafe'
}

// Otra forma
// urlDB = process.env.NODE_ENV === 'dev' ? 
// 	'mongodb://localhost:27017/cafe' :
// 	'mongodb://cafe-user:14006016nca@ds031865.mlab.com:31865/cafe';

process.env.URL_DB = urlDB;
