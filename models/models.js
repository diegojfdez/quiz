var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"}	);
//exports.sequelize = sequelize;

// Importar tablas definidas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar la definición de la tabla Quiz

// Crear a inicializar la BD
sequelize.sync().success(function () {
  // si se pudo crear la BD y las tablas... Y la BD está vacía. creo un registro.*/
  Quiz.count().success(function (count){
    if(count === 0) {
	Quiz.create(
	  { pregunta: 'Capital de Italia',
	    respuesta: 'Roma'
	  }
	).success(function(){console.log('BD inicializada.');});
    };
  });
});
