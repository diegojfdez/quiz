var path = require('path');

// PG DATABASE_URL parsing postgres://user:pw@host:port/db
// DQLite DATABASE_URL parsing sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var host = (url[4] || null);
var port = (url[5] || null);
var DB_name = (url[6] || null);

var storage = process.env.DATABASE_STORAGE;


// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar SQLite o PG
var sequelize = new Sequelize(DB_name, user, pwd, 
	  {
	  	dialect: 	protocol, 
	  	protocol: 	protocol, 
	  	port: 		port, 
	  	host: 		host, 
	  	storage: 	storage,
	  	omitNULL: 	true,
	  }	);


// Importar tablas definidas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar la definición de la tabla Quiz

// Crear a inicializar la BD
sequelize.sync().then(function () {
  // si se pudo crear la BD y las tablas... Y la BD está vacía. creo registros.*/
  Quiz.count().then(function (count){
    if(count === 0) {
	Quiz.create(
          { tema: 		"Ciencia", 
          	pregunta: 	'Capital de Portugal',
            respuesta: 	'Lisboa'
          }
        ).then(function(){console.log('BD inicializada 1.');});
	Quiz.create(
	  { tema: 	  "Ciencia", 
	  	pregunta: 'Capital de Italia',
	    respuesta: 'Roma'
	  }
	).then(function(){console.log('BD inicializada 2.');});
    };
  });
});
